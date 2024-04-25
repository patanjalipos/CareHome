import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantsService } from './constants.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private _ConsService: ConstantsService
    //,
    //private _AuthService: AuthService
    ) { }
  Login(LoginId:string, Password:string): Observable<any> 
    {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser
        });
        let params = new HttpParams();
        console.log(environment.BaseUriUser);
        var UserMasterNew:any=<any>{};
        UserMasterNew.LoginId=LoginId;
        UserMasterNew.Password=Password;

        var data = JSON.stringify(UserMasterNew);
        return this.httpClient.post<any>(environment.BaseUriUser + "api/User/ValidateUser", data, { "headers": reqHeader, "params": params });

        // var data = "LoginId=" + LoginId + "&Password=" + Password;
        // var data = JSON.stringify(CaptchaModel);
        // return this.httpClient.get(this._ConsService.BaseUri + "api/User/ValidateUser?" + data);
    }

    logout() {
      localStorage.clear();
      this.router.navigate(['/auth/login'], {
        queryParams: {},
      });
    }
}
