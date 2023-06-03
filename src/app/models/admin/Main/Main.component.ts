import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/service/utils/token.service';

@Component({
  selector: 'app-Main',
  templateUrl: './Main.component.html',
  styleUrls: ['./Main.component.scss']
})
export class MainComponent implements OnInit {
  public isCollapsed = false;
  public path:string='';
  public username="";

  constructor(private router:Router,private authService:TokenService) { }

  ngOnInit(): void {
    this.path= this.router.url.split('/')[2]
    console.log(this.router.url.split('/'));
    this.username=this.authService.getUserName();
   console.log(this.username);

  }
  isSelected(path:string){
    this.path=path
  }
  collapsed(){
    this.isCollapsed = !this.isCollapsed
  }

}
