import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket$!: WebSocketSubject<any>;

  public connect(url: string): void {
    this.socket$ = webSocket(url);
  }

  public send(message: any): void {
    this.socket$.next(message);
  }

  public onMessage() {
    return this.socket$.asObservable();
  }
  public closeConection() {
    return this.socket$.closed;
  }

  }
