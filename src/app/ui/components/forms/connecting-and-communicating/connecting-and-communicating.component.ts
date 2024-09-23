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
import { ConnectingAndCommunicatingService } from './connecting-and-communicating.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
    selector: 'app-connecting-and-communicating',
    templateUrl: './connecting-and-communicating.component.html',
    styleUrls: ['./connecting-and-communicating.component.scss'],
})
export class ConnectingAndCommunicatingComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    ConnectingAndCommunicatingFormData: any = <any>{};

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
    languageOptions: any[];
    communicationOptions: any[];
    communicationImpactOptions: any[];
    communicationAidsOptions: any[];
    hearingAidsCareOptions: any[];
    hearingAidCareTipsOptions: any[];
    sightImpairmentOptions: any[];

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private _FormService: ConnectingAndCommunicatingService
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Connecting And Communicating Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;
        if (this.preSelectedFormData.selectedFormID != null) {
            this.ConnectingAndCommunicatingFormData = <any>{};
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
            'languageOptions',
            'communicationOptions',
            'communicationImpactOptions',
            'communicationAidsOptions',
            'hearingAidsCareOptions',
            'hearingAidCareTipsOptions',
            'sightImpairmentOptions',
        ];

        //Make requests in parallel
        forkJoin(
            dropDownNames.map((collectionName) =>
                this.GetDropDownMasterList(
                    FormTypes.ConnectingandCommunicating,
                    collectionName
                )
            )
        ).subscribe((responses: any[]) => {
            // responses is an array containing the responses for each request
            this.languageOptions = responses[0];
            this.communicationOptions = responses[1];
            this.communicationImpactOptions = responses[2];
            this.communicationAidsOptions = responses[3];
            this.hearingAidsCareOptions = responses[4];
            this.hearingAidCareTipsOptions = responses[5];
            this.sightImpairmentOptions = responses[6];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.ConnectingAndCommunicatingFormData = <any>{};
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
        this.ConnectingAndCommunicatingFormData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.ConnectingAndCommunicatingFormData.isFormCompleted = true;
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
            .GetConnectingAndCommunicatingFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : {};
                        this.ConnectingAndCommunicatingFormData = tdata;
                    } else {
                        this.ConnectingAndCommunicatingFormData = {};
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
            this.ConnectingAndCommunicatingFormData.userId = this.userId;
            this.ConnectingAndCommunicatingFormData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.ConnectingAndCommunicatingFormData.startedBy = this.loginId;
            this.ConnectingAndCommunicatingFormData.modifiedBy = this.loginId;

            const objectBody: any = {
                statementType: this.statementType,
                connectingAndCommunicatingForm:
                    this.ConnectingAndCommunicatingFormData,
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
        this.ConnectingAndCommunicatingFormData = <any>{};
        this.statementType = 'Insert';
    }
}
