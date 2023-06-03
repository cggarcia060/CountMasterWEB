import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from '../home/home.component';
import { ShoppingComponent } from '../shopping/shopping.component';
import { ListaProductoComponent } from '../lista_productos/lista_producto.component';
const routes: Routes = [
  { path: '', component: MainComponent ,
  children:[
    {path:'', component:HomeComponent},
    {path:'shopping',component:ShoppingComponent},
    {path:'lista',component:ListaProductoComponent},
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
