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
import { FASTStrokeAssessmentService } from './f-a-s-t-stroke-assessment.service';

@Component({
    selector: 'app-f-a-s-t-stroke-assessment',
    templateUrl: './f-a-s-t-stroke-assessment.component.html',
    styleUrls: ['./f-a-s-t-stroke-assessment.component.scss'],
})
export class FASTStrokeAssessmentComponent
    extends AppComponentBase
    implements OnInit
{
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    FASTStrokeAssessmentFormData: any = <any>{};

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
    symptomOptions: any[];

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _MasterService: MasterService,
        private _FormService: FASTStrokeAssessmentService
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'FAST Storke Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;
        if (this.preSelectedFormData.selectedFormID != null) {
            this.FASTStrokeAssessmentFormData = <any>{};
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
        this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

        const dropDownNames = ['symptomOptions'];

        //Make requests in parallel
        forkJoin(
            dropDownNames.map((collectionName) =>
                this.GetDropDownMasterList(
                    FormTypes.FASTStrokeAssessment,
                    collectionName
                )
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.symptomOptions = responses[0];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.FASTStrokeAssessmentFormData = <any>{};
            this.GetSelectedFormDetails(
                this.preSelectedFormData.selectedFormID
            );

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    SaveAsPDF() {}

    saveAsUnfinished() {
        this.FASTStrokeAssessmentFormData.IsFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.FASTStrokeAssessmentFormData.IsFormCompleted = true;
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
            .GetFASTStrokeAssessmentFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.FASTStrokeAssessmentFormData = tdata;
                    } else {
                        this.FASTStrokeAssessmentFormData = {};
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
            this.FASTStrokeAssessmentFormData.UserId = this.userId;
            this.FASTStrokeAssessmentFormData.ResidentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.FASTStrokeAssessmentFormData.StartedBy = this.loginId;
            this.FASTStrokeAssessmentFormData.ModifiedBy = this.loginId;

            const objectBody: any = {
                StatementType: this.StatementType,
                FASTStrokeAssessmentForm: this.FASTStrokeAssessmentFormData,
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
        this.FASTStrokeAssessmentFormData = <any>{};
        this.StatementType = 'Insert';
    }
}
