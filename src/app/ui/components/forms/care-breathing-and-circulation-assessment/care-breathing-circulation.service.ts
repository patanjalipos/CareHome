import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareBreathingCirculationService {

  constructor(private _httpclient: HttpClient) {}

InsertUpdateCareAssBreathCirculationForm(
    AcuteCarePlanFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(AcuteCarePlanFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriUser +
            'api/User/InsertUpdateCareAssBreathCirculationForm',
        data,
        { headers: reqHeader, params: params }
    );
}
GetCareBreathingCirculationFormById(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetCareBreathingCirculationFormById',
        { headers: reqHeader, params: params }
    );
}
}
