import {inject} from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/utils/token.service';
import { PermisosService } from '../service/permisos/permisos.service';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { ScriptionService } from '../Scription/Scription.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UtilsService } from '../service/utils/utils.service';

export const ProcessGuard = () => {
  const authService = inject(TokenService);
  const scriptionService = inject(ScriptionService);
  const permisosService = inject(PermisosService);
  const message = inject(NzMessageService);
  const util = inject(UtilsService);

  const router = inject(Router);
  console.log("auth services",authService.procesos(),authService.rol());

  if (authService.procesos().length===1) {

    permisosService.getPermisos({
      // proceso:authService.procesos()[0].id,  rol:authService.rol()[0]
      proceso:scriptionService.encrypt(authService.procesos()[0].id), rol:scriptionService.encrypt(authService.rol()[0].id)
          })
          .subscribe({
            next:data=>{
              console.log("datos del guard" ,data);
              authService.setLocalStorage(Constant.PRP,data.PRP);
              console.log("data guard ",scriptionService.decrypt(data.PRP));
              const componet = JSON.parse(scriptionService.decrypt(data.PRP)).find((data:any)=> data.rol.id===authService.rol()[0].id)
              authService.setLocalStorage(Constant.COMPONENTS,scriptionService.encrypt(componet));
              router.navigateByUrl('/admin')
            },
            error:err=>{
              message.error(err.error.mensaje,{nzDuration: 10000})
            }
          })
  }
  if(authService.procesos().length<=0){
          authService.logOut();
            return false;
     }
  util.sesion(true);
  return true;


};
