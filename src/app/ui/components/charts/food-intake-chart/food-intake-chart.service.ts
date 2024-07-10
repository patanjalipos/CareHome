import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodIntakeChartService {

  constructor(private _httpclient: HttpClient) { }


  //#region food intake chart

  AddInsertUpdateFoodIntakeChartForm(foodIntakeChartFormData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(foodIntakeChartFormData).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser +
      'api/User/AddInsertUpdateFoodIntakeChartForm',
      data,
      { headers: reqHeader, params: params }
    );
  }
}
