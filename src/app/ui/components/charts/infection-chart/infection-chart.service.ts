import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfectionChartService {

  constructor(private _httpclient: HttpClient) { }

  InsertUpdateInfectionChart(
    InfectionChartData: any
  ): Observable<any> {
      let reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': environment.BaseUriUser,
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      let params = new HttpParams();
      var data = JSON.stringify(InfectionChartData).toString();

      return this._httpclient.post<any>(
          environment.BaseUriUser +
              'api/User/InsertUpdateInfectionChart',
          data,
          { headers: reqHeader, params: params }
      );
  }

  GetInfectionChartDetails(selectedChartID: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('chartId', selectedChartID);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetInfectionChartDetails',
        { headers: reqHeader, params: params }
    );
}
}
