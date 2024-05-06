import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareBreathingCirculationService {

  constructor(private _httpclient: HttpClient) {}
//   GetBreathDecisionMaster(
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
//             'api/Admin/GetBreathDecisionMaster',
//         { headers: reqHeader, params: params }
//     );
// }
// GetCareAssBreathDificultMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathDificultMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathSmokingHabitMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathSmokingHabitMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathSmokingActionPlan(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathSmokingActionPlan',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathCoughTypeMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathCoughTypeMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathTracheostomyMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathTracheostomyMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathMachineTypeUsed(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathMachineTypeUsed',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathInHealerTypeMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathInHealerTypeMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathCreticalTreatmentMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathCreticalTreatmentMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathGoalsWishesMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathGoalsWishesMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathStrategiesMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriAdmin,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriAdmin +
//           'api/Admin/GetCareAssBreathStrategiesMaster',
//       { headers: reqHeader, params: params }
//   );
// }
InsertUpdateCareAssBreathCirculationForm(
    AcuteCarePlanFormsData: any
): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(AcuteCarePlanFormsData).toString();
    console.log(data);
    return this._httpclient.post<any>(
        environment.BaseUriAdmin +
            'api/Admin/InsertUpdateCareAssBreathCirculationForm',
        data,
        { headers: reqHeader, params: params }
    );
}
GetCareBreathingCirculationFormById(fromId: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('fromId', fromId);
    return this._httpclient.get<any>(
        environment.BaseUriAdmin + 'api/Admin/GetCareBreathingCirculationFormById',
        { headers: reqHeader, params: params }
    );
}
}
