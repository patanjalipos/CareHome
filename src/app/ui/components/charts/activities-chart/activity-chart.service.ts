import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityChartService {

  constructor(private _httpclient: HttpClient) { }


  //#region ActivityChart

  AddInsertUpdateActivityChartForm(ActivitiesChartFormData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(ActivitiesChartFormData).toString();
    console.log(data);
    return this._httpclient.post<any>(
      environment.BaseUriUser +
      'api/User/AddInsertUpdateActivitiesChart',
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetActivityChartById(admissionid, userid): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('admissionid', admissionid);
    params = params.append('userid', userid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + 'api/User/GetActivityChartById',
      { headers: reqHeader, params: params }
    );
  }

  GetActivitiesChartDetails(){
    
  }

  //#endregion
}
