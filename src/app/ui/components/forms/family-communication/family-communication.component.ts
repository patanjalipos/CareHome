import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
    selector: 'app-family-communication',
    templateUrl: './family-communication.component.html',
    styleUrls: ['./family-communication.component.scss']
})
export class FamilyCommunicationComponent extends AppComponentBase implements OnInit {

    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    FamilyCommFormsData: any = <any>{};
    //Form which is selected to edit or view

    isEditable: boolean; //Need to be passed from form Dashboard
    StatementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;
    //CreatedBy or ModifiedBy
    loginId: any;
    lstFamilyComRelayMaster: any[] = [];
    lstFamilyComReasonMaster: any[] = [];

    constructor(
        private datepipe: DatePipe,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UserServices: UserService,
        private _UtilityService: UtilityService,
        private _DataService: DataService) {
        super();
        this._ConstantServices.ActiveMenuName = 'Family Communication Form';

        this.loginId = localStorage.getItem('userId');
    }

    ngOnInit(): void {
        this.userId = this.preSelectedFormData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedFormData.residentAdmissionInfoId;
        this.isEditable = this.preSelectedFormData.isEditable;
        const collectionNames = [
            'CommRelay',
            'CommReason'
        ];

        forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.FamilyCommunication, collectionName, 1))).subscribe((responses: any[]) => {
            this.lstFamilyComRelayMaster = responses[0];
            this.lstFamilyComReasonMaster = responses[1];

        });
        // this.GetFamilyRelayMaster();
        // this.GetFamilyCommReasonMaster();

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.FamilyCommFormsData = <any>{};
            this.GetFamilyCommFormByid(
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
            this.FamilyCommFormsData = <any>{};
            this.GetFamilyCommFormByid(
                this.preSelectedFormData.selectedFormID
            );

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
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
                alert(error.message);
                return of([]); // Returning empty array in case of error
            })
        );
    }
    ResetModel() {
        this.isEditable = true;
        this.FamilyCommFormsData = <any>{};
        this.StatementType = 'Insert';
    }
   
    GetFamilyCommFormByid(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._UserServices
            .GetFamilyCommFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.FamilyCommFormsData = tdata;
                        this.FamilyCommFormsData.DateTimeObservation = new Date(this.FamilyCommFormsData.DateTimeObservation);
                        //console.log(this.PreAdmissionAssessmentFormsData);
                    } else {
                        this.FamilyCommFormsData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }
    saveAsUnfinished() {
        this.FamilyCommFormsData.isFormCompleted = false;
        this.Save();
    }
    Save() {
        if (this.userId != null && this.residentAdmissionInfoId != null) {
            this.FamilyCommFormsData.userId = this.userId;
            this.FamilyCommFormsData.StartedBy = localStorage.getItem('userId');
            this.FamilyCommFormsData.LastEnteredBy = localStorage.getItem('userId');
            this.FamilyCommFormsData.residentAdmissionInfoId = this.residentAdmissionInfoId;
            this.FamilyCommFormsData.DateTimeObservation = new Date(this.datepipe.transform(this.FamilyCommFormsData.DateTimeObservation, 'yyyy-MM-dd hh:MM:ss'));
            const objectBody: any = {
                StatementType: this.StatementType,
                FamilyCommForm: this.FamilyCommFormsData,
            };
            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._UserServices
                .InsertUpdateFamilyCommForm(objectBody)
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            this.ResetModel();
                            this._UtilityService.showSuccessAlert(
                                data.actionResult.errMsg
                            );
                        }
                        else
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
    completeForm() {
        this.FamilyCommFormsData.isFormCompleted = true;
        this.Save();
    }

}
