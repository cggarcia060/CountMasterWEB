import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { Data, DataId, IMensaje, IRequestContainer } from 'src/app/shared/utils/interfaz/interfaz';
import { Usuario } from 'src/app/shared/utils/model/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private httpHeaders=Constant.httpHeaders;
  private url=environment.url;

  private delete='/usuarios/delete';
  private update='/usuarios/update';
  private usuarioByprocess='/usuarios/usuarioProcess';
  private usuariosAll='/usuarios/list';


constructor(private http:HttpClient) { }

deleteUsuario(data:DataId):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.delete,data)
}
updateUsuario(data:Usuario):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.update,data)
}
getUsuarioByProcess(data:IRequestContainer):Observable<any>{
  return this.http.post<any>(this.url+this.usuarioByprocess,data)
}
getUsuarioAll():Observable<any>{
  return this.http.get<any>(this.url+this.usuariosAll)
}
}
