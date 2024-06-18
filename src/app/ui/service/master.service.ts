import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MasterService {
    constructor(private _httpclient: HttpClient) {}

    GetCountryMaster(): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetCountryMaster',
            { headers: reqHeader, params: params }
        );
    }

    // Common Email Drafting

    GetAllEmailDrafting(): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = '';
        return this._httpclient.get(
            environment.BaseUriAdmin + 'api/Admin/GetAllEmailDrafting',
            { headers: reqHeader, params: params }
        );
    }
    GetEmailTemplateByType(DId): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('DId', DId);
        return this._httpclient.get(
            environment.BaseUriAdmin + 'api/Admin/GetEmailTemplateByType',
            { headers: reqHeader, params: params }
        );
    }
    SaveUpdateEmailDrafting(commonEmailDraftingMaster: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(commonEmailDraftingMaster).toString();

        if (
            commonEmailDraftingMaster.DId != null &&
            commonEmailDraftingMaster.DId != ''
        ) {
            return this._httpclient.post<any>(
                environment.BaseUriAdmin + 'api/Admin/UpdateEmailDrafting',
                data,
                { headers: reqHeader, params: params }
            );
        } else {
            return this._httpclient.post<any>(
                environment.BaseUriAdmin + 'api/Admin/AddEmailDrafting',
                data,
                { headers: reqHeader, params: params }
            );
        }
    }

    //#region Form Master

    GetFormMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetFormMaster',
            { headers: reqHeader, params: params }
        );
    }

    GetFormMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetFormMasterById',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdateFormMaster(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateFormMaster',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#end region

    //#region MenuItem Master

    GetMenuItemMaster(moduleId: string, status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('moduleId', moduleId);
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetMenuItemMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetMenuItemMasterById(menuid): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('menuid', menuid);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetMenuItemMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddUpdateMenuItemMaster(MenuItemMaster: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(MenuItemMaster).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddUpdateMenuItemtMaster',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#end region

    //  #region HomeMaster

    GetHomeMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetHomeMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetHomeMasterById(id: string): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetHomeMasterById',
            { headers: reqHeader, params: params }
        );
    }
    GetHomeMasterEnabledBooking(): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetHomeMasterEnabledBooking',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateHomeMaster(HomeMaster: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(HomeMaster).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateHomeMaster',
            data,
            { headers: reqHeader, params: params }
        );
    }

    // #endregion

    //  #region LocationMaster

    GetLocationMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetLocationMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetLocationMasterByHomeId(homeMasterId: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('homeMasterId', homeMasterId);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetLocationMasterByHomeId',
            { headers: reqHeader, params: params }
        );
    }
    GetLocationMasterById(id: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetLocationMasterById',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdateLocationMaster(LocationMaster: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(LocationMaster).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/AddInsertUpdateLocationMaster',
            data,
            { headers: reqHeader, params: params }
        );
    }

    // #endregion

    //#region Alert Master

    GetAlertHeadMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetAlertHeadMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetAlertHeadMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetAlertHeadMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateAlertHead(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateAlertHead',
            data,
            { headers: reqHeader, params: params }
        );
    }

    GetAlertMaster(NewObj:any=<any>{},status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        let data=JSON.stringify(NewObj);
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/GetAlertMaster',data,
            { headers: reqHeader, params: params }
        );
    }
   
    GetAlertMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetAlertMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateAlert(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateAlert',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#end region

    //#region Chart Master

    GetChartHeadMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetChartHeadMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetChartHeadMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetChartHeadMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateChartHead(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateChartHead',
            data,
            { headers: reqHeader, params: params }
        );
    }

    GetChartMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetChartMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetChartMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetChartMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateChart(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateChart',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#end region

    //#region Indicator Master

    GetIndicatorGroupMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetIndicatorGroupMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetIndicatorGroupMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetIndicatorGroupMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateIndicatorGroup(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/AddInsertUpdateIndicatorGroup',
            data,
            { headers: reqHeader, params: params }
        );
    }

    GetIndicatorMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetIndicatorMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetIndicatorMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetIndicatorMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateIndicator(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateIndicator',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#end region

    //#region AttorneyType Master

    GetAttorneyTypeMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetAttorneyTypeMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetAttorneyTypeMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetAttorneyTypeMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateAttorneyType(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateAttorneyType',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#end region

    //#region FallRisk Master

    GetFallRiskMaster(status: any = true): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetFallRiskMaster',
            { headers: reqHeader, params: params }
        );
    }
    GetFallRiskMasterById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetFallRiskMasterById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateFallRisk(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateFallRisk',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#end region

    GetGroupResidentTagDetailsList(Status = 0): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append(
            'Status',
            Status == null || Status == undefined ? 0 : Status
        );
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetGroupResidentTagDetailsList',
            { headers: reqHeader, params: params }
        );
    }

    // #region UserTypeMaster

    GetUserTypeMaster(moduleId: string = ''): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('moduleId', moduleId);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetUserTypeMaster',
            { headers: reqHeader, params: params }
        );
    }

    //#endregion

    //#region  UserMaster

    GetUserMaster(homeMasterId,NewObj:any=<any>{}): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        let data=JSON.stringify(NewObj);
        params = params.append('homeMasterId', homeMasterId);
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/GetUserMaster',data,
            { headers: reqHeader, params: params }
        );
    }
      
    GetUserMasterById(userId): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('userId', userId);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetUserMasterById',
            { headers: reqHeader, params: params }
        );
    }
    GetUserMenuItemAccessByModuleId(
        userTypeId: string,
        UserId: string
    ): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('userTypeId', userTypeId);
        params = params.append('UserId', UserId);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetUserMenuItemAccessByModuleId',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdateUserMaster(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('loginId', localStorage.getItem('userId'));
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateUserMaster',
            data,
            { headers: reqHeader, params: params }
        );
    }

    GetMasterMenuItemForUserAccess(
        UserTypeId: string,
        UserId: string
    ): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('userTypeId', UserTypeId);
        params = params.append('UserId', UserId);
        var data = '';
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetUserMenuItemAccessByModuleId',
            { headers: reqHeader, params: params }
        );
    }
    LoadItemCatgMasterForAccess(): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = '';
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetUserItemCatgAccessMaster',
            { headers: reqHeader, params: params }
        );
    }

    //#endregion

    //#region  ResidentMaster

    GetResidentMaster(HomeMasterId = null, LocationMasterId=null,status = 1): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();

        if (HomeMasterId) params = params.append('HomeMasterId', HomeMasterId);
        if (LocationMasterId) params = params.append('LocationMasterId', LocationMasterId);        
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetResidentMaster',
            { headers: reqHeader, params: params }
        );
    }

    GetResidentMasterById(id: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetResidentMasterById',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdateResidentMaster(obj: FormData): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = obj; //JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/AddInsertUpdateResidentMaster',
            data,
            { headers: reqHeader, params: params }
        );
    }

    GetResidentOccupancyById(admissionid: string): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('admissionid', admissionid);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetResidentOccupancyById',
            { headers: reqHeader, params: params }
        );
    }

    AddUpdateResidentOccupancyData(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/AddUpdateResidentOccupancyData',
            data,
            { headers: reqHeader, params: params }
        );
    }

    GetResidentHealthCareById(admissionid: string): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('admissionid', admissionid);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetResidentHealthCareById',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdateResidentHealthCare(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/AddInsertUpdateResidentHealthCare',
            data,
            { headers: reqHeader, params: params }
        );
    }
    GetResidentPreferencesById(admissionid: string): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('admissionid', admissionid);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetResidentPreferencesById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateResidentPreferences(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/AddInsertUpdateResidentPreferences',
            data,
            { headers: reqHeader, params: params }
        );
    }
    GetResidentPriorAdmissionById(admissionid: string): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('admissionid', admissionid);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetResidentPriorAdmissionById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateResidentPriorAdmission(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/AddInsertUpdateResidentPriorAdmission',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#endregion

    //#region  Task Planner

    GetAllUserList(homeMasterId, name): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('homeMasterId', homeMasterId);
        params = params.append('name', name);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetAllUserList',
            { headers: reqHeader, params: params }
        );
    }

    GetTaskPlanner(NewObj:any=<any>{},status = 0, date = null): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let data=JSON.stringify(NewObj);
        let params = new HttpParams();
        params = params.append('status', status == undefined ? 0 : status);
        params = params.append('date', date == undefined ? null : date);        
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/GetTaskPlanner',data,
            { headers: reqHeader, params: params }
        );
    }
    GetTaskPlannerById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetTaskPlannerById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateTaskPlanner(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateTaskPlanner',
            data,
            { headers: reqHeader, params: params }
        );
    }

    GetActivity(status = false, date = null): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status == undefined ? false : status);
        params = params.append('date', date == undefined ? null : date);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetActivity',
            { headers: reqHeader, params: params }
        );
    }
    GetActivityById(id): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('id', id);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetActivityById',
            { headers: reqHeader, params: params }
        );
    }
    AddInsertUpdateActivity(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/AddInsertUpdateActivity',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#end region

    //#region  ExportToExcel

    downloadReport(obj: any): void {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        var data = JSON.stringify(obj).toString();
        this._httpclient
            .post(environment.BaseUriAdmin + 'api/downloadReport', data, {
                headers: reqHeader,
                params: params,
                responseType: 'blob' as 'json',
            })
            .subscribe((response: any) => {
                let dataType = response.type;
                let binaryData = [];
                binaryData.push(response);
                let downloadLink = document.createElement('a');
                downloadLink.href = window.URL.createObjectURL(
                    new Blob(binaryData, { type: dataType })
                );
                if (obj.filename)
                    downloadLink.setAttribute('download', obj.filename);
                document.body.appendChild(downloadLink);
                downloadLink.click();
            });
    }

    GetUserMenuItemAccessByModuleIdTreeTable(
        userTypeId: string,
        UserId: string
    ): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('userTypeId', userTypeId);
        params = params.append('UserId', UserId);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetUserMenuItemAccessByModuleIdTreeTable',
            { headers: reqHeader, params: params }
        );
    }

    GetMenuItemMasterByModuleId(
        userTypeId: string,
        UserId: string
    ): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        let newreqobj: any = <any>{};
        newreqobj.userTypeId = userTypeId;
        newreqobj.UserId = UserId;
        var data = JSON.stringify(newreqobj);
        return this._httpclient.post<any>(
            environment.BaseUriAdmin + 'api/Admin/GetMenuItemMasterByModuleId',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#region Alert

    GetVitalAlertsByStatus(status: boolean = null): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetVitalAlertsByStatus',
            { headers: reqHeader, params: params }
        );
    }

    //#endregion Alert

    //region progress Note
    AddInsertResidentProgressNote(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('loginId', localStorage.getItem('userId'));
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriUser + 'api/User/AddInsertResidentProgressNote',
            data,
            { headers: reqHeader, params: params }
        );
    }

    GetResidentProgressNoteById(admissionid,dFrom = null, dTo = null,userid,formType:any[]): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('admissionid', admissionid);
        params = params.append('dFrom', dFrom);
        params = params.append('dTo', dTo);
        params = params.append('userid', userid);
        if(formType.length>0)
            {
        formType.forEach(type => {
            params = params.append('lst', type.id);
        });
          }
        //   else
        //   {
        //     params = params.append('lst', '');
        //   }
        return this._httpclient.get<any>(
            environment.BaseUriUser + 'api/User/GetResidentProgressNoteById',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertResidentAdditionalProgressNote(obj: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        });
        let params = new HttpParams();
        params = params.append('loginId', localStorage.getItem('userId'));
        var data = JSON.stringify(obj).toString();
        return this._httpclient.post<any>(
            environment.BaseUriUser +
                'api/User/AddInsertResidentAdditionalProgressNote',
            data,
            { headers: reqHeader, params: params }
        );
    }
    
   
}
