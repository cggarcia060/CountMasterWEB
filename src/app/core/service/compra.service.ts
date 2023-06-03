import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from 'src/app/shared/utils/interfaz/interfaz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private list='/lista'
  private save="/save"
  private delete="/delete"
  private update="/update"
  private url=environment.url+'/compra'
  private httpHeaders:any;

constructor(private http:HttpClient) {
  this.httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
 }

getListCompra():Observable<any>{
  return this.http.get(this.url+this.list,this.httpHeaders)
}
saveCompra(compra:Compra):Observable<any> {
  return this.http.post<any>(this.url+this.save,compra);
}
}
