import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareEatsAndTreatsService {

  constructor(private _httpclient: HttpClient) { }


  //#region CareAssessmentEatsAndDrinksDropDownValues
  GetResidentStatusOfCapacity(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetResidentStatusOfCapacity',
      { headers: reqHeader, params: params }
  );
  }

  GetChoking(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetChoking',
      { headers: reqHeader, params: params }
  );
  }

  GetFood(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetFood',
      { headers: reqHeader, params: params }
  );
  }

  GetFluids(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetFluids',
      { headers: reqHeader, params: params }
  );
  }

  GetActionNeededToReduceChoking(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetActionNeededToReduceChoking',
      { headers: reqHeader, params: params }
  );
  }

  GetGoalsToAchieve(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetGoalsToAchieve',
      { headers: reqHeader, params: params }
  );
  }

  GetProfessionalInput(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetProfessionalInput',
      { headers: reqHeader, params: params }
  );
  }

  GetRiskOfMalnutrition(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetRiskOfMalnutrition',
      { headers: reqHeader, params: params }
  );
  }

  GetStrategyToManageNutrition(status:any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
  });
  let params = new HttpParams();
  params = params.append('Status', status);
  return this._httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetStrategyToManageNutrition',
      { headers: reqHeader, params: params }
  );
  }

  //#endregion

  //#region CareAssessmentEatsAndDrinks Form

  GetCareAssessmentEatsAndDrinksDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriAdmin + 'api/Admin/GetCareAssessmentEatsAndDrinksForm',
        { headers: reqHeader, params: params }
    );
}

AddInsertUpdateCareAssessmentEatsAndDrinksForm(
    CareAssessmentEatsAndDrinksFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(CareAssessmentEatsAndDrinksFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriAdmin +
            'api/Admin/AddInsertUpdateCareAssessmentEatsAndDrinksForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
