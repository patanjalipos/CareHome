import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmokingRiskAssessmentService {

  constructor(private httpclient: HttpClient) { }

  
  GetSmokingRiskAssessmentDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this.httpclient.get<any>(
      environment.BaseUriAdmin + 'api/Admin/GetSmokingRiskAssessmentDetails',
      { headers: reqHeader, params: params }
    );
  }



  AddInsertUpdateSmokingRiskAssessmentForm(smokingRiskAssessmentFormData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriAdmin,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(smokingRiskAssessmentFormData).toString();
    return this.httpclient.post<any>(environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateSmokingRiskAssessmentForm', data, { headers: reqHeader, params: params }
    );
  }
}
