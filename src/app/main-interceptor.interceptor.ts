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
  constructor(private _AuthServices: AuthServiceService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const modifiedReq = request.clone({
      headers: request.headers
        .set('Cache-Control', `no-cache, no-store, must-revalidate, post-check=0, pre-check=0`)
        .set('Pragma', `no-cache`)
        .set('Expires', `0`)
        //vulnerable Clickjacking
      .set('X-Frame-Options', 'SAMEORIGIN')
      //Missing Security Headers
      .set('X-XSS-Protection', '1; mode=block')
      .set('Strict-Transport-Security', 'max-age=60000; includeSubDomains')
      .set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'")
   
    });
    return next.handle(modifiedReq).pipe(catchError((err: any) => {

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
