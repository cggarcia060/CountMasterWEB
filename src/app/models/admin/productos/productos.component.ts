import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzSelectSizeType } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  productForm!:FormGroup;
  size: NzSelectSizeType = 'default';
  listOfOption=[];
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
this.createForm();
  }
  handleOk(){

    this.productForm.reset()
  }
createForm(){
  this.productForm = this.fb.group({
    nombre:[null,[Validators.required]],
    estado:[null,[Validators.required]],
  });

}

}
