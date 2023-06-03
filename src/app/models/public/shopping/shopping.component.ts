import { Component, OnInit } from '@angular/core';
import { NzSelectSizeType } from 'ng-zorro-antd/select';
interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  data: ItemData[] = [];
  isLoadingTwo = false;
  listOfOption: Array<{ label: number; value: number }> = [];
  size: NzSelectSizeType = 'default';
  singleValue=1;


  ngOnInit(): void {
    this.loadData(1);
 for (let i = 0; i < 20; i++) {
  this.listOfOption.push({label:i+1,value:i+1})

 }
  }

  loadData(pi: number): void {
  console.log("prueba");

  }
  loadTwo(): void {
    this.isLoadingTwo = true;
    setTimeout(() => {
      this.isLoadingTwo = false;
    }, 5000);
  }
  cancel(): void {
    console.log('cancelado');

  }

  confirm(): void {
    console.log('confirmado')
  }



}
