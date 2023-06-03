import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


logout= new BehaviorSubject<boolean>(false);

public sesion(data:any){
  this.logout.next(data);
}


}
