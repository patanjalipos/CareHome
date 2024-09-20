import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ConstantsService,
    CustomDateFormat,
    FormTypes,
} from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { PreAdmissionAssessmentFormsService } from './pre-admission-assessment-forms.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';
import { log } from 'console';

@Component({
    selector: 'app-pre-admission-assessment-forms',
    templateUrl: './pre-admission-assessment-forms.component.html',
    styleUrls: ['./pre-admission-assessment-forms.component.scss'],
})
export class PreAdmissionAssessmentFormsComponent
    extends AppComponentBase
    implements OnInit {
    customDateFormat = CustomDateFormat;

    //Dropdown Lists
    LstPreAdmPersonCapacityOptionsMaster: any[] = [];
    LstPreAdmProfessionalDocObtainedOptionsMaster: any[] = [];
    LstPreAdmResidentMovingOptionsMaster: any[] = [];
    LstPreAdmPaymentOptionsMaster: any[] = [];
    LstPreAdmPeronsCurrentAbilitiesOptionsMaster: any[] = [];
    LstPreAdmAdvancedCarePlanningOptionsMaster: any[] = [];
    LstPreAdmMedicalHistoryConditionOptionsMaster: any[] = [];
    LstPreAdmConnectingAndCommunicatingOptionsMaster: any[] = [];
    LstPreAdmPersonalSafetyOptionsMaster: any[] = [];
    LstPreAdmResidentExpAnyMHConditionsOptionsMaster: any[] = [];
    LstPreAdmSpeechSightHearingOptionsMaster: any[] = [];
    LstPreAdmFallsAndMobilityOptionsMaster: any[] = [];
    LstPreAdmPainStatusOptionMaster: any[] = [];
    LstPreAdmSkinAssessmentOptionsMaster: any[] = [];
    LstPreAdmEatingDrinkingAssessmentOptionsMaster: any[] = [];
    LstPreAdmPromotionOfContinenceOptionsMaster: any[] = [];
    LstPreAdmFeelingFreshAndCleanOptionsMaster: any[] = [];
    LstPreAdmSleepingAndRestingOptionsMaster: any[] = [];
    LstPreAdmExpressingSexualityOptionsMaster: any[] = [];
    LstPreAdmEpilepsySeizureManagementOptionsMaster: any[] = [];
    LstPreAdmInfectionStatusOptionsMaster: any[] = [];
    LstPreAdmMedicationOptionMaster: any[] = [];
    LstPreAdmFirstAidEpilepticSeizureOptionsMaster: any[] = [];
    LstPreAdmCCTVPolicyOptionsMaster: any[] = [];

    //Refresh the search list on the form dashboard

    PreAdmissionAssessmentFormsData: any = <any>{};
    isEditable: boolean; //Need to be passed from form Dashboard
    statementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;
    //CreatedBy or ModifiedBy
    loginId: any;
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _ConstantServices: ConstantsService,
        private _PreAdmissionAssessmentFormsServices: PreAdmissionAssessmentFormsService,
        private _UtilityService: UtilityService,
        private _UserServices: UserService
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Pre Assessment Admission Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnInit(): void {
        this.userId = this.preSelectedFormData.userId;
        this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

        const collectionNames = [
            'PersonCapacity',
            'ProfessionalDocObtained',
            'ResidentMovingFrom',
            'Payment',
            'PeronsCurrentAbilities',
            'AdvancedCarePlanning',
            'MedicalHistoryCondition',
            'ConnectingAndCommunicating',
            'PersonalSafety',
            'ResidentExpAnyMHConditions',
            'SpeechSightHearing',
            'FallsAndMobility',
            'PainStatus',
            'SkinAssessment',
            'EatingDrinkingAssessment',
            'PromotionOfContinence',
            'FeelingFreshAndClean',
            'SleepingAndResting',
            'ExpressingSexuality',
            'EpilepsySeizureManagement',
            'InfectionStatus',
            'Medication',
            'FirstAidEpilepticSeizure',
            'CCTVPolicy'
        ];

        forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.PreAdmission, collectionName, 1))).subscribe((responses: any[]) => {
            this.LstPreAdmPersonCapacityOptionsMaster = responses[0];
            this.LstPreAdmProfessionalDocObtainedOptionsMaster = responses[1];
            this.LstPreAdmResidentMovingOptionsMaster = responses[2];
            this.LstPreAdmPaymentOptionsMaster = responses[3];
            this.LstPreAdmPeronsCurrentAbilitiesOptionsMaster = responses[4];
            this.LstPreAdmAdvancedCarePlanningOptionsMaster = responses[5];
            this.LstPreAdmMedicalHistoryConditionOptionsMaster = responses[6];
            this.LstPreAdmConnectingAndCommunicatingOptionsMaster = responses[7];
            this.LstPreAdmPersonalSafetyOptionsMaster = responses[8];
            this.LstPreAdmResidentExpAnyMHConditionsOptionsMaster = responses[9];
            this.LstPreAdmSpeechSightHearingOptionsMaster = responses[10];
            this.LstPreAdmFallsAndMobilityOptionsMaster = responses[11];
            this.LstPreAdmPainStatusOptionMaster = responses[12];
            this.LstPreAdmSkinAssessmentOptionsMaster = responses[13];
            this.LstPreAdmEatingDrinkingAssessmentOptionsMaster = responses[14];
            this.LstPreAdmPromotionOfContinenceOptionsMaster = responses[15];
            this.LstPreAdmFeelingFreshAndCleanOptionsMaster = responses[16];
            this.LstPreAdmSleepingAndRestingOptionsMaster = responses[17];
            this.LstPreAdmExpressingSexualityOptionsMaster = responses[18];
            this.LstPreAdmEpilepsySeizureManagementOptionsMaster = responses[19];
            this.LstPreAdmInfectionStatusOptionsMaster = responses[20];
            this.LstPreAdmMedicationOptionMaster = responses[21];
            this.LstPreAdmFirstAidEpilepticSeizureOptionsMaster = responses[22];
            this.LstPreAdmCCTVPolicyOptionsMaster = responses[23];
        });

        if (this.preSelectedFormData.selectedFormID != null) {
            this.PreAdmissionAssessmentFormsData = <any>{};
            this.GetPreAdmissionFormDetails(
                this.preSelectedFormData.selectedFormID
            );

            this.statementType = 'Update';
        } else {
            this.ResetModel();
        }
        console.log("drop down value");
        console.log(this.LstPreAdmMedicationOptionMaster);
        
        
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.PreAdmissionAssessmentFormsData = <any>{};
            this.GetPreAdmissionFormDetails(
                this.preSelectedFormData.selectedFormID
            );


            this.statementType = 'Update';
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

                return of([]); // Returning empty array in case of error
            })
        );
    }

    SaveAsPDF() { }

    ResetModel() {
        this.isEditable = true;
        this.PreAdmissionAssessmentFormsData = <any>{};
        this.statementType = 'Insert';
    }

    saveAsUnfinished() {
        this.PreAdmissionAssessmentFormsData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.PreAdmissionAssessmentFormsData.isFormCompleted = true;
        this.Save();
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.PreAdmissionAssessmentFormsData.userId = this.userId;
            this.PreAdmissionAssessmentFormsData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.PreAdmissionAssessmentFormsData.startedBy = this.loginId;
            this.PreAdmissionAssessmentFormsData.lastEnteredBy = this.loginId;

            const objectBody: any = {
                statementType: this.statementType,
                preAdmissionForm: this.PreAdmissionAssessmentFormsData,
            };
            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
                .AddInsertUpdatePreAdmissionAssessmentForm(objectBody)
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            this._UtilityService.showSuccessAlert(
                                data.actionResult.errMsg
                            );
                        } else
                            this._UtilityService.showWarningAlert(
                                data.actionResult.errMsg
                            );
                    },
                    error: (e) => {
                        this._UtilityService.hideSpinner();
                        this._UtilityService.showErrorAlert(e.message);
                    },
                });
            //this.ResetModel();
        } else {
            this._UtilityService.showWarningAlert(
                'Resident admission details are missing.'
            );
        }
    }

    GetPreAdmissionFormDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .GetPreAdmissionFormDetails(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : {};
                        this.PreAdmissionAssessmentFormsData = tdata;
                    } else {
                        this.PreAdmissionAssessmentFormsData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

}
