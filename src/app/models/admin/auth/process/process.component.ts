import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ScriptionService } from 'src/app/core/Scription/Scription.service';
import { PermisosService } from 'src/app/core/service/permisos/permisos.service';
import { TokenService } from 'src/app/core/service/utils/token.service';
import { Constant } from 'src/app/shared/utils/constant/constant';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  selectedValue:any=null;
  usuario=null;
  process:any;
  constructor(private tokenService:TokenService,private router:Router,
  private message: NzMessageService,
    private permisos:PermisosService, private scription:ScriptionService) { }

  ngOnInit() {
    this.usuario=this.tokenService.getUserName();
    this.process=this.tokenService.procesos();
    console.log("entro 0");
    console.log(this.tokenService.procesos().length);
  }

  submit(){
 console.log(this.tokenService.rol())
    this.getPermisos(this.tokenService.rol()[0].id,this.selectedValue)
  }
  private getPermisos(rol:string,proceso:string){
    this.permisos.getPermisos({rol: this.scription.encrypt(rol),
      proceso:this.scription.encrypt(proceso)})
    .subscribe({
      next:data=>{
        this.tokenService.setLocalStorage(Constant.PRP,data.PRP);
        const componet = JSON.parse(this.scription.decrypt(data.PRP)).find((data:any)=> data.rol.id===this.tokenService.rol()[0].id)
        this.tokenService.setLocalStorage(Constant.COMPONENTS,this.scription.encrypt(componet))
        this.router.navigateByUrl('/admin')
      },
      error:err=>{
          console.log("err ",err);
          this.message.error(err.error.mensaje,{nzDuration: 10000})
          if(err.status===403){
            this.tokenService.logOut();
          }
      }
    })
  }

}
