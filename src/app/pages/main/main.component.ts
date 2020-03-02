import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { usuarioModel } from '../../models/usuario.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  usuario: usuarioModel = new usuarioModel();
  constructor( private servicio:ProductosService,
    private router:Router) { }

  ngOnInit() {
  }
  login( form:NgForm){
    
    if( form.invalid){ return; }
    console.log(this.usuario);
    console.log(form);
    Swal.fire({
      icon: 'info',
      allowOutsideClick: false,
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.servicio.login( this.usuario)
    .subscribe( resp=>{
      console.log('Respuesta= '+resp);
      Swal.close();
      this.router.navigateByUrl('/products');
    },(err)=>{
      console.log('error en login de main.component.ts');
      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar',
        text: 'Usuario o contraseña inválidos!'

      });
    }

    );
    
  }

}
