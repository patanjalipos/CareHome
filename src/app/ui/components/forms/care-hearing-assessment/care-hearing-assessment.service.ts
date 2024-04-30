import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareHearingAssessmentService {

  constructor(private _httpclient: HttpClient) { }

  //#region CareAssessmentHearing DropDownValues

  // GetHearingDiagnosisCheck(status:any) {
  //   let reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': environment.BaseUriAdmin,
  //     //'Authorization': 'Bearer ' + localStorage.getItem('token')
  // });
  // let params = new HttpParams();
  // params = params.append('Status', status);
  // return this._httpclient.get<any>(
  //     environment.BaseUriAdmin + 'api/Admin/GetHearingDiagnosisCheck',
  //     { headers: reqHeader, params: params }
  // );
  // }

  // GetCurrentHearingDiagnosis(status:any) {
  //   let reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': environment.BaseUriAdmin,
  //     //'Authorization': 'Bearer ' + localStorage.getItem('token')
  // });
  // let params = new HttpParams();
  // params = params.append('Status', status);
  // return this._httpclient.get<any>(
  //     environment.BaseUriAdmin + 'api/Admin/GetCurrentHearingDiagnosis',
  //     { headers: reqHeader, params: params }
  // );
  // }

  // GetHearingInterventions(status:any) {
  //   let reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': environment.BaseUriAdmin,
  //     //'Authorization': 'Bearer ' + localStorage.getItem('token')
  // });
  // let params = new HttpParams();
  // params = params.append('Status', status);
  // return this._httpclient.get<any>(
  //     environment.BaseUriAdmin + 'api/Admin/GetHearingInterventions',
  //     { headers: reqHeader, params: params }
  // );
  // }

  // GetHearingAids(status:any) {
  //   let reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': environment.BaseUriAdmin,
  //     //'Authorization': 'Bearer ' + localStorage.getItem('token')
  // });
  // let params = new HttpParams();
  // params = params.append('Status', status);
  // return this._httpclient.get<any>(
  //     environment.BaseUriAdmin + 'api/Admin/GetHearingAids',
  //     { headers: reqHeader, params: params }
  // );
  // }

  // GetAidsAssistance(status:any) {
  //   let reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': environment.BaseUriAdmin,
  //     //'Authorization': 'Bearer ' + localStorage.getItem('token')
  // });
  // let params = new HttpParams();
  // params = params.append('Status', status);
  // return this._httpclient.get<any>(
  //     environment.BaseUriAdmin + 'api/Admin/GetAidsAssistance',
  //     { headers: reqHeader, params: params }
  // );
  // }

  // GetGoalsToHearing(status:any) {
  //   let reqHeader = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': environment.BaseUriAdmin,
  //     //'Authorization': 'Bearer ' + localStorage.getItem('token')
  // });
  // let params = new HttpParams();
  // params = params.append('Status', status);
  // return this._httpclient.get<any>(
  //     environment.BaseUriAdmin + 'api/Admin/GetGoalsToHearing',
  //     { headers: reqHeader, params: params }
  // );
  // }

  //#endregion

  //#region CareAssessmentHearing Form

  GetCareAssessmentHearingDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriAdmin + 'api/Admin/GetCareAssessmentHearingForm',
        { headers: reqHeader, params: params }
    );
}

AddInsertUpdateCareAssessmentHearingForm(
  CareAssessmentHearingFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(CareAssessmentHearingFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriAdmin +
            'api/Admin/AddInsertUpdateCareAssessmentHearingForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
