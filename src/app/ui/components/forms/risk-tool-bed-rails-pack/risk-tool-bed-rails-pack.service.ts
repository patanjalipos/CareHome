import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskToolBedRailsPackService {

  constructor(private _httpclient: HttpClient) { }

  //#region RiskToolBedRailsPack Form

  GetRiskToolBedRailsDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetRiskToolBedRailsForm',
        { headers: reqHeader, params: params }
    );
}

InsertUpdateRiskToolBedRailsForm(
  RiskToolFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(RiskToolFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriUser +
            'api/User/InsertUpdateRiskToolBedRailsForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
