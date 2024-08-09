import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VitalSignsChartService {

  constructor(private _httpclient: HttpClient) { }

  InsertUpdateVitalSignsChart(
    VitalSignsChartData: any
  ): Observable<any> {
      let reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': environment.BaseUriUser,
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      let params = new HttpParams();
      var data = JSON.stringify(VitalSignsChartData).toString();
      console.log(data);
      

      return this._httpclient.post<any>(
          environment.BaseUriUser +
              'api/User/InsertUpdateVitalSignsChart',
          data,
          { headers: reqHeader, params: params }
      );
  }

  GetVitalSignsChartDetails(selectedChartID: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('chartId', selectedChartID);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetVitalSignsChartDetails',
        { headers: reqHeader, params: params }
    );
}
}
