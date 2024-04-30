import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BodyMappingRecordService {

  constructor(private _httpclient: HttpClient) {}
//   GetBodyMappingReasonMaster(
//     Status: any
// ): Observable<any> {
//     let reqHeader = new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//     });
//     let params = new HttpParams();
//     params=params.append('Status',Status);
//     return this._httpclient.get<any>(
//         environment.BaseUriAdmin +
//             'api/Admin/GetBodyMappingReasonMaster',
//         { headers: reqHeader, params: params }
//     );
// }
InsertUpdateBodyMappingForm(
    AcuteCarePlanFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        //'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(AcuteCarePlanFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriAdmin +
            'api/Admin/InsertUpdateBodyMappingForm',
        data,
        { headers: reqHeader, params: params }
    );
}
GetBodyMappingFormById(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        //'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriAdmin + 'api/Admin/GetBodyMappingFormById',
        { headers: reqHeader, params: params }
    );
}
}
