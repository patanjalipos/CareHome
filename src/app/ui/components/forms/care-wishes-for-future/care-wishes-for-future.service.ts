import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareWishesForFutureService {

  constructor(private _httpclient: HttpClient) { }




  GetCareWishesForFutureDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetCareWishesForFutureDetails',
      { headers: reqHeader, params: params }
    );
  }



  AddInsertUpdateCareWishesForFutureForm(CareWishesForFutureFormData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(CareWishesForFutureFormData).toString();
    return this._httpclient.post<any>(environment.BaseUriAdmin + 'api/Admin/InsertUpdateCareWishesForFuture', data, { headers: reqHeader, params: params }
    );
  }
}
