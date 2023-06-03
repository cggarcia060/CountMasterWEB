import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ImportNgZorroModule } from 'src/app/shared/utils/model/importNgZorro/importNgZorro.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ComprasComponent } from './compras/compras.component';
import { ProductosComponent } from './productos/productos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import es from '@angular/common/locales/es';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { QuestionOutline } from '@ant-design/icons-angular/icons';
import { MainComponent } from './Main/Main.component';
import { LoginComponent } from './auth/login/login.component';
import { NavAuthComponent } from './auth/nav-auth/nav-auth.component';
import { SendEmailComponent } from './auth/sendEmail/send_email.component';
import { ProcessComponent } from './auth/process/process.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DataTablesModule } from 'angular-datatables';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { AdministracionComponent } from './administracion/administracion.component';

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

registerLocaleData(es);

@NgModule({
  declarations:[
   AdminComponent,
   DashboardComponent,
   VentasComponent,
   ProductosComponent,
   ComprasComponent,
   CategoriasComponent,
   MainComponent,
   LoginComponent,
   NavAuthComponent,
   ProcessComponent,
   SendEmailComponent,
   UsuariosComponent,
   AdministracionComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ImportNgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NzIconModule.forChild([QuestionOutline]),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    AngularSvgIconModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [],
  bootstrap:[AdminComponent]

})
export class AdminModule { }
