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

    //#region chartdropdownvalues
    GetChartDropDownMasterList(
        chartMasterId: string,
        dropdownName: string,
        status: number
    ) {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('chartMasterId', chartMasterId);
        params = params.append('dropDownName', dropdownName);
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser + 'api/User/GetChartDropDownMasterList',
            { headers: reqHeader, params: params }
        );
    }
    //#endregion

    //#region Chart Dashboard

    GetChartDashboardList(
        residentAdmissionInfoId: string,
        chartMasterId: string,
        fromDate: any = null,
        toDate: any = null
    ): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append(
            'residentAdmissionInfoId',
            residentAdmissionInfoId
        );
        params = params.append('chartMasterId', chartMasterId);
        // Convert fromDate and toDate to strings before appending them
        if (fromDate !== null) {
            params = params.append('fromDate', fromDate.toString());
        }
        if (toDate !== null) {
            params = params.append('toDate', toDate.toString());
        }

        return this._httpclient.get<any>(
            environment.BaseUriUser + 'api/User/GetChartDashboardList',
            { headers: reqHeader, params: params }
        );
    }

    //#endregion

}
