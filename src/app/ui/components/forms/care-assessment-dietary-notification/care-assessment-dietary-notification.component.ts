import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    ConstantsService,
    CustomDateFormat,
    FormTypes,
} from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { CareAssessmentDietaryNotificationService } from './care-assessment-dietary-notification.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Component({
    selector: 'app-care-assessment-dietary-notification',
    templateUrl: './care-assessment-dietary-notification.component.html',
    styleUrls: ['./care-assessment-dietary-notification.component.scss'],
})
export class CareAssessmentDietaryNotificationComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    DietaryNotificationFormsData: any = <any>{};

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
    specialDietaryOptions: any[];
    modifiedDietOptions: any[];
    thickenedFluidsOptions: any[];
    meetChefPreferenceOptions: any[];
    mealSizeOptions: any[];

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _MasterService: MasterService,
        private _FormService: CareAssessmentDietaryNotificationService
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Care Assessment - Dietary Notification Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        console.log(this.preSelectedFormData);

        if (this.preSelectedFormData.selectedFormID != null) {
            this.DietaryNotificationFormsData = <any>{};
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
            'specialDietaryOptions',
            'modifiedDietOptions',
            'thickenedFluidsOptions',
            'meetChefPreferenceOptions',
            'mealSizeOptions',
        ];

        //Make requests in parallel
        forkJoin(
            dropDownNames.map((collectionName) =>
                this.GetDropDownMasterList(
                    FormTypes.CareAssessmentDietaryNotification,
                    collectionName
                )
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.specialDietaryOptions = responses[0];
            this.modifiedDietOptions = responses[1];
            this.thickenedFluidsOptions = responses[2];
            this.meetChefPreferenceOptions = responses[3];
            this.mealSizeOptions = responses[4];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.DietaryNotificationFormsData = <any>{};
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
        this.DietaryNotificationFormsData.IsFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.DietaryNotificationFormsData.IsFormCompleted = true;
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
            .GetDietaryNotificationFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.DietaryNotificationFormsData = tdata;
                    } else {
                        this.DietaryNotificationFormsData = {};
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
            this.DietaryNotificationFormsData.UserId = this.userId;
            this.DietaryNotificationFormsData.ResidentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.DietaryNotificationFormsData.StartedBy = this.loginId;
            this.DietaryNotificationFormsData.ModifiedBy = this.loginId;

            const objectBody: any = {
                StatementType: this.StatementType,
                DietaryNotificationForm: this.DietaryNotificationFormsData,
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
        this.DietaryNotificationFormsData = <any>{};
        this.StatementType = 'Insert';
    }
}
