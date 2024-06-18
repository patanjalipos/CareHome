import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SepsisScreeningToolService {

  constructor(private _httpclient: HttpClient) { }

   //#region SepsisScreeningTool Form

   GetSepsisScreeningDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetSepsisScreeningForm',
        { headers: reqHeader, params: params }
    );
}

InsertUpdateSepsisScreeningForm(
  SepsisScreeningFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(SepsisScreeningFormsData).toString();
    return this._httpclient.post<any>(
        environment.BaseUriUser +
            'api/User/InsertUpdateSepsisScreeningForm',
        data,
        { headers: reqHeader, params: params }
    );
}

  //#endregion
}
