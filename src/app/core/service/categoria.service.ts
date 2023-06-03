import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constant } from 'src/app/shared/utils/constant/constant';
import { Categoria } from 'src/app/shared/utils/interfaz/interfaz';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
private list='/list';
private saveCategory="/save";
private delete="/delete";
private update="/update";
private url=environment.url+'/categoria';
private httpHeaders=Constant.httpHeaders;

constructor(private http:HttpClient) {

}

getListCategoria():Observable<any>{
  return this.http.get(this.url+this.list,this.httpHeaders)
}
saveCategoria(categoria:Categoria):Observable<any> {
  return this.http.post<any>(this.url+this.saveCategory,categoria);
}
updateCategoria(id:number,categoria:Categoria):Observable<any> {
  return this.http.post<any>(this.url+this.update+'/'+id,categoria);
}
deleteCategoria(id:number):Observable<any>{
  const param= new HttpParams().set('id', id);
  return this.http.delete<any>(this.url+this.delete,{params: param});
}

}
