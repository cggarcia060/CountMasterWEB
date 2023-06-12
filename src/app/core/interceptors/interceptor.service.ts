import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest,HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TokenService } from '../service/utils/token.service';
import { AuthService } from '../service/auth/auth.service';
import { catchError, concatMap } from 'rxjs/operators';
import { JwtDTO } from 'src/app/shared/utils/model/model';

const AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private tokenService:TokenService,private authService:AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq: HttpRequest<any> = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.log("this.tokenService.getToken() ",this.tokenService.getToken());
          const dto: JwtDTO = new JwtDTO( this.tokenService.getToken());
          return this.authService.refresh(dto).pipe(
            concatMap((data: any) => {
              console.log("intwrceptor ",data);
              console.log('refreshing....');
              this.tokenService.setToken(data.token);
              intReq = this.addToken(req, data.token);
              return next.handle(intReq);
            })
          );
        } else if (err.status === 403) {
          if (!this.tokenService.isSuperAdmin()) {
            this.tokenService.logOut();
          }
            throw err;

        }else if (err.status === 400) {
          throw err;
        }
        else if( err.status===0){
          console.log("error 0");
          err['error']['mensaje']="No hay conexion"
          throw err;
        }  else {
          throw err;
        }
      })
    );
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
}
}

export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];
