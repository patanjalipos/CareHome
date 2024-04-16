import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CareContinencePromotionService {
  
    constructor(private _httpclient: HttpClient) {}

    getDropdownMasterList(collectionName: string,status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('CollectionName', collectionName);
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetDropDownMasterList',
            { headers: reqHeader, params: params }
        );
    }
}
