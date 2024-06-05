import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BodyMappingRecordService } from './body-mapping-record.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { MasterService } from 'src/app/ui/service/master.service';

@Component({
    selector: 'app-body-mapping-record',
    templateUrl: './body-mapping-record.component.html',
    styleUrls: ['./body-mapping-record.component.scss']
})
export class BodyMappingRecordComponent extends AppComponentBase implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    BodyMappingFormsData: any = <any>{};
    //Form which is selected to edit or view

    isEditable: boolean; //Need to be passed from form Dashboard
    StatementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;
    //CreatedBy or ModifiedBy
    loginId: any;
    lstBodyMappingMaster: any[] = [];

    constructor(
        private datepipe: DatePipe,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _DataService: DataService,
        private _BodyMappingService: BodyMappingRecordService,
        private _MasterServices: MasterService
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Body Mapping Record Form';

        this.loginId = localStorage.getItem('userId');
    }

    ngOnInit(): void {
        this.userId = this.preSelectedFormData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedFormData.residentAdmissionInfoId;
        this.isEditable = this.preSelectedFormData.isEditable;
        const collectionNames = [
            'ReasonObservation'
        ];

        forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.BodyMappingRecord, collectionName, 1))).subscribe((responses: any[]) => {
            this.lstBodyMappingMaster = responses[0];
        });
        // this.GetBodyMappingReasonMaster();
    }

    getDropdownMasterLists(formMasterId: string, dropdownName: string, status: number): Observable<any> {
        this._UtilityService.showSpinner();
        return this._MasterServices.GetDropDownMasterList(formMasterId, dropdownName, status).pipe(
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

   
    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.BodyMappingFormsData = <any>{};
            this.GetBodyMappingFormByid(
                this.preSelectedFormData.selectedFormID
            );

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }
    GetBodyMappingFormByid(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._BodyMappingService
            .GetBodyMappingFormById(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.BodyMappingFormsData = tdata;
                        this.BodyMappingFormsData.DateTimeObservation = new Date(this.BodyMappingFormsData.DateTimeObservation);
                        this.BodyMappingFormsData.NextReviewDate = new Date(this.BodyMappingFormsData.NextReviewDate);
                        //console.log(this.PreAdmissionAssessmentFormsData);
                    } else {
                        this.BodyMappingFormsData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }
    ResetModel() {
        this.isEditable = true;
        this.BodyMappingFormsData = <any>{};
        this.StatementType = 'Insert';
    }
    saveAsUnfinished() {
        this.BodyMappingFormsData.isFormCompleted = false;
        this.Save();
    }
    Save() {
        if (this.userId != null && this.residentAdmissionInfoId != null) {
            this.BodyMappingFormsData.userId = this.userId;
            this.BodyMappingFormsData.StartedBy = localStorage.getItem('userId');
            this.BodyMappingFormsData.LastEnteredBy = localStorage.getItem('userId');
            this.BodyMappingFormsData.residentAdmissionInfoId = this.residentAdmissionInfoId;
            this.BodyMappingFormsData.DateTimeObservation = new Date(this.datepipe.transform(this.BodyMappingFormsData.DateTimeObservation, 'yyyy-MM-dd hh:MM:ss'));
            const objectBody: any = {
                StatementType: this.StatementType,
                BodyMappingForm: this.BodyMappingFormsData,
            };
            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._BodyMappingService
                .InsertUpdateBodyMappingForm(objectBody)
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
        this.BodyMappingFormsData.isFormCompleted = true;
        this.Save();
    }

}
