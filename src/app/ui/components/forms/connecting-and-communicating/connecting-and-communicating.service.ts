import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})

export class ConnectingAndCommunicatingService {
  constructor(private _httpclient: HttpClient) {}

    GetConnectingAndCommunicatingFormById(selectedFormID: string): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('fromId', selectedFormID);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetConnectingAndCommunicatingFormById',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdateFormData(formdata: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(formdata).toString();
        return this._httpclient.post<any>(
            environment.BaseUriUser +
                'api/User/InsertUpdateConnectingAndCommunicatingForm',
            data,
            { headers: reqHeader, params: params }
        );
    }
}
