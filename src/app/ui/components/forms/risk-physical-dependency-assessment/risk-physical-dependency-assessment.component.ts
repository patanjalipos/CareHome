import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ConstantsService,
    CustomDateFormat,
    FormTypes,
} from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { RiskPhysicalDependencyAssessmentService } from './risk-physical-dependency-assessment.service';

@Component({
    selector: 'app-risk-physical-dependency-assessment',
    templateUrl: './risk-physical-dependency-assessment.component.html',
    styleUrls: ['./risk-physical-dependency-assessment.component.scss'],
})
export class RiskPhysicalDependencyAssessmentComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    RiskPhysicalDependencyAssessmentFormData: any = <any>{};

    //Form which is selected to edit or view
    isEditable: boolean;
    //Need to be passed from form Dashboard
    StatementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;

    //CreatedBy or ModifiedBy
    loginId: any;

    //Dropdowns
    communicationOptions: any[];
    breathingOptions: any[];
    circulationOptions: any[];
    eatAssistanceOptions: any[];
    eliminationOptions: any[];
    mobilityOptions: any[];
    washingAndDressingOptions: any[];
    oralCareOptions: any[];
    skinViabilityOptions: any[];
    painDiscomfortOptions: any[];
    hearingOptions: any[];
    sightOptions: any[];
    sleepingRestOptions: any[];
    palliativeCareOptions: any[];
    behavioursOptions: any[];
    cognitionOptions: any[];
    indirectCareOptions: any[];
    activitiesEngagementOptions: any[];
    dependencyScoreLevelOptions: any[];

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _MasterService: MasterService,
        private _FormService: RiskPhysicalDependencyAssessmentService
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Risk Assessment - Physical Dependency Assessement';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;
        if (this.preSelectedFormData.selectedFormID != null) {
            this.RiskPhysicalDependencyAssessmentFormData = <any>{};
            this.GetSelectedFormDetails(
                this.preSelectedFormData.selectedFormID
            );
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    ngOnInit(): void {
        this.userId = this.preSelectedFormData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedFormData.residentAdmissionInfoId;
        this.isEditable = this.preSelectedFormData.isEditable;
        const dropDownNames = [
            'communicationOptions',
            'breathingOptions',
            'circulationOptions',
            'eatAssistanceOptions',
            'eliminationOptions',
            'mobilityOptions',
            'washingAndDressingOptions',
            'oralCareOptions',
            'skinViabilityOptions',
            'painDiscomfortOptions',
            'hearingOptions',
            'sightOptions',
            'sleepingRestOptions',
            'palliativeCareOptions',
            'behavioursOptions',
            'cognitionOptions',
            'indirectCareOptions',
            'activitiesEngagementOptions',
            'dependencyScoreLevelOptions',
        ];

        //Make requests in parallel
        forkJoin(
            dropDownNames.map((collectionName) =>
                this.GetDropDownMasterList(
                    FormTypes.RiskAssessmentPhysical,
                    collectionName
                )
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.communicationOptions = responses[0];
            this.breathingOptions = responses[1];
            this.circulationOptions = responses[2];
            this.eatAssistanceOptions = responses[3];
            this.eliminationOptions = responses[4];
            this.mobilityOptions = responses[5];
            this.washingAndDressingOptions = responses[6];
            this.oralCareOptions = responses[7];
            this.skinViabilityOptions = responses[8];
            this.painDiscomfortOptions = responses[9];
            this.hearingOptions = responses[10];
            this.sightOptions = responses[11];
            this.sleepingRestOptions = responses[12];
            this.palliativeCareOptions = responses[13];
            this.behavioursOptions = responses[14];
            this.cognitionOptions = responses[15];
            this.indirectCareOptions = responses[16];
            this.activitiesEngagementOptions = responses[17];
            this.dependencyScoreLevelOptions = responses[18];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.RiskPhysicalDependencyAssessmentFormData = <any>{};
            this.GetSelectedFormDetails(
                this.preSelectedFormData.selectedFormID
            );

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    SaveAsPDF() { }

    saveAsUnfinished() {
        this.RiskPhysicalDependencyAssessmentFormData.IsFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.RiskPhysicalDependencyAssessmentFormData.IsFormCompleted = true;
        this.Save();
    }

    GetDropDownMasterList(
        formMasterId: string,
        dropDownName: string
    ): Observable<any> {
        this._UtilityService.showSpinner();
        return this._MasterService
            .GetDropDownMasterList(formMasterId, dropDownName, 1)
            .pipe(
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

    GetSelectedFormDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._FormService
            .GetRiskPhysicalDependencyAssessmentFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.RiskPhysicalDependencyAssessmentFormData = tdata;
                    } else {
                        this.RiskPhysicalDependencyAssessmentFormData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.RiskPhysicalDependencyAssessmentFormData.UserId = this.userId;
            this.RiskPhysicalDependencyAssessmentFormData.ResidentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.RiskPhysicalDependencyAssessmentFormData.StartedBy =
                this.loginId;
            this.RiskPhysicalDependencyAssessmentFormData.ModifiedBy =
                this.loginId;

            const objectBody: any = {
                StatementType: this.StatementType,
                RiskPhysicalDependencyAssessmentForm:
                    this.RiskPhysicalDependencyAssessmentFormData,
            };

            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._FormService
                .AddInsertUpdateFormData(objectBody)
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
        } else {
            this._UtilityService.showWarningAlert(
                'Resident admission details are missing.'
            );
        }
    }

    ResetModel() {
        this.isEditable = true;
        this.RiskPhysicalDependencyAssessmentFormData = <any>{};
        this.StatementType = 'Insert';
    }
}
