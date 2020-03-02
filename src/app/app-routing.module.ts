import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {MainComponent} from './pages/main/main.component'; 
import {ProductsComponent} from './pages/products/products.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'main',component : MainComponent},
  {path: 'products',component : ProductsComponent},
	{path: '**',pathMatch : 'full', redirectTo: 'main'} /*para cualquier direccion envia a main*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
