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
import { CareOralAndDentalService } from './care-oral-and-dental.service';
import { UserService } from 'src/app/ui/service/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-care-oral-and-dental',
    templateUrl: './care-oral-and-dental.component.html',
    styleUrls: ['./care-oral-and-dental.component.scss'],
})
export class CareOralAndDentalComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    CareOralAndDentalFormData: any = <any>{};

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
    oralCareAssessmentOptions: any[];
    teethDenturesConditionOptions: any[];
    gumConditionOptions: any[];
    tongueConditionOptions: any[];
    engravingOptions: any[];
    dentistRegistrationOptions: any[];
    dietForOralConditionOptions: any[];
    residentGoalsOptions: any[];

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private _FormService: CareOralAndDentalService,
        private datePipe: DatePipe
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Care Assessment - Oral and Dental Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;
        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareOralAndDentalFormData = <any>{};
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
            'oralCareAssessmentOptions',
            'teethDenturesConditionOptions',
            'gumConditionOptions',
            'tongueConditionOptions',
            'engravingOptions',
            'dentistRegistrationOptions',
            'dietForOralConditionOptions',
            'residentGoalsOptions',
        ];

        //Make requests in parallel
        forkJoin(
            dropDownNames.map((collectionName) =>
                this.GetDropDownMasterList(
                    FormTypes.careoralanddental,
                    collectionName
                )
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.oralCareAssessmentOptions = responses[0];
            this.teethDenturesConditionOptions = responses[1];
            this.gumConditionOptions = responses[2];
            this.tongueConditionOptions = responses[3];
            this.engravingOptions = responses[4];
            this.dentistRegistrationOptions = responses[5];
            this.dietForOralConditionOptions = responses[6];
            this.residentGoalsOptions = responses[7];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareOralAndDentalFormData = <any>{};
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
        this.CareOralAndDentalFormData.IsFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.CareOralAndDentalFormData.IsFormCompleted = true;
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
            .GetCareOralAndDentalFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.CareOralAndDentalFormData = tdata;
                        this.CareOralAndDentalFormData.NextReviewDate = new Date(this.CareOralAndDentalFormData.NextReviewDate);
                    } else {
                        this.CareOralAndDentalFormData = {};
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
            this.CareOralAndDentalFormData.UserId = this.userId;
            this.CareOralAndDentalFormData.ResidentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.CareOralAndDentalFormData.StartedBy = this.loginId;
            this.CareOralAndDentalFormData.ModifiedBy = this.loginId;

            this.CareOralAndDentalFormData.NextReviewDate = new Date(this.datePipe.transform(this.CareOralAndDentalFormData.NextReviewDate, 'yyyy-MM-dd'));

            const objectBody: any = {
                StatementType: this.StatementType,
                CareOralAndDentalForm: this.CareOralAndDentalFormData,
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
        this.CareOralAndDentalFormData = <any>{};
        this.StatementType = 'Insert';
    }
}
