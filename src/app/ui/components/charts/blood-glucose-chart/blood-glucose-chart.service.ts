import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloodGlucoseChartService {

  constructor(private _httpclient: HttpClient) { }


  //#region BloodGlucoseChart

  AddInsertUpdatebloodGlucoseChartForm(bloodGlucoseChartFormData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(bloodGlucoseChartFormData).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser +
      'api/User/AddInsertUpdatebloodGlucoseChartForm',
      data,
      { headers: reqHeader, params: params }
    );
  }


  // GetBloodGlucoseChartById(selectedChartID: any): Observable<any> {
  //   let reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': environment.BaseUriUser,
  //     'Authorization': 'Bearer ' + localStorage.getItem('token')
  //   });
  //   let params = new HttpParams();
  //   params = params.append('chartId', selectedChartID);
  //   return this._httpclient.get<any>(
  //     environment.BaseUriUser + 'api/User/GetBloodGlucoseChartById',
  //     { headers: reqHeader, params: params }
  //   );
  // }
}
