import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ImportNgZorroModule } from 'src/app/shared/utils/model/importNgZorro/importNgZorro.module';
import { QuestionOutline } from '@ant-design/icons-angular/icons';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxEchartsModule } from 'ngx-echarts';
import { HomeComponent } from '../home/home.component';
import { ShoppingComponent } from '../shopping/shopping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ListaProductoComponent } from '../lista_productos/lista_producto.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    ListaProductoComponent,
    ShoppingComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ImportNgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    NzIconModule.forChild([QuestionOutline]),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    AngularSvgIconModule.forRoot(),

  ],
  providers:[]
})
export class MainModule { }
