import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoFoundComponent } from './shared/utils/components/NoFound/NoFound.component';

const routes: Routes = [

  { path: 'admin',loadChildren: () => import('./models/admin/admin.module').then(m=> m.AdminModule)},
  { path: '', loadChildren: () => import('./models/public/main/main.module').then(m => m.MainModule) },
  // {path:'auth', loadChildren: () => import('./models/public/auth/auth.module').then(m=> m.AuthModule)},
{path:'',redirectTo:'admin',pathMatch:'full'},
{path:'**',component:NoFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
