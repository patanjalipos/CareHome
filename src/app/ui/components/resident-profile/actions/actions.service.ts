import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  constructor(private _httpclient: HttpClient) { }

  GetBodyMappingFormActionList(formId: any, residentAdmissionInfoId: any, actionStatus: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('formId', formId);
    params = params.append('actionStatus', actionStatus);
    params = params.append('residentAdmissionInfoId', residentAdmissionInfoId);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetBodyMappingActionList',
        { headers: reqHeader, params: params }
    );
}
}
