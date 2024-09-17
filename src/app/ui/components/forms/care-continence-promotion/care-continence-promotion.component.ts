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
import { CareContinencePromotionService } from './care-continence-promotion.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-care-continence-promotion',
    templateUrl: './care-continence-promotion.component.html',
    styleUrls: ['./care-continence-promotion.component.scss'],
})
export class CareContinencePromotionComponent
    extends AppComponentBase
    implements OnInit {
    customDateFormat = CustomDateFormat;
    CareContinencePromotionFormsData: any = <any>{};

    LstContPromInsightIntoContinenceNeedsOptions: any[] = [];
    LstContPromResidentColostomyIleostomyOptions: any[] = [];
    LstContPromSupportRequiredForColostomyOptions: any[] = [];
    LstContPromCatheterCareOptions: any[] = [];
    LstContPromClinicalObservationsOptions: any[] = [];
    LstContPromIdentifiedRisksOptions: any[] = [];
    LstContPromRiskManagementOptions: any[] = [];
    LstContPromoteHealthyBladderAndBowelOptions: any[] = [];
    LstContPromLegDrainageBagChangeOptions: any[] = [];
    LstContPromNightDrainageBagRemovalOptions: any[] = [];
    LstContPromContinenceAidBestPracticeGuidanceOptions: any[] = [];

    //Form which is selected to edit or view
    isEditable: boolean;
    //Need to be passed from form Dashboard
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
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _UserServices: UserService,
        private datePipe: DatePipe,
        private _FormService: CareContinencePromotionService,
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Care Assessment - Continence Promotion Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareContinencePromotionFormsData = <any>{};
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
        const collectionNames = [
            'ContPromInsightIntoContinenceNeedsOptions',
            'ContPromResidentColostomyIleostomyOptions',
            'ContPromSupportRequiredForColostomyOptions',
            'ContPromCatheterCareOptions',
            'ContPromClinicalObservationsOptions',
            'ContPromIdentifiedRisksOptions',
            'ContPromRiskManagementOptions',
            'ContPromoteHealthyBladderAndBowelOptions',
            'ContPromLegDrainageBagChangeOptions',
            'ContPromNightDrainageBagRemovalOptions',
            'ContPromContinenceAidBestPracticeGuidanceOptions',
        ];

        //Make requests in parallel
        forkJoin(
            collectionNames.map((collectionName) =>
                this.getDropdownMasterLists(FormTypes.CareAssessmentContinence, collectionName, 1)
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.LstContPromInsightIntoContinenceNeedsOptions = responses[0];
            this.LstContPromResidentColostomyIleostomyOptions = responses[1];
            this.LstContPromSupportRequiredForColostomyOptions =
                responses[2];
            this.LstContPromCatheterCareOptions = responses[3];
            this.LstContPromClinicalObservationsOptions = responses[4];
            this.LstContPromIdentifiedRisksOptions = responses[5];
            this.LstContPromRiskManagementOptions = responses[6];
            this.LstContPromoteHealthyBladderAndBowelOptions = responses[7];
            this.LstContPromLegDrainageBagChangeOptions = responses[8];
            this.LstContPromNightDrainageBagRemovalOptions = responses[9];
            this.LstContPromContinenceAidBestPracticeGuidanceOptions = responses[10];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareContinencePromotionFormsData = <any>{};
            this.GetSelectedFormDetails(
                this.preSelectedFormData.selectedFormID
            );

            this.statementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    GetSelectedFormDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._FormService
            .GetContinencePromotionFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.CareContinencePromotionFormsData = tdata;
                        this.CareContinencePromotionFormsData.nextReviewDate = new Date(this.datePipe.transform(this.CareContinencePromotionFormsData.nextReviewDate, 'yyyy-MM-dd'));
                    } else {
                        this.CareContinencePromotionFormsData = {};
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

                return of([]); // Returning empty array in case of error
            })
        );
    }

    SaveAsPDF() { }

    saveAsUnfinished() {
        this.CareContinencePromotionFormsData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.CareContinencePromotionFormsData.isFormCompleted = true;
        this.Save();
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.CareContinencePromotionFormsData.userId = this.userId;
            this.CareContinencePromotionFormsData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.CareContinencePromotionFormsData.startedBy = this.loginId;
            this.CareContinencePromotionFormsData.modifiedBy = this.loginId;
            this.CareContinencePromotionFormsData.nextReviewDate = new Date(this.datePipe.transform(this.CareContinencePromotionFormsData.nextReviewDate));

            const objectBody: any = {
                statementType: this.statementType,
                careContinencePromotionForm:
                    this.CareContinencePromotionFormsData,
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
        this.CareContinencePromotionFormsData = <any>{};
        this.statementType = 'Insert';
    }
}
