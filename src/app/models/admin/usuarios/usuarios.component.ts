import {  Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ScriptionService } from 'src/app/core/Scription/Scription.service';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { PermisosService } from 'src/app/core/service/permisos/permisos.service';
import { UsuariosService } from 'src/app/core/service/usuarios/usuarios.service';
import { TokenService } from 'src/app/core/service/utils/token.service';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { Data, DataId, IMensaje } from 'src/app/shared/utils/interfaz/interfaz';
import { Usuario } from 'src/app/shared/utils/model/model';
import { DataTableOptions } from 'src/app/shared/utils/service/utils.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnDestroy,OnInit {

  dtOptions: DataTables.Settings ={};
  public usuarios:any;
  public proceso:any;
  dtTrigger:Subject<any> = new Subject<any>();
  public rol:any;
  public roles:any;
  public isVisible=false;
  public usuarioForm!: FormGroup;
  public controlArray: Array<{ index: number; show: boolean }> = [];
  public isCollapse = true;
  public submitted=false;
  public size: NzSelectSizeType = 'default';
  @ViewChild(DataTableDirective, {static: false})
  dtElement?: DataTableDirective;

  constructor(private fb:FormBuilder,private auth:AuthService,
    private script:ScriptionService,private message:NzMessageService,
    private tokenService:TokenService ,private permisos:PermisosService,
    private spinner:NgxSpinnerService,private modal: NzModalService,
    private usuariosService:UsuariosService) { }
  ngOnInit() {
    this.dtOptions=DataTableOptions
    const Compoment=JSON.parse(this.script.decrypt(this.tokenService.getLocalStorage(Constant.COMPONENTS)));
    this.rol=Compoment.rol;
    this.proceso=Compoment.proceso;
    const Data=JSON.parse(this.script.decrypt(this.tokenService.getLocalStorage(Constant.PRP)));
    this.roles=Data.map((data:any)=>data.rol);
    this.getList(this.proceso);
    this.createForm();
}


getList(proceso:any){
  this.spinner.show();
       this.usuariosService.getUsuarioByProcess({procesoId:proceso.id}).subscribe({
        next:data=>{
          this.spinner.hide();
          this.usuarios= JSON.parse(this.script.decrypt(data.usuarios));
          this.rerender();
        },
        error:err=>{
          console.log(err);
            this.spinner.hide();
            this.message.error(err.error.mensaje);
        }
       });
}

validateConfirmPassword(): void {
  setTimeout(() => this.usuarioForm.controls['confirm'].updateValueAndValidity());
}



ngOnDestroy(): void {
  this.dtTrigger.unsubscribe();
}

rerender(): void {
  if (this.dtElement && this.dtElement.dtInstance) {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next(this.dtOptions);
    });
  } else {
    this.dtTrigger.next(this.dtOptions);
  }
}

createForm(){
  this.usuarioForm = this.fb.group({
   id:[null],
    nombreUsuario: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    confirm: ['', [this.confirmValidator]],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    identificacion:[null,[Validators.required]],
    roles:[null,[Validators.required]],
    procesos:[null]
  });
}

confirmValidator = (control: FormControl): { [s: string]: boolean } => {
  if (!control.value) {
    return { error: true, required: true };
  } else if (control.value !== this.usuarioForm.controls['password'].value) {
    return { confirm: true, error: true };
  }
  return {};
};
showModal(): void {
  this.edit=false
  this.isVisible = true;
}

handleOk(): void {
  if (this.usuarioForm.valid) {
    this.spinner.show();
    const id= this.usuarioForm.controls['id'].value;
    const nombre= this.usuarioForm.controls['nombre'].value;
    const apellido= this.usuarioForm.controls['apellido'].value;
    const nombreUsuario= this.usuarioForm.controls['nombreUsuario'].value;
    const email= this.usuarioForm.controls['email'].value;
    const password= this.usuarioForm.controls['password'].value;
    const identificacion=this.usuarioForm.controls['identificacion'].value;
    const roles= this.roles.filter((rol:any)=> rol.id=this.usuarioForm.controls['roles'].value).map((data:any)=>data.id);  ;
    const procesos=[this.proceso.id];
    const usuario=new Usuario(nombre,apellido,nombreUsuario,identificacion,email,password,roles,procesos,id);

    if(!id){
      this.auth.register(usuario).subscribe({
       next:data=>{
        this.nextData(data);
      },
      error:err=>{
        this.errorData(err);
      }})
    }else{
      this.usuariosService.updateUsuario(usuario).subscribe({
        next:data=>{
         this.nextData(data);
       },
       error:err=>{
        this.errorData(err);
       }})
    }
  }else{
    this.spinner.hide();
    this.message.error("Los campos con * son obligatorio");
  }

}

nextData(data:IMensaje){
  this.spinner.hide();
  this.message.success(data.mensaje);
  this.getList(this.proceso);
  this.handleCancel();
}
errorData(err:any){
  this.spinner.hide();
  this.message.error(err.error.mensaje);
}

handleCancel(): void {
  this.resetForm();
  this.isVisible = false;
}
edit=false;
deleteUser(id:number){
  const dataId:DataId={
    id:id
  }
  this.usuariosService.deleteUsuario(dataId).subscribe({
    next:data=>{
      this.message.success(data.mensaje);
    },
    error:err=>{
      this.message.error(err.mensaje);
    }
  })
}
editar(data:Usuario){
console.log(data);
const dataEdit:any={...data};
dataEdit['confirm']=data.password;
dataEdit.roles=data.roles[0].id;
this.usuarioForm.patchValue(dataEdit);
this.edit =true;
this.isVisible=true;
}
showDeleteConfirm(id:number,nombre:string): void {
  this.modal.confirm({
    nzTitle: '¿Estás segura de eliminar el usuario '+nombre+' ?',
    nzContent: '¡Cuando lo elimine no podra recuperarlo!',
    nzOkText: 'Eliminar',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => this.deleteUser(id),
    nzCancelText: 'Cancelar',
    nzOnCancel: () => console.log('Cancel')
  });
}
resetForm(): void {
   this.usuarioForm.reset();
}

}
