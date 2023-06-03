import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScriptionService } from 'src/app/core/Scription/Scription.service';
import { TokenService } from 'src/app/core/service/utils/token.service';
import { Constant } from 'src/app/shared/utils/constant/constant';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public isCollapsed:boolean = false;
  public path:string='';
  public username:string='';
  public usernameInicial:string='';
  public component:any=[];
  isDarkTheme: boolean = false;
  constructor(private router:Router,private authService:TokenService,private script:ScriptionService) { }
theme:boolean=false;
  ngOnInit(): void {
    const component:any=this.authService.getComponentes();
      console.log(component);

    const array=Constant.ARRAYMENU



  this.authService.setLocalStorage(Constant.PRC,this.script.encrypt(JSON.stringify({proceso:component.procesoId,roles:component.rolId})));
  array.forEach(a=>{
    console.log(a);
    if(component[a.key]){
        this.component.push(a);
      }

    })
  this.path= this.router.url.split('/')[2]
  console.log(this.router.url.split('/'));
  this.username=this.authService.getUserName();
  this.usernameInicial=this.username[0].toLocaleUpperCase();


  }
  isSelected(path:string){
    this.path=path
  }
  collapsed(){
    this.isCollapsed = !this.isCollapsed
  }
  logout(){
    this.authService.logOut();
  }

}
