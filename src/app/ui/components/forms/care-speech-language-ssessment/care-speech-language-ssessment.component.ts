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
import { CareSpeechLanguageSsessmentService } from './care-speech-language-ssessment.service';
import { UserService } from 'src/app/ui/service/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-care-speech-language-ssessment',
    templateUrl: './care-speech-language-ssessment.component.html',
    styleUrls: ['./care-speech-language-ssessment.component.scss'],
})

export class CareSpeechLanguageSsessmentComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    CareSpeechLanguageFormData: any = <any>{};

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
    speechComprehensionImpairmentOptions: any[];
    nonVerbalCommunicationOptions: any[];
    speechImpairmentEffectOptions: any[];
    goalsSpeechLanguageOptions: any[];

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private _FormService: CareSpeechLanguageSsessmentService,
        private datePipe: DatePipe
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Care Assessment - Speech & Language Assessment Form';
        this.loginId = localStorage.getItem('userId');

    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;
        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareSpeechLanguageFormData = <any>{};
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
            'speechComprehensionImpairmentOptions',
            'nonVerbalCommunicationOptions',
            'speechImpairmentEffectOptions',
            'goalsSpeechLanguageOptions',
        ];

        //Make requests in parallel
        forkJoin(
            dropDownNames.map((collectionName) =>
                this.GetDropDownMasterList(
                    FormTypes.CareAssessmentSpeech,
                    collectionName
                )
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.speechComprehensionImpairmentOptions = responses[0];
            this.nonVerbalCommunicationOptions = responses[1];
            this.speechImpairmentEffectOptions = responses[2];
            this.goalsSpeechLanguageOptions = responses[3];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareSpeechLanguageFormData = <any>{};
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
        this.CareSpeechLanguageFormData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.CareSpeechLanguageFormData.isFormCompleted = true;
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
            .GetCareSpeechLanguageFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : {};
                        this.CareSpeechLanguageFormData = tdata;
                        this.CareSpeechLanguageFormData.nextReviewDate = new Date(this.datePipe.transform(this.CareSpeechLanguageFormData.nextReviewDate));
                    } else {
                        this.CareSpeechLanguageFormData = {};
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
            this.CareSpeechLanguageFormData.userId = this.userId;
            this.CareSpeechLanguageFormData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.CareSpeechLanguageFormData.startedBy = this.loginId;
            this.CareSpeechLanguageFormData.modifiedBy = this.loginId;
            this.CareSpeechLanguageFormData.nextReviewDate = new Date(this.datePipe.transform(this.CareSpeechLanguageFormData.nextReviewDate, 'yyyy-MM-dd'));

            const objectBody: any = {
                statementType: this.statementType,
                CareSpeechLanguageForm: this.CareSpeechLanguageFormData,
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
        this.CareSpeechLanguageFormData = <any>{};
        this.statementType = 'Insert';
    }
}
