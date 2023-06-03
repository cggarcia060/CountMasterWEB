import {  Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { animate,trigger,transition,style, state } from "@angular/animations";
import { NzSelectSizeType } from 'ng-zorro-antd/select';

interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[

    trigger('enterState',[
      state('void',style({ transform:'translateX(-100%)',opacity:0 })),
      transition(':enter',[  animate(2000,style({transform:'translateX(0)', opacity:1})) ])
    ]),

    trigger('enterState2',[
      state('void',style({ transform:'translateX(100%)',opacity:0 })),
      transition(':enter',[  animate(2000,style({transform:'translateX(0)', opacity:1})) ])
    ]),
    trigger('states',[
      state('void',style({  transform:'translateY(-100%  )', opacity:0  })),
      transition(':enter',[ animate( 1500,style({transform:'translateY(0)', opacity:1  }))])])

  ]
})

export class HomeComponent implements OnInit {
  visible = false;
  prueba=[1,2,3,4,5,6]
  data: ItemData[] = [];
  isLoadingTwo = false;
  listOfOption: Array<{ label: number; value: number }> = [];
  size: NzSelectSizeType = 'default';
  singleValue=1;

  array = ['../../../../assets/images/principal.jpg','../../../../assets/images/imagen2.jpg','../../../../assets/images/image3.jpg','../../../../assets/images/image4.jpg'];
  @ViewChild('heroinfo') heroinfo!: ElementRef;
  constructor(private renderer:Renderer2) { }

  ngOnInit() {
    for (let i = 0; i < 20; i++) {
      this.listOfOption.push({label:i+1,value:i+1})

     }
  }



  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
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
}
