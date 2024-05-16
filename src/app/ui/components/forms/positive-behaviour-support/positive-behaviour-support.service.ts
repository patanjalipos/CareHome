import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PositiveBehaviourSupportService {

  constructor(private _httpclient: HttpClient) { }





  GetPositiveBehaviourSupportDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetPositiveBehaviourSupportDetails',
      { headers: reqHeader, params: params }
    );
  }


  AddInsertUpdatePositiveBehaviourSupportForm(PositiveBehaviourSupportFormsData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(PositiveBehaviourSupportFormsData).toString();
    console.log("last data");
    console.log(data);

    return this._httpclient.post<any>(environment.BaseUriAdmin + 'api/Admin/AddInsertUpdatePositiveBehaviourSupportForm', data, { headers: reqHeader, params: params }
    );
  }
} 
