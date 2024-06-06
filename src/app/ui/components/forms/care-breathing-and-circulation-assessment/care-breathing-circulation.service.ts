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
//         'Access-Control-Allow-Origin': environment.BaseUriUser,
//     });
//     let params = new HttpParams();
//     params=params.append('Status',Status);
//     return this._httpclient.get<any>(
//         environment.BaseUriUser +
//             'api/User/GetBreathDecisionMaster',
//         { headers: reqHeader, params: params }
//     );
// }
// GetCareAssBreathDificultMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathDificultMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathSmokingHabitMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathSmokingHabitMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathSmokingActionPlan(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathSmokingActionPlan',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathCoughTypeMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathCoughTypeMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathTracheostomyMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathTracheostomyMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathMachineTypeUsed(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathMachineTypeUsed',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathInHealerTypeMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathInHealerTypeMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathCreticalTreatmentMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathCreticalTreatmentMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathGoalsWishesMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathGoalsWishesMaster',
//       { headers: reqHeader, params: params }
//   );
// }
// GetCareAssBreathStrategiesMaster(
//   Status: any
// ): Observable<any> {
//   let reqHeader = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Access-Control-Allow-Origin': environment.BaseUriUser,
//   });
//   let params = new HttpParams();
//   params=params.append('Status',Status);
//   return this._httpclient.get<any>(
//       environment.BaseUriUser +
//           'api/User/GetCareAssBreathStrategiesMaster',
//       { headers: reqHeader, params: params }
//   );
// }
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
