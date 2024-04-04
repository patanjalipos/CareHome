import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from './ui/service/auth-service.service';

@Injectable()
export class MainInterceptorInterceptor implements HttpInterceptor {

  constructor(private _AuthServices:AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authReq = request.clone({
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    });
    // const modifiedReq = request.clone({ 
    //   headers: request.headers
    //   .set('Cache-Control', `no-cache, no-store, must-revalidate, post-check=0, pre-check=0`)
    //   .set('Pragma',`no-cache`)
    //   .set('Expires',`0`)
    //   .set('Authorization','Bearer ' + localStorage.getItem('token'))
    // });

    return next.handle(authReq);
  }
}
