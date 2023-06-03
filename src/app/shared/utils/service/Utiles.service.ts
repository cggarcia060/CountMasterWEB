import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class UtilesService {

constructor(private message: NzMessageService) { }
createMessage(type: string,mensaje:string): void {
  this.message.create(type,mensaje);
}
}
