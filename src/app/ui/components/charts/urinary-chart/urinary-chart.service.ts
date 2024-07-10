import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UrinaryChartService {

  constructor(private _httpclient: HttpClient) { }

  InsertUpdateUrinaryChart(
    UrinaryChartData: any
  ): Observable<any> {
      let reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': environment.BaseUriUser,
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      let params = new HttpParams();
      var data = JSON.stringify(UrinaryChartData).toString();
      console.log(data);
      

      return this._httpclient.post<any>(
          environment.BaseUriUser +
              'api/User/InsertUpdateUrinaryChart',
          data,
          { headers: reqHeader, params: params }
      );
  }

  GetUrinaryChartDetails(selectedChartID: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('chartId', selectedChartID);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetUrinaryChartDetails',
        { headers: reqHeader, params: params }
    );
}
}
