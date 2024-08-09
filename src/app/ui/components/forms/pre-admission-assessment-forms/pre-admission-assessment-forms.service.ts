import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class PreAdmissionAssessmentFormsService {
    constructor(private _httpclient: HttpClient) {}

    getPreAdmSleepingAndRestingOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmSleepingAndRestingOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmSkinAssessmentOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmSkinAssessmentOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmResidentMovingOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmResidentMovingOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmResidentExpAnyMHConditionsOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmResidentExpAnyMHConditionsOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPromotionOfContinenceOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmPromotionOfContinenceOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmProfessionalDocObtainedOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmProfessionalDocObtainedOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPainStatusOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmPainStatusOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPaymentOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmPaymentOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmInfectionStatusOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmInfectionStatusOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmMedicalHistoryConditionOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmMedicalHistoryConditionOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmMedicationOptionMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmMedicationOptionMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmSpeechSightHearingOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmSpeechSightHearingOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPersonCapacityOptionsMaster(Status: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', Status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmPersonCapacityOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmFirstAidEpilepticSeizureOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmFirstAidEpilepticSeizureOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmFeelingFreshAndCleanOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmFeelingFreshAndCleanOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmExpressingSexualityOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmExpressingSexualityOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmFallsAndMobilityOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmFallsAndMobilityOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmEpilepsySeizureManagementOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmEpilepsySeizureManagementOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmEatingDrinkingAssessmentOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmEatingDrinkingAssessmentOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmConnectingAndCommunicatingOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmConnectingAndCommunicatingOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPersonalSafetyOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmPersonalSafetyOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPeronsCurrentAbilitiesOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriUser +
                'api/User/GetPreAdmPeronsCurrentAbilitiesOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmAdvancedCarePlanningOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': environment.BaseUriUser,
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
          environment.BaseUriUser + 'api/User/GetPreAdmAdvancedCarePlanningOptionsMaster',
          { headers: reqHeader, params: params }
        );
      }
      

    GetPreAdmissionFormDetails(fromId: any) {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('fromId', fromId);
        return this._httpclient.get<any>(
            environment.BaseUriUser + 'api/User/GetPreAdmissionForm',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdatePreAdmissionAssessmentForm(
        PreAdmissionAssessmentFormsData: any
    ): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriUser,
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        var data = JSON.stringify(PreAdmissionAssessmentFormsData).toString();
        return this._httpclient.post<any>(
            environment.BaseUriUser +
                'api/User/AddInsertUpdatePreAdmissionForm',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#endregion
}
