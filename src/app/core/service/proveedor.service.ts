import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private list='/lista'
  private saveCategory="/save"
  private delete="/delete"
  private update="/update"
  private url=environment.url+'/proveedor'
  httpHeaders:any

  constructor(private http:HttpClient) {
    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
  }

  getListProveedores():Observable<any>{
    return this.http.get(this.url+this.list,this.httpHeaders)
  }
  // saveCategoria(categoria:Categoria):Observable<any> {
  //   return this.http.post<any>(this.url+this.saveCategory,categoria);
  // }
  // updateCategoria(id:number,categoria:Categoria):Observable<any> {
  //   return this.http.post<any>(this.url+this.update+'/'+id,categoria);
  // }
  // deleteCategoria(id:number):Observable<any>{
  //   const param= new HttpParams().set('id', id);
  //   return this.http.delete<any>(this.url+this.delete,{params: param});
  // }

}
