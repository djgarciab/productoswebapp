import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProductosService } from '../services/productos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth:ProductosService,
                private router:Router ){}

  canActivate(): boolean{
    console.log('Guard!');

    if(this.auth.estaAutenticado()){
      return true;
    }else{
      this.router.navigateByUrl('/main');
      return false;
    }
  }
  
}
