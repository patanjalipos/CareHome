import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CareAssessmentMyEpilepsyService {

  constructor(private _httpclient: HttpClient) { }

  //#region CareAssessmentEpilepsySupportPlan Form

  GetEpilepsySupportDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetEpilepsySupportForm',
        { headers: reqHeader, params: params }
    );
}

InsertUpdateEpilepsySupportForm(
  PoolActivityFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(PoolActivityFormsData).toString();

    return this._httpclient.post<any>(
        environment.BaseUriUser +
            'api/User/InsertUpdateEpilepsySupportForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
