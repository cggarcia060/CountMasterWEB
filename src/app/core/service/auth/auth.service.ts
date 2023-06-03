import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { Data, IMensaje } from 'src/app/shared/utils/interfaz/interfaz';
import { JwtDTO, LoginUsuario,Usuario } from 'src/app/shared/utils/model/model';
import { environment } from 'src/environments/environment';
import { ScriptionService } from '../../Scription/Scription.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private httpHeaders=Constant.httpHeaders;
private url=environment.url+'/auth';
private loginUser='/login';
private registro='/nuevo';
private refreshToken='/refresh';
constructor(private http:HttpClient,private script:ScriptionService) { }

login(credenciales:LoginUsuario):Observable<JwtDTO>{
  // const crdncls={crdncls:this.script.encript(credenciales)}
  return this.http.post<JwtDTO>(this.url+this.loginUser,credenciales)
}

register(usuario:Usuario):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.registro,usuario)
}

public refresh(dto: JwtDTO): Observable<JwtDTO> {
  return this.http.post<JwtDTO>(this.url+this.refreshToken, dto);
}



}
