import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

import { NZ_I18N, es_ES } from 'ng-zorro-antd/i18n';

import { NzTreeModule } from 'ng-zorro-antd/tree';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule,NZ_ICONS } from 'ng-zorro-antd/icon';
import { MenuFoldOutline,DashboardOutline } from '@ant-design/icons-angular/icons'; // importa el icono que deseas utilizar

const icons: IconDefinition[] = [MenuFoldOutline,DashboardOutline]; // agrega el icono a la lista de íconos disponibles



@NgModule({
  imports: [
    CommonModule,
    NgxSpinnerModule,
    NzFormModule,
    NzMessageModule,
    NzIconModule.forRoot(icons),
    NzCheckboxModule,
    NzButtonModule,
    NzInputModule,
    NzDrawerModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzListModule,
    NzBackTopModule,
    NzCardModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzImageModule,
    NzCarouselModule,
    NzMenuModule,
    NzBadgeModule,
    NzDividerModule,
    NzTableModule,
    NzTabsModule,
    NzDatePickerModule,
    NzModalModule,
    NzGridModule,
    NzStatisticModule,
    NzToolTipModule,
    NzAvatarModule,
    NzSwitchModule,
    NzTreeModule,
    NzTypographyModule


  ],
  exports:[
    NzModalModule,
    NzFormModule,
    NzMessageModule,
    NzCheckboxModule,
    NzButtonModule,
    NzInputModule,
    NzDrawerModule,
    NzPopconfirmModule,
    NzSelectModule,
    NzListModule,
    NzBackTopModule,
    NzCardModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzLayoutModule,
    NzImageModule,
    NzCarouselModule,
    NzMenuModule,
    NzBadgeModule,
    NzDividerModule,
    NzTableModule,
    NzTabsModule,
    NzDatePickerModule,
    NzGridModule,
    NzStatisticModule,
    NzToolTipModule,
    NzAvatarModule,
    NzSwitchModule,
    NzTreeModule,
    NzTypographyModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES },{ provide: NZ_ICONS, useValue: icons }],
})
export class ImportNgZorroModule { }
