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
} from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { PreAdmissionAssessmentFormsService } from './pre-admission-assessment-forms.service';

@Component({
    selector: 'app-pre-admission-assessment-forms',
    templateUrl: './pre-admission-assessment-forms.component.html',
    styleUrls: ['./pre-admission-assessment-forms.component.scss'],
})
export class PreAdmissionAssessmentFormsComponent
    extends AppComponentBase
    implements OnInit
{
    customDateFormat = CustomDateFormat;

    //Dropdown Lists
    LstPreAdmPersonCapacityOptionsMaster: any[] = [];
    LstPreAdmFirstAidEpilepticSeizureOptionsMaster: any[] = [];
    LstPreAdmFeelingFreshAndCleanOptionsMaster: any[] = [];
    LstPreAdmExpressingSexualityOptionsMaster: any[] = [];
    LstPreAdmFallsAndMobilityOptionsMaster: any[] = [];
    LstPreAdmEpilepsySeizureManagementOptionsMaster: any[] = [];
    LstPreAdmEatingDrinkingAssessmentOptionsMaster: any[] = [];
    LstPreAdmConnectingAndCommunicatingOptionsMaster: any[] = [];
    LstPreAdmInfectionStatusOptionsMaster: any[] = [];
    LstPreAdmMedicalHistoryConditionOptionsMaster: any[] = [];
    LstPreAdmMedicationOptionMaster: any[] = [];
    LstPreAdmSpeechSightHearingOptionsMaster: any[] = [];
    LstPreAdmSleepingAndRestingOptionsMaster: any[] = [];
    LstPreAdmSkinAssessmentOptionsMaster: any[] = [];
    LstPreAdmResidentMovingOptionsMaster: any[] = [];
    LstPreAdmResidentExpAnyMHConditionsOptionsMaster: any[] = [];
    LstPreAdmPromotionOfContinenceOptionsMaster: any[] = [];
    LstPreAdmProfessionalDocObtainedOptionsMaster: any[] = [];
    LstPreAdmPainStatusOptionMaster: any[] = [];
    LstPreAdmPaymentOptionsMaster: any[] = [];
    LstPreAdmPeronsCurrentAbilitiesOptionsMaster: any[] = [];
    LstPreAdmPersonalSafetyOptionsMaster: any[] = [];
    LstPreAdmAdvancedCarePlanningOptionsMaster: any[] = [];

    //Refresh the search list on the form dashboard

    PreAdmissionAssessmentFormsData: any = <any>{};
    isEditable: boolean; //Need to be passed from form Dashboard
    StatementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;
    //CreatedBy or ModifiedBy
    loginId: any;
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _PreAdmissionAssessmentFormsServices: PreAdmissionAssessmentFormsService,
        private _UtilityService: UtilityService,
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Pre Assessment Admission Form';
        this.loginId = localStorage.getItem('userId');

        this.unsubscribe.add = this.route.queryParams.subscribe((params) => {
            var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);

            if (ParamsArray?.length > 0) {
                this.userId =
                    ParamsArray.find((e) => e.FieldStr == 'id')?.FieldVal ||
                    null;
                this.residentAdmissionInfoId =
                    ParamsArray.find((e) => e.FieldStr == 'admissionid')
                        ?.FieldVal || null;
            }
        });
    }

    ngOnInit(): void {
        this.getPreAdmPersonCapacityOptionsMaster();
        this.getPreAdmFirstAidEpilepticSeizureOptionsMaster();
        this.getPreAdmFeelingFreshAndCleanOptionsMaster();
        this.getPreAdmExpressingSexualityOptionsMaster();
        this.getPreAdmFallsAndMobilityOptionsMaster();
        this.getPreAdmEpilepsySeizureManagementOptionsMaster();
        this.getPreAdmEatingDrinkingAssessmentOptionsMaster();
        this.getPreAdmConnectingAndCommunicatingOptionsMaster();
        this.getPreAdmInfectionStatusOptionsMaster();
        this.getPreAdmMedicalHistoryConditionOptionsMaster();
        this.getPreAdmMedicationOptionMaster();
        this.getPreAdmSpeechSightHearingOptionsMaster();
        this.getPreAdmSleepingAndRestingOptionsMaster();
        this.getPreAdmSkinAssessmentOptionsMaster();
        this.getPreAdmResidentMovingOptionsMaster();
        this.getPreAdmResidentExpAnyMHConditionsOptionsMaster();
        this.getPreAdmPromotionOfContinenceOptionsMaster();
        this.getPreAdmProfessionalDocObtainedOptionsMaster();
        this.getPreAdmPainStatusOptionsMaster();
        this.getPreAdmPaymentOptionsMaster();
        this.getPreAdmPeronsCurrentAbilitiesOptionsMaster();
        this.getPreAdmPersonalSafetyOptionsMaster();
        this.getPreAdmAdvancedCarePlanningOptionsMaster();

        if (this.preSelectedFormData.selectedFormID != null) {
            this.PreAdmissionAssessmentFormsData = <any>{};
            this.GetPreAdmissionFormDetails(
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
            this.PreAdmissionAssessmentFormsData = <any>{};
            this.GetPreAdmissionFormDetails(
                this.preSelectedFormData.selectedFormID
            );
            
            
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    SaveAsPDF() {}
    
    ResetModel() {
        this.isEditable = true;
        this.PreAdmissionAssessmentFormsData = <any>{};
        this.StatementType = 'Insert';
    }

    saveAsUnfinished() {
        this.PreAdmissionAssessmentFormsData.IsFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.PreAdmissionAssessmentFormsData.IsFormCompleted = true;
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
            this.PreAdmissionAssessmentFormsData.StartedBy = this.loginId;
            this.PreAdmissionAssessmentFormsData.LastEnteredBy = this.loginId;

            const objectBody: any = {
                StatementType: this.StatementType,
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
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        console.log(tdata)
                        this.PreAdmissionAssessmentFormsData = tdata;
                        // console.log(this.PreAdmissionAssessmentFormsData)
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

    getPreAdmPersonCapacityOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmPersonCapacityOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmPersonCapacityOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmPersonCapacityOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmFirstAidEpilepticSeizureOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmFirstAidEpilepticSeizureOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmFirstAidEpilepticSeizureOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmFirstAidEpilepticSeizureOptionsMaster =
                            [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmFeelingFreshAndCleanOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmFeelingFreshAndCleanOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmFeelingFreshAndCleanOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmFeelingFreshAndCleanOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmExpressingSexualityOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmExpressingSexualityOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmExpressingSexualityOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmExpressingSexualityOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmFallsAndMobilityOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmFallsAndMobilityOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmFallsAndMobilityOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmFallsAndMobilityOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmEpilepsySeizureManagementOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmEpilepsySeizureManagementOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmEpilepsySeizureManagementOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmEpilepsySeizureManagementOptionsMaster =
                            [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmEatingDrinkingAssessmentOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmEatingDrinkingAssessmentOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmEatingDrinkingAssessmentOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmEatingDrinkingAssessmentOptionsMaster =
                            [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmConnectingAndCommunicatingOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmConnectingAndCommunicatingOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmConnectingAndCommunicatingOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmConnectingAndCommunicatingOptionsMaster =
                            [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmInfectionStatusOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmInfectionStatusOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmInfectionStatusOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmInfectionStatusOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmMedicalHistoryConditionOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmMedicalHistoryConditionOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmMedicalHistoryConditionOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmMedicalHistoryConditionOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmMedicationOptionMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmMedicationOptionMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmMedicationOptionMaster = tdata;
                    } else {
                        this.LstPreAdmMedicationOptionMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmSpeechSightHearingOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmSpeechSightHearingOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmSpeechSightHearingOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmSpeechSightHearingOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmSleepingAndRestingOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmSleepingAndRestingOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmSleepingAndRestingOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmSleepingAndRestingOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmSkinAssessmentOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmSkinAssessmentOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmSkinAssessmentOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmSkinAssessmentOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmResidentMovingOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmResidentMovingOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmResidentMovingOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmResidentMovingOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmResidentExpAnyMHConditionsOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmResidentExpAnyMHConditionsOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmResidentExpAnyMHConditionsOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmResidentExpAnyMHConditionsOptionsMaster =
                            [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmPromotionOfContinenceOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmPromotionOfContinenceOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmPromotionOfContinenceOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmPromotionOfContinenceOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmProfessionalDocObtainedOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmProfessionalDocObtainedOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmProfessionalDocObtainedOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmProfessionalDocObtainedOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmPainStatusOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmPainStatusOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmPainStatusOptionMaster = tdata;
                    } else {
                        this.LstPreAdmPainStatusOptionMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmPaymentOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmPaymentOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmPaymentOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmPaymentOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmPeronsCurrentAbilitiesOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmPeronsCurrentAbilitiesOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmPeronsCurrentAbilitiesOptionsMaster =
                            tdata;
                    } else {
                        this.LstPreAdmPeronsCurrentAbilitiesOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmPersonalSafetyOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmPersonalSafetyOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmPersonalSafetyOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmPersonalSafetyOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    getPreAdmAdvancedCarePlanningOptionsMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PreAdmissionAssessmentFormsServices
            .getPreAdmAdvancedCarePlanningOptionsMaster(1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.LstPreAdmAdvancedCarePlanningOptionsMaster = tdata;
                    } else {
                        this.LstPreAdmAdvancedCarePlanningOptionsMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }
}
