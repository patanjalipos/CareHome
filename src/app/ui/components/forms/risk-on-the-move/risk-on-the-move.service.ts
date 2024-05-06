import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskOnTheMoveService {

  constructor(private _httpclient: HttpClient) { }

  //#region RiskAssessmentOnTheMove Form

  GetRiskAssOnTheMoveDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriAdmin + 'api/Admin/GetRiskAssOnTheMoveForm',
        { headers: reqHeader, params: params }
    );
}

InsertUpdateRiskAssOnTheMoveForm(
  RiskAssOnTheMoveFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(RiskAssOnTheMoveFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriAdmin +
            'api/Admin/InsertUpdateRiskAssOnTheMoveForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
