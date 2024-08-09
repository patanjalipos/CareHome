import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private _httpclient: HttpClient) {}

  GetResidentDocumentsDetails(obj: any = <any>{}): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    let data = JSON.stringify(obj);
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/GetResidentDocumentsDetails",
      data,
      { headers: reqHeader, params: params }
    );
  }
  GetResidentDocumentsDetailsById(
    ResidentDocumentsDetailsId: string
  ): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append(
      "ResidentDocumentsDetailsId",
      ResidentDocumentsDetailsId
    );
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetResidentDocumentsDetailsById",
      { headers: reqHeader, params: params }
    );
  }

  AddResidentDocumentsDetails(formData: FormData): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = formData;
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddResidentDocumentsDetails",
      data,
      { headers: reqHeader, params: params }
    );
  }

  EditResidentDocumentsDetails(formData: FormData): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = formData;
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/EditResidentDocumentsDetails",
      data,
      { headers: reqHeader, params: params }
    );
  }

  //My Profile
  GerUserDetailsById(UserId: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("UserId", UserId);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GerUserDetailsById",
      { headers: reqHeader, params: params }
    );
  }

  UpdateUserDetailsById(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    // params = params.append('UserId', localStorage.getItem('userId'));
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/UpdateUserDetailsById",
      data,
      { headers: reqHeader, params: params }
    );
  }

  //#region chartdropdownvalues
  GetChartDropDownMasterList(
    chartMasterId: string,
    dropdownName: string,
    status: number
  ) {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("chartMasterId", chartMasterId);
    params = params.append("dropDownName", dropdownName);
    params = params.append("Status", status);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetChartDropDownMasterList",
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
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("residentAdmissionInfoId", residentAdmissionInfoId);
    params = params.append("chartMasterId", chartMasterId);
    // Convert fromDate and toDate to strings before appending them
    if (fromDate !== null) {
      params = params.append("fromDate", fromDate.toString());
    }
    if (toDate !== null) {
      params = params.append("toDate", toDate.toString());
    }

    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetChartDashboardList",
      { headers: reqHeader, params: params }
    );
  }


  GetChartDataById(selectedChartID, chartId, selectedStartedOn, residentAdmissionInfoId,pageNumber,pageSize){
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    params = params.append('chartMasterId', selectedChartID);
    params = params.append('chartId', chartId);
    params = params.append('selectedStartedOn', selectedStartedOn);
    params = params.append('residentAdmissionInfoId', residentAdmissionInfoId);
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    return this._httpclient.get<any>(
        environment.BaseUriUser + 'api/User/GetChartDetails',
        { headers: reqHeader, params: params }
    );
  }

  //#endregion

  //#region ChartStrikeThrough

  ChartStrikeThrough(ChartData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.BaseUriUser,
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    let params = new HttpParams();
    var data = JSON.stringify(ChartData).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser +
      'api/User/ChartStrikeThrough',
      data,
      { headers: reqHeader, params: params }
    );
  }

  //#endregion

  //#region  Resident Profile

  GetResidentDetailsById(userid: any, admissionid: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("userid", userid);
    if (admissionid != null && admissionid != undefined)
      params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetResidentDetailsById",
      { headers: reqHeader, params: params }
    );
  }

  UpdateResidentAdmissionProfile(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/UpdateResidentAdmissionProfile",
      data,
      { headers: reqHeader, params: params }
    );
  }
  //#endregion

  //#region  Clinical

  GetClinicalAllergiesById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalAllergiesById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateClinicalAllergies(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateClinicalAllergies",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetClinicalIndicatorById(
    admissionid: any,
    status: any = false
  ): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    params = params.append("status", status);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalIndicatorById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateClinicalIndicator(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateClinicalIndicator",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetClinicalInformationById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalInformationById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateClinicalInformation(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateClinicalInformation",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetClinicalBaselineHealthInfoById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalBaselineHealthInfoById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateClinicalBaselineHealthInfo(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser +
        "api/User/AddInsertUpdateClinicalBaselineHealthInfo",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetClinicalAlertPreferencesById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalAlertPreferencesById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateAlertPreferences(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateAlertPreferences",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetClinicalChartPreferencesById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalChartPreferencesById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateChartPreferences(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateChartPreferences",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetClinicalDailyVitalById(
    admissionid: any,
    date: any = null
  ): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    params = params.append("date", date);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalDailyVitalById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateDailyVital(obj: any, loginId: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    params = params.append("loginid", loginId);
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateDailyVital",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetDailyVitalAlertLog(userid, firstdate, enddate, name, status) {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("userid", userid);
    params = params.append("firstdate", firstdate);
    params = params.append("enddate", enddate);
    params = params.append("name", name);
    params = params.append("status", status);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetDailyVitalAlertLog",
      { headers: reqHeader, params: params }
    );
  }

  GetClinicalPainAssesmentById(
    admissionid: any,
    date: any = null
  ): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    params = params.append("date", date);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalPainAssesmentById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdatePainAssesment(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdatePainAssesment",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetClinicalFallRiskAssessmentById(admissionid: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetClinicalFallRiskAssessmentById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateFallRiskAssessment(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateFallRiskAssessment",
      data,
      { headers: reqHeader, params: params }
    );
  }

  //#endregion

  //#region  Contacts

  GetContactPrimaryById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetContactPrimaryById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateContactPrimary(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateContactPrimary",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetContactSecondaryById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetContactSecondaryById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateContactSecondary(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateContactSecondary",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetContactResponsiblePersonById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetContactResponsiblePersonById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateContactResponsiblePerson(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser +
        "api/User/AddInsertUpdateContactResponsiblePerson",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetContactFirstAttorneyById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetContactFirstAttorneyById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateContactFirstAttorney(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateContactFirstAttorney",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetContactSecondAttorneyById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetContactSecondAttorneyById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateContactSecondAttorney(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateContactSecondAttorney",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetContactDoctorById(admissionid: string): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("admissionid", admissionid);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetContactDoctorById",
      { headers: reqHeader, params: params }
    );
  }
  AddInsertUpdateContactDoctor(obj: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(obj).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddInsertUpdateContactDoctor",
      data,
      { headers: reqHeader, params: params }
    );
  }

  //#endregion

  //#region Form Dashboard

  GetFormDasboardList(
    residentAdmissionInfoId: string,
    formMasterId: string,
    fromDate: any = null,
    toDate: any = null
  ): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("residentAdmissionInfoId", residentAdmissionInfoId);
    params = params.append("formMasterId", formMasterId);
    // Convert fromDate and toDate to strings before appending them
    if (fromDate !== null) {
      params = params.append("fromDate", fromDate.toString());
    }
    if (toDate !== null) {
      params = params.append("toDate", toDate.toString());
    }

    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetFormDashboardList",
      { headers: reqHeader, params: params }
    );
  }

  //#endregion

  //#region Form DropDowns

  GetDropDownMasterList(
    formMasterId: string,
    dropdownName: string,
    status: number
  ) {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("formMasterId", formMasterId);
    params = params.append("dropDownName", dropdownName);
    params = params.append("Status", status);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetDropDownMasterListV2",
      { headers: reqHeader, params: params }
    );
  }

  //#endregion

  //#region AccidentNearMissRecordForm

  GetAccidentNearMissRecordDetails(fromId: any) {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("fromId", fromId);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetAccidentNearOrMissRecordForm",
      { headers: reqHeader, params: params }
    );
  }

  AddInsertUpdateAccidentNearMissRecordForm(
    AccidentNearMissRecordFormsData: any
  ): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(AccidentNearMissRecordFormsData).toString();

    return this._httpclient.post<any>(
      environment.BaseUriUser +
        "api/User/AddInsertUpdateAccidentNearOrMissRecordForm",
      data,
      { headers: reqHeader, params: params }
    );
  }

  //#endregion

  //#region Acute Care Plan

  InsertUpdateAcuteCarePlanForm(AcuteCarePlanFormsData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(AcuteCarePlanFormsData).toString();

    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/InsertUpdateAcuteCarePlanForm",
      data,
      { headers: reqHeader, params: params }
    );
  }

  GetAcuteCarePlanFormByid(fromId: any) {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("fromId", fromId);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetAcuteCarePlanForm",
      { headers: reqHeader, params: params }
    );
  }

  //#end Region

  //#region Family Communication

  InsertUpdateFamilyCommForm(AcuteCarePlanFormsData: any): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(AcuteCarePlanFormsData).toString();

    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/InsertUpdateFamilyCommForm",
      data,
      { headers: reqHeader, params: params }
    );
  }
  GetFamilyCommFormById(fromId: any) {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("fromId", fromId);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GetFamilyCommFormById",
      { headers: reqHeader, params: params }
    );
  }

  //#endregion

  // #region GP Doctor Visit

  AddUpdateGPDoctorVisitCommDetails(
    GPDoctorVisitCommDetails: any
  ): Observable<any> {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    var data = JSON.stringify(GPDoctorVisitCommDetails).toString();
    return this._httpclient.post<any>(
      environment.BaseUriUser + "api/User/AddUpdateGPDoctorVisitCommDetails",
      data,
      { headers: reqHeader, params: params }
    );
  }
  GPDoctorVisitCommDetailsByid(fromId: any) {
    let reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": environment.BaseUriUser,
      Authorization: "Bearer " + localStorage.getItem("token"),
    });
    let params = new HttpParams();
    params = params.append("fromId", fromId);
    return this._httpclient.get<any>(
      environment.BaseUriUser + "api/User/GPDoctorVisitCommDetailsByid",
      { headers: reqHeader, params: params }
    );
  }
  //#endregion
}
