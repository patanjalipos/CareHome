import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _httpclient: HttpClient) { }

  GetFallRiskAssessmentReport(homemasterid: any): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        //'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('homemasterid', homemasterid);   
    return this._httpclient.get<any>(environment.BaseUriAdmin + "api/Report/GetFallRiskAssessmentReport", { "headers": reqHeader, "params": params });
}
}