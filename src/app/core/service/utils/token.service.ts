import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { ScriptionService } from '../../Scription/Scription.service';
import { UtilsService } from './utils.service';



@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string> = [];

  constructor(
    private router: Router,private script:ScriptionService,
    private util:UtilsService
  ) { }

  public setToken(token: string): void {
    window.localStorage.removeItem(Constant.TOKEN_KEY);
    window.localStorage.setItem(Constant.TOKEN_KEY, token);
  }


  public setLocalStorage(param:string,data:any){
    window.localStorage.removeItem(param);
    window.localStorage.setItem(param, data);
  }

  public getLocalStorage(param:string): string|any {
    return localStorage.getItem(param);
  }

  public getToken(): string|any {
    return localStorage.getItem(Constant.TOKEN_KEY);
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
  public getUserName(): string|any {
    if (!this.isLogged()) {
      return null;
    }
    const token=this.script.decrypt(this.getToken());
    console.log("token ",token);
    const payload = token.split('.')[1];
    const payloadDecoded = window.atob(payload);
    const values = JSON.parse(payloadDecoded);
    const username =values.sub;
    console.log(username);
    return username;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token=this.script.decrypt(this.getToken());
    const payload = token.split('.')[1];
    const payloadDecoded = window.atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles =values.roles
    if (roles.indexOf(Constant.ADMIN) < 0) {
      return false;
    }
    return true;
  }

  getComponentes(){

    return  JSON.parse(this.script.decrypt(this.getLocalStorage(Constant.COMPONENTS)));
  }


  public rol() {
    if (!this.isLogged()) {
      return false;
    }
    const token=this.script.decrypt(this.getToken());
    const payload = token.split('.')[1];
    const payloadDecoded = window.atob(payload);
    const values = JSON.parse(payloadDecoded);

    return values.roles

  }

  public procesos() {
    if (!this.isLogged()) {
      return false;
    }
    const token=this.script.decrypt(this.getToken());
    const payload = token.split('.')[1];
    const payloadDecoded = window.atob(payload);
    const values = JSON.parse(payloadDecoded);
    if (values?.procesos) {
      if (values?.procesos.length <= 0) {
        this.logOut();
      }
    }
    return values?.procesos
  }


  public isSuperAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.script.decrypt(this.getToken());
    const payload = token.split('.')[1];
    const payloadDecoded = window.atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles =values.roles[0]
    console.log("roles",roles);

    if (roles.rolNombre != Constant.SUPERADMIN) {
      return false;
    }
    return true;
  }




  public logOut(): void {
    window.localStorage.clear();
    this.util.sesion(false);
    this.router.navigate(['admin/auth/login']);
  }

}
