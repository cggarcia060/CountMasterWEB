import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComprasComponent } from './compras/compras.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { AdminComponent } from './admin.component';
import { LoginComponent } from './auth/login/login.component';
import { NavAuthComponent } from './auth/nav-auth/nav-auth.component';
import { SendEmailComponent } from './auth/sendEmail/send_email.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ProcessComponent } from './auth/process/process.component';
import { AuthorizacionGuard } from 'src/app/core/guards/authorizacion.guard';
import { ProcessGuard } from 'src/app/core/guards/process.guard';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdministracionComponent } from './administracion/administracion.component';


const routes: Routes = [

  {path:'',component:AdminComponent,canActivate:[AuthGuard,AuthorizacionGuard] ,
    children:[
        { path:'dashboard', component:DashboardComponent,canActivate:[AuthGuard,AuthorizacionGuard] },
        { path:'compras',component:ComprasComponent,canActivate:[AuthGuard,AuthorizacionGuard] },
        { path:'ventas',component:VentasComponent,canActivate:[AuthGuard,AuthorizacionGuard] },
        { path:'categorias',component:CategoriasComponent,canActivate:[AuthGuard,AuthorizacionGuard] },
        { path:'productos',component:ProductosComponent,canActivate:[AuthGuard,AuthorizacionGuard] },
        { path: 'user',component:ProductosComponent,canActivate:[AuthGuard,AuthorizacionGuard] },
        { path: 'usuarios',component:UsuariosComponent,canActivate:[AuthGuard,AuthorizacionGuard] },
        { path: 'administracion',component:AdministracionComponent,canActivate:[AuthGuard,AuthorizacionGuard],

       },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  },
  {path:'auth',component:NavAuthComponent,
      children:[
          {path:'login',component:LoginComponent},
          {path:'process',component:ProcessComponent,canActivate:[AuthGuard,ProcessGuard]},
          {path:'auth_send_email',component:SendEmailComponent},
          {path:'',redirectTo:'login',pathMatch:'full'}
    ]},
  { path: 'auth',redirectTo: 'login',pathMatch: 'full'},
  { path: '',redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
