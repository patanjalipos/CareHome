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
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmSleepingAndRestingOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmSkinAssessmentOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmSkinAssessmentOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmResidentMovingOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmResidentMovingOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmResidentExpAnyMHConditionsOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmResidentExpAnyMHConditionsOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPromotionOfContinenceOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmPromotionOfContinenceOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmProfessionalDocObtainedOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmProfessionalDocObtainedOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPainStatusOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmPainStatusOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPaymentOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmPaymentOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmInfectionStatusOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmInfectionStatusOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmMedicalHistoryConditionOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmMedicalHistoryConditionOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmMedicationOptionMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmMedicationOptionMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmSpeechSightHearingOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmSpeechSightHearingOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPersonCapacityOptionsMaster(Status: any): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', Status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmPersonCapacityOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmFirstAidEpilepticSeizureOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmFirstAidEpilepticSeizureOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmFeelingFreshAndCleanOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmFeelingFreshAndCleanOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmExpressingSexualityOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmExpressingSexualityOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmFallsAndMobilityOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmFallsAndMobilityOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmEpilepsySeizureManagementOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmEpilepsySeizureManagementOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmEatingDrinkingAssessmentOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmEatingDrinkingAssessmentOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmConnectingAndCommunicatingOptionsMaster(
        status: any
    ): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmConnectingAndCommunicatingOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPersonalSafetyOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmPersonalSafetyOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmPeronsCurrentAbilitiesOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin +
                'api/Admin/GetPreAdmPeronsCurrentAbilitiesOptionsMaster',
            { headers: reqHeader, params: params }
        );
    }

    getPreAdmAdvancedCarePlanningOptionsMaster(status: any): Observable<any> {
        const reqHeader = new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': environment.BaseUriAdmin,
        });
        let params = new HttpParams();
        params = params.append('Status', status);
        return this._httpclient.get<any>(
          environment.BaseUriAdmin + 'api/Admin/GetPreAdmAdvancedCarePlanningOptionsMaster',
          { headers: reqHeader, params: params }
        );
      }
      

    GetPreAdmissionFormDetails(fromId: any) {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            //'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        params = params.append('fromId', fromId);
        return this._httpclient.get<any>(
            environment.BaseUriAdmin + 'api/Admin/GetPreAdmissionForm',
            { headers: reqHeader, params: params }
        );
    }

    AddInsertUpdatePreAdmissionAssessmentForm(
        PreAdmissionAssessmentFormsData: any
    ): Observable<any> {
        let reqHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': environment.BaseUriAdmin,
            //'Authorization': 'Bearer ' + localStorage.getItem('token')
        });
        let params = new HttpParams();
        var data = JSON.stringify(PreAdmissionAssessmentFormsData).toString();
        console.log(data);
        return this._httpclient.post<any>(
            environment.BaseUriAdmin +
                'api/Admin/AddInsertUpdatePreAdmissionForm',
            data,
            { headers: reqHeader, params: params }
        );
    }

    //#endregion
}
