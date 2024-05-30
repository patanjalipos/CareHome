import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloodPressureChartService {

  constructor(private _httpclient: HttpClient) { }

  AddInsertUpdateBloodPressureChartForm(BloodPressureChartForm: any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(BloodPressureChartForm).toString();
    console.log(data);
    return this._httpclient.post<any>(
      environment.BaseUriUser +
      'api/User/AddInsertUpdateBloodPressureChart',
      data,
      { headers: reqHeader, params: params }
    );
  }
}
