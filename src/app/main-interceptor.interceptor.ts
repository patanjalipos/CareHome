import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { AuthServiceService } from './ui/service/auth-service.service';

@Injectable()
export class MainInterceptorInterceptor implements HttpInterceptor {

  constructor(private _AuthServices:AuthServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const authReq = request.clone({
      headers: new HttpHeaders({
        'Cache-Control':'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        'Pragma':'no-cache',
        'Expires':'0',
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    });

    return next.handle(authReq).pipe(catchError((err: any) => {
      //console.log('this log isn't');
      if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403 || err.status === 0) {
              localStorage.clear();
              this._AuthServices.logout();
          }
      }

    return new Observable<HttpEvent<any>>();
  }));
  }
}
