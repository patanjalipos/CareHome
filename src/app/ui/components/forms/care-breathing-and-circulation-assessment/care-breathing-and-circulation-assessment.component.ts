import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CareBreathingCirculationService } from './care-breathing-circulation.service';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/utility/utility.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
    selector: 'app-care-breathing-and-circulation-assessment',
    templateUrl: './care-breathing-and-circulation-assessment.component.html',
    styleUrls: ['./care-breathing-and-circulation-assessment.component.scss']
})
export class CareBreathingAndCirculationAssessmentComponent extends AppComponentBase implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    CareBreathAssFormsData: any = <any>{};
    //Form which is selected to edit or view

    isEditable: boolean; //Need to be passed from form Dashboard
    StatementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;
    //CreatedBy or ModifiedBy
    loginId: any;
    lstBreathDecisionMaster: any[] = [];
    lstCareAssBreathDificultMaster: any[] = [];
    lstCareAssBreathSmokingHabitMaster: any[] = [];
    lstCareAssBreathSmokingActionPlan: any[] = [];
    lstCareAssBreathCoughTypeMaster: any[] = [];
    lstCareAssBreathTracheostomyMaster: any[] = [];
    lstCareAssBreathMachineTypeUsed: any[] = [];
    lstCareAssBreathInHealerTypeMaster: any[] = [];
    lstCareAssBreathCreticalTreatmentMaster: any[] = [];
    lstCareAssBreathGoalsWishesMaster: any[] = [];
    lstCareAssBreathStrategiesMaster: any[] = [];

    constructor(
        private _care_breath: CareBreathingCirculationService,
        private datepipe: DatePipe,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _DataService: DataService,
        private _UserServices: UserService

    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Care Breathing and Curculation Assesment Form';

        this.loginId = localStorage.getItem('userId');
    }


    ngOnInit(): void {
        this.userId = this.preSelectedFormData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedFormData.residentAdmissionInfoId;
        this.isEditable = this.preSelectedFormData.isEditable;
        const collectionNames = [
            'CareBreathDecision',
            'BreathDifficulties',
            'SmokingHistory',
            'SmokeActionPlan',
            'CoughType',
            'Tracheostomy',
            'MachineType',
            'InhealerType',
            'CreticalTreatment',
            'GoalsWishesDetails',
            'StrategiesManage'
        ];

        forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.CareAssessmentBreathing, collectionName, 1))).subscribe((responses: any[]) => {
            this.lstBreathDecisionMaster = responses[0];
            this.lstCareAssBreathDificultMaster = responses[1];
            this.lstCareAssBreathSmokingHabitMaster = responses[2];
            this.lstCareAssBreathSmokingActionPlan = responses[3];
            this.lstCareAssBreathCoughTypeMaster = responses[4];
            this.lstCareAssBreathTracheostomyMaster = responses[5];
            this.lstCareAssBreathMachineTypeUsed = responses[6];
            this.lstCareAssBreathInHealerTypeMaster = responses[7];
            this.lstCareAssBreathCreticalTreatmentMaster = responses[8];
            this.lstCareAssBreathGoalsWishesMaster = responses[9];
            this.lstCareAssBreathStrategiesMaster = responses[10];
        });
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareBreathAssFormsData = <any>{};
            this.GetCareBreathCirculationByid(
                this.preSelectedFormData.selectedFormID
            );

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareBreathAssFormsData = <any>{};
            this.GetCareBreathCirculationByid(
                this.preSelectedFormData.selectedFormID
            );

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
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
    GetCareBreathCirculationByid(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._care_breath
            .GetCareBreathingCirculationFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.CareBreathAssFormsData = tdata;
                        this.CareBreathAssFormsData.NextReviewDate = new Date(this.CareBreathAssFormsData.NextReviewDate);
                        //console.log(this.PreAdmissionAssessmentFormsData);
                    } else {
                        this.CareBreathAssFormsData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }
    ResetModel() {
        this.isEditable = true;
        this.CareBreathAssFormsData = <any>{};
        this.StatementType = 'Insert';
    }
 
    saveAsUnfinished() {
        this.CareBreathAssFormsData.isFormCompleted = false;
        this.Save();
    }
    Save() {
        if (this.userId != null && this.residentAdmissionInfoId != null) {
            this.CareBreathAssFormsData.userId = this.userId;
            this.CareBreathAssFormsData.StartedBy = localStorage.getItem('userId');
            this.CareBreathAssFormsData.LastEnteredBy = localStorage.getItem('userId');
            this.CareBreathAssFormsData.residentAdmissionInfoId = this.residentAdmissionInfoId;
            this.CareBreathAssFormsData.NextReviewDate = new Date(this.datepipe.transform(this.CareBreathAssFormsData.NextReviewDate, 'yyyy-MM-dd'));
            const objectBody: any = {
                StatementType: this.StatementType,
                CareAssBrthCirc: this.CareBreathAssFormsData,
            };
            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._care_breath
                .InsertUpdateCareAssBreathCirculationForm(objectBody)
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            this.ResetModel();
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
                'Resident admission details are missing.'
            );
        }
    }
    completeForm() {
        this.CareBreathAssFormsData.isFormCompleted = true;
        this.Save();
    }

}
