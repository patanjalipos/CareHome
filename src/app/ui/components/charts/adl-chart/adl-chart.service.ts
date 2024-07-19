import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdlChartService {

  constructor(private _httpclient: HttpClient) { }

  InsertUpdateADLChart(
    ADLChartData: any
  ): Observable<any> {
      let reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': environment.BaseUriUser,
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      let params = new HttpParams();
      var data = JSON.stringify(ADLChartData).toString();
   
      

      return this._httpclient.post<any>(
          environment.BaseUriUser +
              'api/User/InsertUpdateADLChart',
          data,
          { headers: reqHeader, params: params }
      );
  }

  GetADLChartDetails(selectedChartID: any) {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('chartId', selectedChartID);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetADLChartDetails',
        { headers: reqHeader, params: params }
    );
}
}
