import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MustChartService {

  constructor(private _httpclient: HttpClient) { }


  //#region mustchart

  AddInsertUpdateMustChartForm(mustChartFormData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    console.log(mustChartFormData);
    let params = new HttpParams();
    var data = JSON.stringify(mustChartFormData).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser +
      'api/User/AddInsertUpdateMustChartForm',
      data,
      { headers: reqHeader, params: params }
    );
  }

}
