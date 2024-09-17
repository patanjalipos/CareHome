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
import { CareVitaminDSupplementationService } from './care-vitamin-d-supplementation.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
    selector: 'app-care-vitamin-d-supplementation',
    templateUrl: './care-vitamin-d-supplementation.component.html',
    styleUrls: ['./care-vitamin-d-supplementation.component.scss'],
})
export class CareVitaminDSupplementationComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    CareVitaminDSupplementationFormData: any = <any>{};

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
    supplementOptions: any[];
    residentConditionOptions: any[];
    medicationOptions: any[];
    capacityOptions: any[];
    preferenceOptions: any[];
    informedChoiceOptions: any[];
    decisionOptions: any[];
    residentOptions: any[];

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private _FormService: CareVitaminDSupplementationService
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Care Assessment - Vitamin D Supplementation Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;
        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareVitaminDSupplementationFormData = <any>{};
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
        this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

        const dropDownNames = [
            'supplementOptions',
            'residentConditionOptions',
            'medicationOptions',
            'capacityOptions',
            'preferenceOptions',
            'informedChoiceOptions',
            'decisionOptions',
            'residentOptions',
        ];

        //Make requests in parallel
        forkJoin(
            dropDownNames.map((collectionName) =>
                this.GetDropDownMasterList(
                    FormTypes.CareAssessmentforVitaminD,
                    collectionName
                )
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.supplementOptions = responses[0];
            this.residentConditionOptions = responses[1];
            this.medicationOptions = responses[2];
            this.capacityOptions = responses[3];
            this.preferenceOptions = responses[4];
            this.informedChoiceOptions = responses[5];
            this.decisionOptions = responses[6];
            this.residentOptions = responses[7];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareVitaminDSupplementationFormData = <any>{};
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
        this.CareVitaminDSupplementationFormData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.CareVitaminDSupplementationFormData.isFormCompleted = true;
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

    GetSelectedFormDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._FormService
            .GetCareVitaminDSupplementationFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.CareVitaminDSupplementationFormData = tdata;
                    } else {
                        this.CareVitaminDSupplementationFormData = {};
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
            this.CareVitaminDSupplementationFormData.userId = this.userId;
            this.CareVitaminDSupplementationFormData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.CareVitaminDSupplementationFormData.startedBy = this.loginId;
            this.CareVitaminDSupplementationFormData.modifiedBy = this.loginId;

            const objectBody: any = {
                statementType: this.statementType,
                careVitaminDSupplementationForm:
                    this.CareVitaminDSupplementationFormData,
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
        this.CareVitaminDSupplementationFormData = <any>{};
        this.statementType = 'Insert';
    }
}
