import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScriptionService } from 'src/app/core/Scription/Scription.service';
import { PermisosService } from 'src/app/core/service/permisos/permisos.service';
import { TokenService } from 'src/app/core/service/utils/token.service';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { IPermiso, IProceso } from 'src/app/shared/utils/interfaz/interfaz';
import { Proceso } from 'src/app/shared/utils/model/model';
import { Renderer2 } from '@angular/core';
import { ProcesosService } from 'src/app/core/service/procesos/procesos.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('menuItem') menuItem!: ElementRef;
  public isCollapsed:boolean = false;
  public path:string='';
  public username:string='';
  public usernameInicial:string='';
  public component:any=[];
  public permisos!:IPermiso;
  isDarkTheme: boolean = false;
  selectedProceso:any;
  process!:IProceso[];
  public size: NzSelectSizeType = 'default';
  constructor(private router:Router,private tokenService:TokenService,private renderer: Renderer2,private procesosServices:ProcesosService,
    private script:ScriptionService, private message: NzMessageService,private permisosServices:PermisosService,private spinner:NgxSpinnerService) { }
    theme:boolean=false;
    ngOnInit(): void {
    this.path= this.router.url.split('/')[2]

      this.getCompomentes();
    }
    getCompomentes(){
    this.component=[];
    const permisos=this.tokenService.getComponentes();
    this.permisos=permisos;
    console.log(this.permisos);
    this.procesosServices.getProcesos(this.permisos.proceso).subscribe({
      next:data=>{
        this.process=data;
      },
      error:err=>{
        this.message.error(err.mensaje);
      }
    });
    console.log("proceso",this.process);
    const array=Constant.ARRAYMENU
    this.tokenService.setLocalStorage(Constant.PRC,this.script.encrypt(JSON.stringify({proceso:permisos.procesoId,roles:permisos.rolId})));
    array.forEach(a=>{
      console.log(a);
      if(permisos[a.key]){
        this.component.push(a);
      }
    })
    // this.path= this.router.url.split('/')[2]
    // console.log(this.router.url.split('/'));
    this.username=this.tokenService.getUserName();
    this.usernameInicial=this.username[0].toLocaleUpperCase();
  }
  isSelected(path:string){
    // this.menuItem.nativeElement
    console.log(this);
    this.path=path
  }
  collapsed(){
    this.isCollapsed = !this.isCollapsed
  }
  selectedItem:any
  changeProcess(proceso:IProceso){
    this.spinner.show();
    console.log( "change proceso",{rol: this.permisos.rol,
      proceso:proceso});
    this.permisosServices.getPermisos({rol: this.script.encrypt(this.permisos.rol.id),
      proceso:this.script.encrypt(proceso.id)})
    .subscribe({
      next:data=>{
        this.spinner.hide();

        this.tokenService.setLocalStorage(Constant.PRP,data.PRP);
        const componet = JSON.parse(this.script.decrypt(data.PRP)).find((data:any)=> data.rol.id===this.tokenService.rol()[0].id)
        this.tokenService.setLocalStorage(Constant.COMPONENTS,this.script.encrypt(componet))

        const li=document.getElementById('dashboard');
        li?.click()
        this.getCompomentes();
      },
      error:err=>{
        this.spinner.hide();
        console.log("err ",err);
        this.message.error(err.error.mensaje,{nzDuration: 10000})
          // if(err.status===403){
          //   this.tokenService.logOut();
          // }
      }
    })
  }
  logout(){
    this.tokenService.logOut();
  }


}
