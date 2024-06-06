import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareMentalHealthService } from './care-mental-health.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
    selector: 'app-care-mental-health',
    templateUrl: './care-mental-health.component.html',
    styleUrls: ['./care-mental-health.component.scss']
})
export class CareMentalHealthComponent extends AppComponentBase implements OnInit {

    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    CareAssessmentMentalHealthFormsData: any = <any>{};
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    StatementType: string = null;
    MentalHealthStatus: boolean
    SexualityStatus: boolean

    lstCognitionImpact: any[] = [];
    lstMentalHealthCondition: any[] = [];
    lstResidentUnderstand: any[] = [];
    lstResidentVerbalUnderstand: any[] = [];
    lstResidentUnderstandDetails: any[] = [];
    lstConfusion: any[] = [];
    lstActionInConfusion: any[] = []
    lstPersonalSafety: any[] = [];
    lstLeavingHome: any[] = [];
    lstRiskForSafety: any[] = [];
    lstSexuality: any[] = [];
    lstGoalsToAchieve: any[] = [];

    constructor(private _ConstantServices: ConstantsService, private route: ActivatedRoute, private _UtilityService: UtilityService, private _CareMentalHealth: CareMentalHealthService, private _UserServices: UserService, private datePipte: DatePipe) {

        super();

        this._ConstantServices.ActiveMenuName = "Care Assessment Mental Health Form";
        this.loginId = localStorage.getItem('userId');

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareAssessmentMentalHealthFormsData = <any>{};
            this.GetCareAssessmentMentalHealthDetails(
                this.preSelectedFormData.selectedFormID
            );
            this.StatementType = 'Update';
        }
        else {
            this.ResetModel();
        }
    }


    ngOnInit(): void {
        this.userId = this.preSelectedFormData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedFormData.residentAdmissionInfoId;
        this.isEditable = this.preSelectedFormData.isEditable;
        const collectionNames = [
            'Cognition',
            'MentalHealthCondition',
            'ResidentUnderstand',
            'ResidentVerbalUnderstand',
            'ResidentUnderstandDetails',
            'Confusion',
            'ActionInConfusion',
            'PersonalSafety',
            'LeavingHome',
            'RiskForSafety',
            'Sexuality',
            'GoalsToAchieve'
        ];

        forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.CareAssessmentMental, collectionName, 1))).subscribe((responses: any[]) => {
            this.lstCognitionImpact = responses[0];
            this.lstMentalHealthCondition = responses[1];
            this.lstResidentUnderstand = responses[2];
            this.lstResidentVerbalUnderstand = responses[3];
            this.lstResidentUnderstandDetails = responses[4];
            this.lstConfusion = responses[5];
            this.lstActionInConfusion = responses[6];
            this.lstPersonalSafety = responses[7];
            this.lstLeavingHome = responses[8];
            this.lstRiskForSafety = responses[9];
            this.lstSexuality = responses[10];
            this.lstGoalsToAchieve = responses[11];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareAssessmentMentalHealthFormsData = <any>{};
            this.GetCareAssessmentMentalHealthDetails(
                this.preSelectedFormData.selectedFormID
            );
            this.StatementType = 'Update';
        }
        else {
            this.ResetModel();
        }
    }

    SaveAsPDF() { }

    GetCareAssessmentMentalHealthDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._CareMentalHealth
            .GetCareAssessmentMentalHealthDetails(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        console.log(tdata)
                        this.CareAssessmentMentalHealthFormsData = tdata;
                        console.log(this.CareAssessmentMentalHealthFormsData.CareAssessmentHearingFormId)
                        this.CareAssessmentMentalHealthFormsData.ReviewDate = this.datePipte.transform(this.CareAssessmentMentalHealthFormsData.ReviewDate, 'MM/dd/yyyy')
                        if (this.CareAssessmentMentalHealthFormsData.MentalHealthOrCognitionStatus == 'Mental Health') {
                            this.MentalHealthStatus = true
                        }
                        if (this.CareAssessmentMentalHealthFormsData.MentalHealthOrCognitionStatus == 'Cognition') {
                            this.MentalHealthStatus = !true
                        }
                        if (this.CareAssessmentMentalHealthFormsData.SexualityOrCulturalStatus == 'Sexuality') {
                            this.SexualityStatus = true
                        }
                        if (this.CareAssessmentMentalHealthFormsData.SexualityOrCulturalStatus == 'Cultural') {
                            this.SexualityStatus = !true
                        }
                        // console.log(this.CareAssessmentHearingFormsData.HearingDiagnosisCheck);

                    } else {
                        this.CareAssessmentMentalHealthFormsData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getDropdownMasterLists(formMasterId: string, dropdownName: string, status: number): Observable<any> {
        this._UtilityService.showSpinner();
        return this._UserServices.GetDropDownMasterList(formMasterId, dropdownName, status).pipe(
            map((response) => {
                this._UtilityService.hideSpinner();
                if (response.actionResult.success) {
                    return JSON.parse(response.actionResult.result);
                } else {
                    return [];
                }
            }),
            catchError((error) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(error.message);
                alert(error.message);
                return of([]); // Returning empty array in case of error
            })
        );
    }



    saveAsUnfinished() {

        this.CareAssessmentMentalHealthFormsData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.CareAssessmentMentalHealthFormsData.isFormCompleted = true;
        this.Save();
    }

    Save() {
        debugger
        if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

            this.CareAssessmentMentalHealthFormsData.userId = this.userId;
            this.CareAssessmentMentalHealthFormsData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.CareAssessmentMentalHealthFormsData.StartedBy = this.loginId;
            this.CareAssessmentMentalHealthFormsData.LastEnteredBy = this.loginId;
            this.CareAssessmentMentalHealthFormsData.ReviewDate = this.datePipte.transform(this.CareAssessmentMentalHealthFormsData.ReviewDate, 'yyyy-MM-dd')

            if (this.MentalHealthStatus == true) {

                this.CareAssessmentMentalHealthFormsData.MentalHealthOrCognitionStatus = 'Mental Health';
            }
            if (this.MentalHealthStatus == false) {
                this.CareAssessmentMentalHealthFormsData.MentalHealthOrCognitionStatus = 'Cognition';
            }

            if (this.SexualityStatus == true) {
                this.CareAssessmentMentalHealthFormsData.SexualityOrCulturalStatus = 'Sexuality';
            }
            if (this.SexualityStatus != true) {
                this.CareAssessmentMentalHealthFormsData.SexualityOrCulturalStatus = 'Cultural';
            }


            const objectBody: any = {
                StatementType: this.StatementType,
                careAssessmentMentalHealthForm: this.CareAssessmentMentalHealthFormsData,
            };


            console.log(objectBody);

            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._CareMentalHealth
                .AddInsertUpdateCareAssessmentMentalHealthForm(
                    objectBody
                )
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            //   this.ResetModel();
                            this._UtilityService.showSuccessAlert(
                                data.actionResult.errMsg
                            );
                        }
                        else
                            this._UtilityService.showWarningAlert(
                                data.actionResult.errMsg
                            );
                    },
                    error: (e) => {
                        this._UtilityService.hideSpinner();
                        this._UtilityService.showErrorAlert(e.message);
                    },
                });
        } else {
            this._UtilityService.showWarningAlert(
                'Care Assessment Mental Health details are missing.'
            );
        }
    }


    ResetModel() {
        this.isEditable = true;
        this.CareAssessmentMentalHealthFormsData = <any>{};
        this.StatementType = 'Insert';
    }



}
