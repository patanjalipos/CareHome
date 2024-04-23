import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareFeelingFreshAndCleanService {

  constructor(private _httpclient: HttpClient) { }

  //#region CareAssessmentFeelingFreshAndClean DropdownValues

  GetAppearance(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetAppearance',
      { headers: reqHeader, params: params }
  );
  }

  GetCapacity(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetCapacity',
      { headers: reqHeader, params: params }
  );
  }

  GetHygienePreference(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetHygienePreference',
      { headers: reqHeader, params: params }
  );
  }

  GetDressingPreference(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetDressingPreference',
      { headers: reqHeader, params: params }
  );
  }

  GetDressingAndUndressing(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetDressingAndUndressing',
      { headers: reqHeader, params: params }
  );
  }

  GetGrooming(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetGrooming',
      { headers: reqHeader, params: params }
  );
  }

  GetGroomingAssistance(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetGroomingAssistance',
      { headers: reqHeader, params: params }
  );
  }

  GetHairRoutine(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetHairRoutine',
      { headers: reqHeader, params: params }
  );
  }

  GetEyeCare(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetEyeCare',
      { headers: reqHeader, params: params }
  );
  }

  GetNailCare(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetNailCare',
      { headers: reqHeader, params: params }
  );
  }

  GetMakeup(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetMakeup',
      { headers: reqHeader, params: params }
  );
  }

  GetJewellery(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetJewellery',
      { headers: reqHeader, params: params }
  );
  }

  GetFragrance(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetFragrance',
      { headers: reqHeader, params: params }
  );
  }

  GetFaceAndBodyCreams(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetFaceAndBodyCreams',
      { headers: reqHeader, params: params }
  );
  }

  GetGoalsToAchieveFreshAndClean(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetGoalsToAchieveFreshAndClean',
      { headers: reqHeader, params: params }
  );
  }

  GetStrategyToManageHygiene(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetStrategyToManageHygiene',
      { headers: reqHeader, params: params }
  );
  }

  GetActionToManageAdditionalRisk(id:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      //'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('fromId', id);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetActionToManageAdditionalRisk',
      { headers: reqHeader, params: params }
  );
  }

  //#endregion

  //#region CareAssessmentFeelingFreshAndClean Form

  GetCareAssessmentFreshAndCleanDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        //'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriAdmin + 'api/Admin/GetCareAssessmentFreshAndCleanForm',
        { headers: reqHeader, params: params }
    );
}

AddInsertUpdateCareAssessmentFreshAndCleanForm(
  CareAssessmentFreshAndCleanFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        //'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(CareAssessmentFreshAndCleanFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriAdmin +
            'api/Admin/AddInsertUpdateCareAssessmentFreshAndCleanForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
