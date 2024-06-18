import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareSkinAssessmentService {

  constructor(private _httpclient: HttpClient) { }

  //#region CareSkinAssessment Form

  GetCareSkinAssessmentDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetCareSkinAssessmentForm',
        { headers: reqHeader, params: params }
    );
}

AddInsertUpdateCareSkinAssessmentForm(
  CareSkinAssessmentFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(CareSkinAssessmentFormsData).toString();
   
    return this._httpclient.post<any>(
        environment.BaseUriUser +
            'api/User/AddInsertUpdateCareSkinAssessmentForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
