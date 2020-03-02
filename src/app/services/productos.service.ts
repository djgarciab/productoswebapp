import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { productoModel } from '../models/producto.model';
import { usuarioModel } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: any = [];
  usuarioId :string;
  constructor( private http: HttpClient) {
    this.leerId();
   }

  logout(){

  }
  login(usuario:usuarioModel){    
    return this.http.get(
      `http://localhost:3100/productos?opc=2&usunombre=${usuario.usunombre}&usucontrasena=${usuario.usucontrasena}`)
      .pipe(
        map(resp=>{
          console.log('entro en el mapa de respuestas de rxjs con resp='+resp);
          
          this.guardarId(resp[0][0]);
          return resp;
        }

        )
      );
  }

  private guardarId( userId:string){
    this.usuarioId = userId;
    localStorage.setItem('id',userId);
  }
  leerId(){
    if(localStorage.getItem('id')){
      this.usuarioId = localStorage.getItem('id');
    }else{
      this.usuarioId ='';
    }
    return this.usuarioId;
  }

  estaAutenticado(): boolean{
    return this.usuarioId.length > 2;
  }

  getProductos(){
    return this.http.get('http://localhost:3100/productos?opc=1')
    .pipe( map( this.crearArreglo) ) ;
  }

   private crearArreglo( productoObj: object ){
    const productos: productoModel[] = [];   
    if( productoObj === null) { return []; } //valida si esta la bd vacia
    Object.keys( productoObj ).forEach( key =>{
      const producto: productoModel = productoObj[key];
      producto.proid = key;
      productos.push(producto) ;
    });
    return productos;
  }


}
