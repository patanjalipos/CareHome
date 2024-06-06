import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CareContinencePromotionService {
    constructor(private _httpclient: HttpClient) {}

    // getDropdownMasterList(
    //     collectionName: string,
    //     status: any
    // ): Observable<any> {
    //     const reqHeader = new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': environment.BaseUriAdmin,
    //     });
    //     let params = new HttpParams();
    //     params = params.append('CollectionName', collectionName);
    //     params = params.append('Status', status);
    //     return this._httpclient.get<any>(
    //         environment.BaseUriAdmin + 'api/Admin/GetDropDownMasterList',
    //         { headers: reqHeader, params: params }
    //     );
    // }

    GetContinencePromotionFormById(
        selectedFormID : string
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
        });
        let params = new HttpParams();
        params = params.append('fromId', selectedFormID);
        return this._httpclient.get<any>(
            environment.BaseUriUser + 'api/User/GetContinencePromotionFormById',
            { headers: reqHeader, params: params }
        );
    }


    AddInsertUpdateFormData(formdata: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        var data = JSON.stringify(formdata).toString();
        console.log(data);
        debugger
        return this._httpclient.post<any>(
            environment.BaseUriUser +
                'api/User/InsertUpdateContinencePromotionForm',
            data,
            { headers: reqHeader, params: params }
        );
    }
}
