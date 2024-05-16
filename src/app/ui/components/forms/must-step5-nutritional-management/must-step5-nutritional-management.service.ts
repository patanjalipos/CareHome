import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MustStep5NutritionalManagementService {

  constructor(private _httpclient: HttpClient) { }

  //#region NutritionalManagementPlan Form

  GetNutritionalManagementDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriAdmin + 'api/Admin/GetNutritionalManagementPlanForm',
        { headers: reqHeader, params: params }
    );
}

InsertUpdateNutritionalManagementForm(
  NutritionalManagementFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(NutritionalManagementFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriAdmin +
            'api/Admin/InsertUpdateNutritionalManagementPlanForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
