import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictNurseVisitCommunicationService {

  constructor(private _httpclient: HttpClient) { }

  //#region DistrictNurseVisitCommunication Form

  GetDistrictNurseVisitDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriAdmin + 'api/Admin/GetDistrictNurseVisitForm',
        { headers: reqHeader, params: params }
    );
}

InsertUpdateDistrictNurseVisitForm(
  DistrictNurseFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(DistrictNurseFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriAdmin +
            'api/Admin/InsertUpdateDistrictNurseVisitForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
