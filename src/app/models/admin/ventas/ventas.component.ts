import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import {  Unidad, Venta } from 'src/app/shared/utils/interfaz/interfaz';
interface ParentItemData {
  key: number;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number,
  creator: string;
  createdAt: string;
  expand: boolean;
}


interface ChildrenItemData {
  key: number;
  name: string;
  date: string;
  upgradeNum: string;
}
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})

export class VentasComponent implements OnInit {

  Ventas:Venta[]=[];
  isVisible=false;
  isVisibles=false;
  modalInsumo=false;
  modalVenta=true
  validateForm!: FormGroup;
  validateFormInsumos!: FormGroup;

  controlArray: Array<{ index: number; show: boolean }> = [];
  isCollapse = true;
  submitted=false;
  listOfOption: Unidad[]=[{id:1,nombre:''}];
  size: NzSelectSizeType = 'default';
  unid:number=0;
  PesoLibra:number=0;
  singleValue=1;
  listCantidad: Array<{ label: number; value: number }> = [];
  data:any=[];
  editCache: { [key: string]: { edit: boolean; data: any } } = {};
  totalData:any={};
  listOfParentData: ParentItemData[] = [];
  listOfChildrenData: ChildrenItemData[] = [];

  constructor(private fb:FormBuilder,private i18n: NzI18nService) { }

  ngOnInit() {
this.createForm();
this.createForm2();

  for (let i = 0; i < 20; i++) {
    this.listCantidad.push({label:i+1,value:i+1})
   }
  this.validateForm.controls['cantidad'].patchValue(1)
  for (let i = 0; i < 3; ++i) {
    this.listOfParentData.push({
      key: i,
      name: 'Screem',
      platform: 'iOS'+i.toString(),
      version: '10.3.4.5654',
      upgradeNum: 500+i,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
      expand: false
    });
  }
  for (let i = 0; i < 3; ++i) {
    this.listOfChildrenData.push({
      key: i,
      date: '2014-12-24 23:12:00',
      name: 'This is production name',
      upgradeNum: 'Upgraded: 56'
    });
  }
}

eliminar(id:number){
 this.data= this.data.filter((item:any) => item.id !== id)
}
editar(id:number){
  this.editCache[id].edit = true;
}
cancelEdit(id: number): void {
  const index = this.data.findIndex((item:any) => item.id === id);
  this.editCache[id] = {
    data: { ...this.data[index] },
    edit: false
  };

}

saveEdit(id: number): void {
  const index = this.data.findIndex((item:any )=> item.id === id);
  Object.assign(this.data[index], this.editCache[id].data);
  this.editCache[id].edit = false;
  console.log(this.data);
}


id=0
preio=12000
agregarProducto(){
  this.data.push({id:this.id++,producto:this.validateForm.value.producto,precio:this.preio+10000,cantidad:this.validateForm.value.cantidad})
  this.data.forEach((item:any) => {
    this.editCache[item.id] = {
      edit: false,
      data: { ...item }
    };
  });
  this.totalData['precio']=0
  this.totalData['cantidad']=0
  this.data.forEach((d:any)=>{
    this.totalData.precio+=d.precio
    this.totalData.cantidad+=d.cantidad
  })
  this.validateForm.controls['producto'].patchValue(null)
  this.validateForm.controls['cantidad'].patchValue(1)

  console.log(this.data);
}
getUnd(e:any){
console.log(e);
if (e===0 || e===1) {
  this.PesoLibra=0
}else{
  this.PesoLibra=1
}

}
createForm2(){
  this.validateFormInsumos = this.fb.group({
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
createForm(){
  this.validateForm = this.fb.group({
    producto:[null,[Validators.required]],
    descripcion:[null],
    cantidad:[null,[Validators.required]],
  });

}
showModal(): void {
  this.isVisible = true;
    this.modalInsumo=false
    this.modalVenta=true;

}
showModalInsumos():void{
  this.isVisibles = true;
  this.modalVenta=false;
  this.modalInsumo=true
}
handleOk(id:number): void {
 if(id===0){
   this.isVisible = false;

     console.log(this.data);
     this.resetForm();
 }else{
  this.isVisibles = false;
    const newInsumos={
      producto:this.validateFormInsumos.value,
      fecha:new Date(),

    };
  console.log(newInsumos);

 }
}
handleCancel(): void {
  console.log('Button cancel clicked!');
  this.resetForm();
  this.isVisible = false;
  this.isVisibles = false;

}

toggleCollapse(): void {
  this.isCollapse = !this.isCollapse;
  this.controlArray.forEach((c, index) => {
    c.show = this.isCollapse ? index < 6 : true;
  });
}

resetForm(): void {
  this.validateForm.reset();
}


date = null;
isEnglish = false;



onChange(result: Date): void {
  console.log('onChange: ', result);
}

}
