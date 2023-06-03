import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { CompraService } from 'src/app/core/service/compra.service';
import { ProveedorService } from 'src/app/core/service/proveedor.service';
import { UnidadService } from 'src/app/core/service/unidad.service';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { Compra, Proveedor, Unidad } from 'src/app/shared/utils/interfaz/interfaz';
@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  public compras:any[]=[];
  private comprasCopy=[];
  public unidades:Unidad[]=[];
  public unidadesCopy:Unidad[]=[];
  public proveedores:Proveedor[]=[];
  public presentacion:Unidad | undefined;
  public isVisible=false;
  public comprasForm:FormGroup|any;
  public controlArray: Array<{ index: number; show: boolean }> = [];
  public isCollapse = true;
  public submitted=false;
  public size: NzSelectSizeType = 'default';
  public unid:number=1;
  public compraHoy=0;
  public porcentaje=0;
  va:any
  ca:any;
  peso:string='';
  total:number=0;
  totalCompras=0;
  cantidadCompras=0;
  constructor(private fb:FormBuilder,
    private compraService:CompraService,private proveedorService:ProveedorService,private unidadService:UnidadService,private spinner:NgxSpinnerService,private message: NzMessageService) { }

  ngOnInit() {

}
getListUnidad(){
  this.unidadService.getListunidad().subscribe({
  next:data=>{
    this.unidades=data
    this.unidadesCopy=data
  },
  error:err=>{
    console.log(err);
  }
  })
}
getListProveedor(){
  this.proveedorService.getListProveedores().subscribe(res=>{
    if(res.status===Constant.success){
      this.proveedores=res.data
    }
  })
}
compraMaxima=0;
promedioCompra=0

onChangeValor(e:any){
  this.va=e
if (this.va && this.ca) {
 this.comprasForm.controls.total.patchValue((this.va * this.ca))
this.total=this.va * this.ca;
}
}
onChangeCantidad(e:any){
  this.ca=e
if (this.va && this.ca) {
this.comprasForm.controls.total.patchValue((this.va * this.ca))
this.total=this.va * this.ca;
}
}
getUnd(e:any){
this.presentacion= this.unidadesCopy.find(x=>x.id===e)
this.comprasForm.controls.peso.patchValue(this.presentacion?.valor)
this.peso=this.presentacion?.valor!=undefined?this.presentacion?.valor:'';
this.comprasForm.controls.peso.disable()
}

createForm(){
  this.comprasForm = this.fb.group({
    id:[null],
    nombre:[null,[Validators.required]],
    marca:[null],
    descripcion:[null],
    unidad:[null,[Validators.required]],
    peso:[null,[Validators.required]],
    cantidad:[null,[Validators.required]],
    valor:[null,[Validators.required]],
    fecha:[null,[Validators.required]],
    total:[null,[Validators.required]],
    proveedor:[null],
  });

}
showModal(): void {
  this.isVisible = true;
}

handleOk(): void {
  if (this.comprasForm.valid) {
    this.isVisible = false;

  }else{
      console.log("error");

  }

}

handleCancel(): void {
  console.log('Button cancel clicked!');
  this.resetForm();
  this.isVisible = false;
}
eliminar(id:number){
console.log(id);

}
editar(id:number){
  console.log(id);

}
toggleCollapse(): void {
  this.isCollapse = !this.isCollapse;
  this.controlArray.forEach((c, index) => {
    c.show = this.isCollapse ? index < 6 : true;
  });
}

resetForm(): void {
  this.comprasForm.reset();
}


date = null;
isEnglish = false;



onChange(result: Date): void {
  console.log('onChange: ', result);
}

createMessage(type: string,mensaje:string): void {
  this.message.create(type,mensaje);
}

}
