import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { IMensaje, IPermiso, IPermisoDto, IRequestContainer } from 'src/app/shared/utils/interfaz/interfaz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private httpHeaders=Constant.httpHeaders;
  private url=environment.url;

  private permisosByProcesso='/permisos/process';
  private permisosByUsuarioByprocess='/permisos/usuarioProcess';
  private permisosAll='/permisos/listAll';
  private permisos='/permisos/list';
  private permisoSave='/permisos/save';
  private permisoUpdate='/permisos/update';
  private permisoDelete='/permisos/delete/';


constructor(private http:HttpClient) { }

getPermisos(credenciales:any):Observable<any>{
  return this.http.post<any>(this.url+this.permisosByProcesso,credenciales)
}

getPermisosUsuarioByProcess(data:any):Observable<any>{
  return this.http.post<any>(this.url+this.permisosByUsuarioByprocess,data)
}

getPermisosAll():Observable<IPermiso[]>{
  return this.http.get<IPermiso[]>(this.url+this.permisosAll);
}

getPermisosByProcessAndRol(data:IRequestContainer):Observable<IPermiso[]>{
  return this.http.post<IPermiso[]>(this.url+this.permisos,data);
}

savePermiso(permiso:IPermisoDto):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.permisoSave,permiso);
}

updatePermiso(permiso:IPermiso):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.permisoUpdate,permiso);
}
deletePermiso(id:number):Observable<IMensaje>{
  return this.http.get<IMensaje>(this.url+this.permisoDelete+id);
}

}
