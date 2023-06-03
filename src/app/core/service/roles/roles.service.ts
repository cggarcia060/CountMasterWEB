import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/shared/utils/constant/constant';
import {  IMensaje, IRol, IRolDto } from 'src/app/shared/utils/interfaz/interfaz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private httpHeaders=Constant.httpHeaders;
  private url=environment.url;

  private list='/roles/list';
  private save='/roles/save';
  private update='/roles/update';
  private delete='/roles/delete/';

  // private usuarioByprocess='/permisos/usuarioProcess';

constructor(private http:HttpClient) { }

getRoles():Observable<IRol[]>{
  return this.http.get<IRol[]>(this.url+this.list)
}
saveRol(data:IRolDto):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.save,data);
}
updateRol(data:IRol):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.update,data);
}
deleteRol(id:number):Observable<IMensaje>{
  return this.http.get<IMensaje>(this.url+this.delete+id);
}
// getUsuarioByProcess(data:any):Observable<any>{
//   return this.http.post<any>(this.url+this.usuarioByprocess,data)
// }


}
