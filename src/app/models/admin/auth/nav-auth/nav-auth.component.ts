import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/service/utils/token.service';
import { UtilsService } from 'src/app/core/service/utils/utils.service';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.scss']
})
export class NavAuthComponent implements OnInit {
sesion:boolean=false;
  constructor(private tokenServices:TokenService,private util:UtilsService) { }

  ngOnInit() {
    console.log(this.tokenServices.getToken());
    this.util.logout.subscribe(d=>{
      this.sesion=this.tokenServices.getToken()||d ? true:false;
    })
  }
  logout(){
    this.tokenServices.logOut();
  }

}
