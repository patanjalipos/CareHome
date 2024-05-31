import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private _httpclient: HttpClient) {}

    GetResidentDocumentsDetails(obj:any=<any>{}): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        let data=JSON.stringify(obj);
        return this._httpclient.post<any>(environment.BaseUriUser + "api/User/GetResidentDocumentsDetails",data, { "headers": reqHeader, "params": params });
      
    }
    GetResidentDocumentsDetailsById(ResidentDocumentsDetailsId: string): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('ResidentDocumentsDetailsId', ResidentDocumentsDetailsId);
        return this._httpclient.get<any>(environment.BaseUriUser + "api/User/GetResidentDocumentsDetailsById", { "headers": reqHeader, "params": params });
    }

    AddResidentDocumentsDetails(formData: FormData): Observable<any> {
        let reqHeader = new HttpHeaders({
           'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        var data = formData;
        return this._httpclient.post<any>(environment.BaseUriUser + "api/User/AddResidentDocumentsDetails", data, { "headers": reqHeader, "params": params });        
    } 

    EditResidentDocumentsDetails(formData: FormData): Observable<any> {
        let reqHeader = new HttpHeaders({
           'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        var data = formData;
        return this._httpclient.post<any>(environment.BaseUriUser + "api/User/EditResidentDocumentsDetails", data, { "headers": reqHeader, "params": params });
        
    } 

    //My Profile
    GerUserDetailsById(UserId: string): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('UserId', UserId);
        return this._httpclient.get<any>(environment.BaseUriUser + "api/User/GerUserDetailsById", { "headers": reqHeader, "params": params });
    }

    UpdateUserDetailsById(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.BaseUriUser,
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
   // params = params.append('UserId', localStorage.getItem('userId'));
    var data = JSON.stringify(obj).toString();  
    return this._httpclient.post<any>(environment.BaseUriUser + "api/User/UpdateUserDetailsById", data, { "headers": reqHeader, "params": params });
  }
  
  
    

}
