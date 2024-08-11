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
  private logoutTimer: any;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private _ConsService: ConstantsService
    //,
    //private _AuthService: AuthService
  ) { }

  startUserActivityTracking() {
    window.addEventListener('mousemove', () => this.resetLogoutTimer());
    window.addEventListener('click', () => this.resetLogoutTimer());
    window.addEventListener('keydown', () => this.resetLogoutTimer());
    this.startLogoutTimer();
  }
  stopUserActivityTracking() {
    window.removeEventListener('mousemove', this.resetLogoutTimer.bind(this));
    window.removeEventListener('click', this.resetLogoutTimer.bind(this));
    window.removeEventListener('keydown', this.resetLogoutTimer.bind(this));
    clearTimeout(this.logoutTimer);
  }
  resetLogoutTimer() {
    clearTimeout(this.logoutTimer);
    this.startLogoutTimer();
  }

  startLogoutTimer() {
    this.logoutTimer = setTimeout(() => {
      this.logout();
    }, 1200000); // 20 minutes in ms
  }
  Login(LoginId: string, Password: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser
    });
    let params = new HttpParams();
    var UserMasterNew: any = <any>{};
    UserMasterNew.LoginId = LoginId;
    UserMasterNew.Password = Password;

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

  GetForgotPassword(LoginId): Observable<any> {
    var data = "LoginId=" + LoginId;
    return this.httpClient.get(environment.BaseUriUser + "api/User/GetForgotPassword?" + data);
  }

  ChangePassword(oldPassword, newPassword) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('userId', localStorage.getItem('userId'));
    params = params.append('oldPassword', oldPassword);
    params = params.append('newPassword', newPassword);
    var data = "";
    return this.httpClient.post<any>(environment.BaseUriUser + "api/User/ChangePassword", data, { "headers": reqHeader, "params": params });
  }
}
