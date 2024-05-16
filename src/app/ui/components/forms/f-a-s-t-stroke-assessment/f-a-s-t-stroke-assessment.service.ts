import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class FASTStrokeAssessmentService {

  constructor(private _httpclient: HttpClient) {}

  GetFASTStrokeAssessmentFormById(selectedFormID: string): Observable<any> {
      const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': environment.BaseUriAdmin,
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      let params = new HttpParams();
      params = params.append('fromId', selectedFormID);
      return this._httpclient.get<any>(
          environment.BaseUriAdmin +
              'api/Admin/GetFASTStrokeAssessmentFormById',
          { headers: reqHeader, params: params }
      );
  }

  AddInsertUpdateFormData(formdata: any): Observable<any> {
      let reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': environment.BaseUriAdmin,
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      });
      let params = new HttpParams();
      var data = JSON.stringify(formdata).toString();
      return this._httpclient.post<any>(
          environment.BaseUriAdmin +
              'api/Admin/InsertUpdateFASTStrokeAssessmentForm',
          data,
          { headers: reqHeader, params: params }
      );
  }
}

