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
import { UtilityService } from 'src/app/utility/utility.service';
import { CarePersonalEmergencyEvacuationPlanService } from './care-personal-emergency-evacuation-plan.service';
import { UserService } from 'src/app/ui/service/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-care-personal-emergency-evacuation-plan',
    templateUrl: './care-personal-emergency-evacuation-plan.component.html',
    styleUrls: ['./care-personal-emergency-evacuation-plan.component.scss'],
})
export class CarePersonalEmergencyEvacuationPlanComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    PersonalEmergencyFormData: any = <any>{};

    //Form which is selected to edit or view
    isEditable: boolean;
    //Need to be passed from form Dashboard
    statementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;

    //CreatedBy or ModifiedBy
    loginId: any;

    //Dropdowns
    residentFloorOptions: any[];
    residentMobilityLevelOptions: any[];
    additionalRiskFactorsOptions: any[];
    cognitionOptions: any[];
    totalScoreOptions: any[];
    staffNeededOptions: any[];

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private datePipe: DatePipe,
        private _FormService: CarePersonalEmergencyEvacuationPlanService
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Care Assessment - Personal Emergency Evacuation Plan Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;
        if (this.preSelectedFormData.selectedFormID != null) {
            this.PersonalEmergencyFormData = <any>{};
            this.GetSelectedFormDetails(
                this.preSelectedFormData.selectedFormID
            );
            this.statementType = 'Update';
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
            'residentFloorOptions',
            'residentMobilityLevelOptions',
            'additionalRiskFactorsOptions',
            'cognitionOptions',
            'totalScoreOptions',
            'staffNeededOptions',
        ];

        //Make requests in parallel
        forkJoin(
            dropDownNames.map((collectionName) =>
                this.GetDropDownMasterList(
                    FormTypes.CareAssessmentPersonal,
                    collectionName
                )
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.residentFloorOptions = responses[0];
            this.residentMobilityLevelOptions = responses[1];
            this.additionalRiskFactorsOptions = responses[2];
            this.cognitionOptions = responses[3];
            this.totalScoreOptions = responses[4];
            this.staffNeededOptions = responses[5];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.PersonalEmergencyFormData = <any>{};
            this.GetSelectedFormDetails(
                this.preSelectedFormData.selectedFormID
            );

            this.statementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    SaveAsPDF() { }

    saveAsUnfinished() {
        this.PersonalEmergencyFormData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.PersonalEmergencyFormData.isFormCompleted = true;
        this.Save();
    }

    GetDropDownMasterList(
        formMasterId: string,
        dropDownName: string
    ): Observable<any> {
        this._UtilityService.showSpinner();
        return this._UserService
            .GetDropDownMasterList(formMasterId, dropDownName, 1)
            .pipe(
                map((response) => {
                    this._UtilityService.hideSpinner();
                    if (response.actionResult.success) {
                        return response.actionResult.result;
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

    GetSelectedFormDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._FormService
            .GetPersonalEmergencyFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : {};
                        this.PersonalEmergencyFormData = tdata;
                        this.PersonalEmergencyFormData.nextReviewDate = this.datePipe.transform(this.PersonalEmergencyFormData.nextReviewDate,'MM/dd/yyyy');
                    } else {
                        this.PersonalEmergencyFormData = {};
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
            this.PersonalEmergencyFormData.userId = this.userId;
            this.PersonalEmergencyFormData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.PersonalEmergencyFormData.startedBy = this.loginId;
            this.PersonalEmergencyFormData.modifiedBy = this.loginId;
            this.PersonalEmergencyFormData.nextReviewDate = this.datePipe.transform(this.PersonalEmergencyFormData.nextReviewDate,'yyyy-MM-dd');

            const objectBody: any = {
                statementType: this.statementType,
                personalEmergencyForm: this.PersonalEmergencyFormData,
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
        this.PersonalEmergencyFormData = <any>{};
        this.statementType = 'Insert';
    }
}
