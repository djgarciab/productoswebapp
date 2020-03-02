import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { productoModel } from '../../models/producto.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productos : productoModel[]=[];
  cargando = false;
  constructor( private servicio:ProductosService) { }

  ngOnInit() {
    this.cargando=true;
    this.servicio.getProductos()
    .subscribe( res=>{
      this.productos = res;
      this.productos.reverse();
      console.log(this.productos);
      console.log('Res= '+res);
      this.cargando = false;
    }

    );
  }

}
