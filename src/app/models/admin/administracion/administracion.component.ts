import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { data } from 'jquery';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NzTreeNode,NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ScriptionService } from 'src/app/core/Scription/Scription.service';
import { AuthService } from 'src/app/core/service/auth/auth.service';
import { PermisosService } from 'src/app/core/service/permisos/permisos.service';
import { ProcesosService } from 'src/app/core/service/procesos/procesos.service';
import { RolesService } from 'src/app/core/service/roles/roles.service';
import { UsuariosService } from 'src/app/core/service/usuarios/usuarios.service';
import { TokenService } from 'src/app/core/service/utils/token.service';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { IMensaje, DataId, IProceso, IRol, ProcesoDto, IPermiso, IPermisoDto, IRequestContainer } from 'src/app/shared/utils/interfaz/interfaz';
import { Proceso, Rol, Usuario } from 'src/app/shared/utils/model/model';
import { DataTableOptions, DataTableOptions2 } from 'src/app/shared/utils/service/utils.service';
@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss']
})
export class AdministracionComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  public dtElement?: DataTableDirective;
  @ViewChild('tree', { static: false }) tree!: NzTreeComponent;
  public theme=false;
  public dtOptions: DataTables.Settings ={};
  public usuarios:any;
  public proceso:any;
  public dtTrigger:Subject<any> = new Subject<any>();
  public rol:any;
  public roles:any;
  public isVisible=false;
  public isVisibleProcess=false;
  public isVisibleRoles=false;
  public isVisiblePermiso=false;
  public usuarioForm!: FormGroup;
  public processForm!: FormGroup;
  public rolForm!: FormGroup;
  public permisoForm!: FormGroup;
  public controlArray: Array<{ index: number; show: boolean }> = [];
  public isCollapse = true;
  public submitted=false;
  public size: NzSelectSizeType = 'default';
  public listProcess:IProceso[]=[];
  public listRoles:IRol[]=[];
  public permisos!:IPermiso;
  public listPermiso:IPermiso[]=[];
  listOfSelectedValue: number[] = [];

  listOfColumn = [
    {title: 'Id',compare: (a: IProceso, b: IProceso) => a.id - b.id,  priority: false  },
    { title: 'Codigo',  compare: (a: IProceso, b: IProceso) => a.codigo.localeCompare(b.codigo), priority: false },
    { title: 'Nombre',  compare: (a: IProceso, b: IProceso) => a.nombre.localeCompare(b.nombre), priority: false }
    ]
  listOfColumnRoles = [
    {title: 'Id',compare: (a: IRol, b: IRol) => a.id - b.id,  priority: false  },
    { title: 'Codigo',  compare: (a: IRol, b: IRol) => a.rolNombre.localeCompare(b.rolNombre), priority: false },
    { title: 'Nombre',  compare: (a: IRol, b: IRol) => a.nombre.localeCompare(b.nombre), priority: false }
    ]

  constructor(private fb:FormBuilder,private auth:AuthService,
    private script:ScriptionService,private message:NzMessageService,
    private permisosServices:PermisosService,private tokenService:TokenService,
    private spinner:NgxSpinnerService,private modal: NzModalService,
    private usuariosService:UsuariosService,private procesoServices:ProcesosService,
    private rolServices:RolesService) { }

  ngOnInit() {
    this.dtOptions=DataTableOptions;
    this.permisos=JSON.parse(this.script.decrypt(this.tokenService.getLocalStorage(Constant.COMPONENTS)));
    console.log("compoment",this.permisos);

    this.rol=this.permisos.rol;
    this.proceso=this.permisos.proceso;
    const Data=JSON.parse(this.script.decrypt(this.tokenService.getLocalStorage(Constant.PRP)));
    this.roles=Data.map((data:any)=>data.rol);
    this.getList();
    this.getListProcess();
    this.getListRoles();
    this.getListPermisos();
    this.createForm();
    this.createFormProcess();
    this.createFormRol();
    this.createFormPermisos();
    this.cargarTree()
    // this.isVisiblePermiso = true;

  }
cargarTree(){
  this.nodes=Constant.ARRAYMENU.map((data)=>{
    let children;
    if (data.children) {
      children= data.children?.map(d=>{
        return {title:d.name,key:d.key,isLeaf: true}
      })
    }
    return {title:data.name,key:data.key,isLeaf: (!children?true:false),children:children}
    })

}
getListRoles(){
  this.rolServices.getRoles(this.rol).subscribe({
    next:data=>{
      this.listRoles=data;
      console.log(this.listRoles);
    },
    error:err=>{
      this.message.error(err.error.mensaje);
    }
  })
}
getListProcess(){
  console.log(this.proceso);
  this.procesoServices.getProcesos(this.proceso).subscribe({
    next:data=>{
      this.listProcess=data;
    },
    error:err=>{
      this.message.error(err.error.mensaje);
    }
  })
}
getList(){
  const req:IRequestContainer={
    rol:this.rol,
    proceso:this.proceso
  }
  this.spinner.show();
       this.usuariosService.getUsuarioByProcess(req).subscribe({
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
getListPermisos(){
const req:IRequestContainer={
  rol:this.rol,
  proceso:this.proceso
}
 this.permisosServices.getPermisosByProcessAndRol(req).subscribe({
  next:data=>{
    this.listPermiso=data
    console.log(this.listPermiso);
  },
  error:err=>{
    this.errorData(err);
  }
 });
}
isNotSelected(value: number): boolean {
  return this.listOfSelectedValue.indexOf(value) === -1;
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


// usuarios----------------
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
    console.log(this.usuarioForm.controls['roles'].value);
    const roles:any= this.listRoles.filter(x=>x.id==this.usuarioForm.controls['roles'].value);
    console.log("this.usuarioForm.controls['procesos'].value ",this.usuarioForm.controls['procesos'].value);
    const allProcess:IProceso[]=[];
    this.usuarioForm.controls['procesos'].value.forEach((x:any)=>{
      const proceso:IProceso|undefined=this.listProcess.find(proceso=>proceso.id==x)
      if (proceso) {
        allProcess.push(proceso)
      }
    })
    const procesos:any=this.permisos.administracion_proceso?allProcess:[this.proceso];
    const usuario=new Usuario(nombre,apellido,nombreUsuario,identificacion,email,this.script.encrypt(password),roles,procesos,id);

    console.log("send usuarios",usuario);

    if(!id){
      this.auth.register(usuario).subscribe({
       next:data=>{
        this.spinner.hide();
        this.message.success(data.mensaje);
        this.getList();
        this.handleCancel();
        },
      error:err=>{
        this.errorData(err);
      }})
    }else{
      this.usuariosService.updateUsuario(usuario).subscribe({
        next:data=>{
          this.spinner.hide();
          this.message.success(data.mensaje);
          this.getList();
          this.handleCancel();
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
edit=false;
deleteUser(id:number){
  const dataId:DataId={
    id:id
  }
  this.usuariosService.deleteUsuario(dataId).subscribe({
    next:data=>{
      this.getList();
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
dataEdit.procesos=data.procesos.map((x:any)=>x.id);
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

// procesos----------
showModal2(): void {
  this.isVisibleProcess = true;
}

createFormProcess(){
  this.processForm = this.fb.group({
    id:[null],
    nombre: ['', [Validators.required]],
    codigo:['', [Validators.required]]
  });
}

handleOkProcess(): void {
  if (this.processForm.valid) {
    this.spinner.show();
    const id= this.processForm.controls['id'].value;
    const nombre:string= this.processForm.controls['nombre'].value;
    const codigo:string= this.processForm.controls['codigo'].value;

    if(!id){
      const proceso=new Proceso(nombre,codigo);
      this.procesoServices.saveProceso(proceso).subscribe({
       next:data=>{
        this.spinner.hide();
        this.message.success(data.mensaje);
        this.getListProcess();
        this.handleCancel();
      },
      error:err=>{
        this.errorData(err);
      }})
    }else{
      const procesoDto:IProceso={
        id:id,
        nombre:nombre,
        codigo:codigo
      }
      this.procesoServices.updateProceso(procesoDto).subscribe({
        next:data=>{
        this.spinner.hide();
        this.message.success(data.mensaje);
        this.getListProcess();
        this.handleCancel();
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
deleteProceso(id:number){
  this.spinner.show();
  this.procesoServices.deleteProceso(id).subscribe({
    next:data=>{
      this.spinner.hide();
      this.getListProcess();
      this.message.success(data.mensaje);
    },
    error:err=>{
      this.errorData(err);
    }
  })
}
editarProceso(data:IProceso){
  this.processForm.patchValue(data)
  this.isVisibleProcess=true;
}
showDeleteConfirmProceso(id:number,nombre:string): void {
  this.modal.confirm({
    nzTitle: '¿Estás segura de eliminar el proceso '+nombre+' ?',
    nzContent: '¡Cuando lo elimine no podra recuperarlo!',
    nzOkText: 'Eliminar',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => this.deleteProceso(id),
    nzCancelText: 'Cancelar',
    nzOnCancel: () => console.log('Cancel')
  });
}

// roles-------------------------
showModal3(): void {
  this.isVisibleRoles = true;
}
createFormRol(){
  this.rolForm = this.fb.group({
    id:[null],
    nombre: ['', [Validators.required]],
    rolNombre:['', [Validators.required]]
  });
}
handleOkRol(): void {
  if (this.rolForm.valid) {
    this.spinner.show();
    const id= this.rolForm.controls['id'].value;
    const nombre:string= this.rolForm.controls['nombre'].value;
    const rolNombre:string= this.rolForm.controls['rolNombre'].value;

    if(!id){
      const rol=new Rol(nombre,rolNombre);
      this.rolServices.saveRol(rol).subscribe({
       next:data=>{
        this.spinner.hide();
        this.message.success(data.mensaje);
        this.getListRoles();
        this.handleCancel();
      },
      error:err=>{
        this.errorData(err);
      }})
    }else{
      const rolDto:IRol={
        id:id,
        nombre:nombre,
        rolNombre:rolNombre
      }
      this.rolServices.updateRol(rolDto).subscribe({
        next:data=>{
        this.spinner.hide();
        this.message.success(data.mensaje);
        this.getListRoles();
        this.handleCancel();
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

deleteRol(id:number){
  this.spinner.show();
  this.rolServices.deleteRol(id).subscribe({
    next:data=>{
      this.spinner.hide();
      this.getListRoles();
      this.message.success(data.mensaje);
    },
    error:err=>{
      this.errorData(err);
    }
  })
}
editarRol(data:IRol){
  console.log(data);

  this.rolForm.patchValue(data)
  this.isVisibleRoles=true;
}
showDeleteConfirmRol(id:number,nombre:string): void {
  this.modal.confirm({
    nzTitle: '¿Estás segura de eliminar el rol '+nombre+' ?',
    nzContent: '¡Cuando lo elimine no podra recuperarlo!',
    nzOkText: 'Eliminar',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => this.deleteRol(id),
    nzCancelText: 'Cancelar',
    nzOnCancel: () => console.log('Cancel')
  });
}

//permisos-----------------
nodes:NzTreeNodeOptions[] =[];
showModal4(): void {
  this.isVisiblePermiso = true;
 this.selectedPermissions=[];
  // this.nodes=Constant.ARRAYMENU.map((data)=>{
  // let children;
  // if (data.children) {
  //   children= data.children?.map(d=>{
  //     return {title:d.name,key:d.key,isLeaf: true}
  //   })
  // }
  // return {title:data.name,key:data.key,isLeaf: (!children?true:false),children:children,expanded: true}
  // })
  // console.log(this.nodes);
}
createFormPermisos(){
  this.permisoForm = this.fb.group({
  id:[null],
  rol: [null, [Validators.required]],
  proceso:[null],
  });
}
handleOkPermiso(): void {
  if (this.permisoForm.valid) {
    this.spinner.show();
    const selectedNodes: NzTreeNode[] = this.tree.getTreeNodes();
    let data:any={};
    selectedNodes.forEach(node => {
      let key:any=node.key
      data[key]= node.isChecked
      if(node.children){
        node.children.forEach(child=>{
          data[child.key]=child.isChecked;
        })
      }
    });
   console.log("data checked ->",data);

   const id=this.permisoForm.controls['id'].value;
   if(!id){
      const permisos:IPermisoDto=data;
      const rol:any= this.listRoles.find(x=>x.id==this.permisoForm.controls['rol'].value);
      permisos.rol= rol;
      permisos.proceso=this.permisos.administracion_proceso?this.listProcess.find(x=>x.id==this.permisoForm.controls['proceso'].value):this.proceso;

     console.log("save ",permisos);

     this.permisosServices.savePermiso(permisos).subscribe({
       next:data=>{
        this.spinner.hide();
        this.message.success(data.mensaje);
        this.getListPermisos();
        this.handleCancel();
      },
      error:err=>{
        this.errorData(err);
      }})
    }else{
      const permisoEdit:IPermiso=data;
      const rol:any= this.listRoles.find(x=>x.id==this.permisoForm.controls['rol'].value);
      permisoEdit.rol= rol;
      permisoEdit.proceso=this.permisos.administracion_proceso?this.listProcess.find(x=>x.id==this.permisoForm.controls['proceso'].value):this.proceso;

      permisoEdit.id=id;
      console.log("edit ",permisoEdit);

      this.permisosServices.updatePermiso(permisoEdit).subscribe({
        next:data=>{
          this.spinner.hide();
        this.message.success(data.mensaje);
        this.getListPermisos();
        this.handleCancel();
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

showDeleteConfirmPermiso(id:number){
  this.modal.confirm({
    nzTitle: '¿Estás segura de eliminar el permiso ?',
    nzContent: '¡Cuando lo elimine no podra recuperarlo!',
    nzOkText: 'Eliminar',
    nzOkType: 'primary',
    nzOkDanger: true,
    nzOnOk: () => this.deletePermiso(id),
    nzCancelText: 'Cancelar',
    nzOnCancel: () => console.log('Cancel')
  });
}
deletePermiso(id:number){
  this.spinner.show();
  this.permisosServices.deletePermiso(id).subscribe({
    next:data=>{
      this.spinner.hide();
      this.getListPermisos();
      this.message.success(data.mensaje);
    },
    error:err=>{
      this.errorData(err);
    }
  })
}
selectedPermissions!: string[];
editarPermiso(dataPermiso:IPermiso){


  const dataEdit:any={...dataPermiso}
  this.isVisiblePermiso=true;
  const edit={id:dataEdit.id,rol:dataEdit.rol.id,proceso:dataEdit.proceso.id}
  console.log("edit permisos ",dataEdit);
  this.permisoForm.patchValue(edit)

  const array:string[]=[];
  Constant.ARRAYMENU.map((data)=>{
      if(dataEdit[data.key]){
        array.push(data.key)
      }
      if (data.children) {
        data.children.forEach(child=>{
          if(dataEdit[child.key]){
            array.push(child.key)
          }
        })
      }
  })
  console.log("array",array);

  this.selectedPermissions=array
}

  //   this.nodes=Constant.ARRAYMENU.map((data)=>{
//     let children;
//     if (data.children) {
//       children= data.children?.map(d=>{
//         return {title:d.name,key:d.key,isLeaf: true,checked:dataEdit[data.key]}
//       })
//     }
//     // return {title:data.name,key:data.key,isLeaf: (!children?true:false),children:children,expanded: true}
//     return {title:data.name,key:data.key,isLeaf: (!children?true:false),children:children,expanded: true,checked:dataEdit[data.key]}
//   })
// }

//------------
convertirAMayusculas() {
  const valor = this.rolForm.get('rolNombre')?.value;
  this.rolForm.get('rolNombre')?.setValue(valor.toUpperCase(), { emitEvent: false });
}
handleCancel(): void {
  this.resetForm();
  this.isVisible = false;
  this.isVisibleProcess=false;
  this.isVisibleRoles=false;
  this.isVisiblePermiso=false;
}
errorData(err:any){
  this.spinner.hide();
  this.message.error(err.error.mensaje);
}
resetForm(): void {
   this.usuarioForm.reset();
   this.processForm.reset();
   this.rolForm.reset();
   this.permisoForm.reset();
}

nzEvent(event: NzFormatEmitEvent): void {
  const checkenPermiso=[]
  if(event.node?.origin.checked){

    // event.node?.origin.children?.forEach(child=>{
    //   this.selectedPermissions.push(child.key)
    // })
  }else{
    event.node?.origin.children?.forEach(child=>{
      this.selectedPermissions=this.selectedPermissions.filter(x=>x != child.key);
    })
  }
  console.log(this.selectedPermissions);

  // const booleanValues: boolean[] = this.tree.getTreeNodes().map(node => node.isChecked);
}
// getBooleanValues(): void {

// }


}
