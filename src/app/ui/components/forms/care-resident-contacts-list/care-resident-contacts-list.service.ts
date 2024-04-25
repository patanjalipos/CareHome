import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root',
})

export class CareResidentContactsListService {

  constructor(private _httpclient: HttpClient) {}

    GetCareResidentContactsListFormById(selectedFormID: string): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('fromId', selectedFormID);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetCareResidentContactsListFormById',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdateFormData(formdata: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            //'Authorization': 'Bearer ' + localStorage.getItem('token')
        });   
        
        console.log(formdata);

        let params = new HttpParams();
        var data = JSON.stringify(formdata).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/InsertUpdateCareResidentContactsListForm',
            data,
            { headers: reqHeader, params: params }
        );
    }
}