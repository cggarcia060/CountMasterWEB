import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { IMensaje, IProceso, ProcesoDto } from 'src/app/shared/utils/interfaz/interfaz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcesosService {

  private httpHeaders=Constant.httpHeaders;
  private url=environment.url;

  private list='/procesos/list';
  private save='/procesos/save';
  private update='/procesos/update';
  private delete='/procesos/delete/';

  // private usuarioByprocess='/permisos/usuarioProcess';

constructor(private http:HttpClient) { }

getProcesos():Observable<IProceso[]>{
  return this.http.get<IProceso[]>(this.url+this.list);
}
saveProceso(data:ProcesoDto):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.save,data);
}
updateProceso(data:IProceso):Observable<IMensaje>{
  return this.http.post<IMensaje>(this.url+this.update,data);
}
deleteProceso(id:number):Observable<IMensaje>{
  return this.http.get<IMensaje>(this.url+this.delete+id);
}
// getUsuarioByProcess(data:any):Observable<any>{
//   return this.http.post<any>(this.url+this.usuarioByprocess,data)
// }


}
