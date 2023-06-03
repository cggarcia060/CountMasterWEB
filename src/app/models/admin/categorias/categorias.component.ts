import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoriaService } from 'src/app/core/service/categoria.service';
import { WebsocketService } from 'src/app/core/service/websocket.service';
import { Categoria } from 'src/app/shared/utils/interfaz/interfaz';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  public categoriaForm!:FormGroup;
  public size: NzSelectSizeType = 'default';
  public dataCategory:any;
  public dataCategoryCopy:any;
  public dataEdit:any;
  constructor(private fb:FormBuilder,private categoriaService:CategoriaService,
    private message: NzMessageService,private spinner:NgxSpinnerService,private webSocketService:WebsocketService) { }

  ngOnInit() {
    this.createForm();
    this.getList();
    this.categoriaForm.controls['estado'].patchValue(false)

  }

  getList(){
    this.categoriaService.getListCategoria().subscribe({
      next:data =>{ console.log(data);
        this.dataCategory=data;
      },
      error:err=>{
        this.createMessage('error',err)
      }
      }
    )
  }
  handleOk(){
    if (!this.categoriaForm.value.id) {
      const categoria:Categoria=this.categoriaForm.value;
      this.categoriaService.saveCategoria(categoria).subscribe({
        next:data=>{
            this.createMessage(data.status,data.data);
            this.getList();
            this.categoriaForm.reset();
      },
      error:err=>{
        this.createMessage('error',err)
      }
    }
      );
    }else{
      console.log("editar");
      const categoriaEdit:Categoria={
        nombre:this.categoriaForm.value.nombre,
        estado:this.categoriaForm.value.estado
      }
      this.categoriaService.updateCategoria(this.categoriaForm.value.id,categoriaEdit).subscribe({
        next:data=>{
            this.createMessage(data.status,data.data)
            this.getList()
            this.categoriaForm.reset()
        },
        error:err=>{
          this.createMessage('error',err)
        }
      }
        );
    }

  }
  createForm(){
    this.categoriaForm = this.fb.group({
    id:[null],
    nombre:[null,[Validators.required]],
    estado:[null,[Validators.required]],
  });

}
eliminar(id:number){
console.log(id);
  this.categoriaService.deleteCategoria(id).subscribe({
    next:data=>{
        this.createMessage(data.status,data.data)
         this.getList()
    },
    error:err=>{
      this.createMessage('error',err)
    }
  })

}
editar(id:number){
    this.dataEdit=this.dataCategoryCopy.find((x:any)=> x.id==id)
    this.categoriaForm.patchValue({...this.dataEdit})
}

createMessage(type: string,mensaje:string): void {
  this.message.create(type,mensaje);
}

}
