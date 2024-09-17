import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
    selector: 'app-acute-care-plan-infection-prevention-and-control',
    templateUrl: './acute-care-plan-infection-prevention-and-control.component.html',
    styleUrls: ['./acute-care-plan-infection-prevention-and-control.component.scss']
})
export class AcuteCarePlanInfectionPreventionAndControlComponent extends AppComponentBase implements OnInit {
    customDateFormat = CustomDateFormat;
    AcuteCarePlanInfectionFormsData: any = <any>{};
    //Form which is selected to edit or view

    isEditable: boolean; //Need to be passed from form Dashboard
    statementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;
    //CreatedBy or ModifiedBy
    loginId: any;
    lstAcuteInfection: any[] = [];
    lstAcuteStratagy: any[] = [];
    lstAcuteOutCome: any[] = [];
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UserServices: UserService,
        private _UtilityService: UtilityService,
        private _DataService: DataService
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Acute Care Plan Infection Prevention and Control Form';

        this.loginId = localStorage.getItem('userId');
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.AcuteCarePlanInfectionFormsData = <any>{};
            this.GetAcuteCarePlanFormByid(
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
            'AcuteInfection',
            'AcuteStratagy',
            'AcuteOutCome'
        ];

        forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.AcuteCarePlan, collectionName, 1))).subscribe((responses: any[]) => {
            this.lstAcuteInfection = responses[0];
            this.lstAcuteStratagy = responses[1];
            this.lstAcuteOutCome = responses[2];
        });
       
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.AcuteCarePlanInfectionFormsData = <any>{};
            this.GetAcuteCarePlanFormByid(
                this.preSelectedFormData.selectedFormID
            );

            this.statementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    ResetModel() {
        this.isEditable = true;
        this.AcuteCarePlanInfectionFormsData = <any>{};
        this.statementType = 'Insert';
    }

    SaveAsPDF() { }

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

    GetAcuteCarePlanFormByid(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._UserServices
            .GetAcuteCarePlanFormByid(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.AcuteCarePlanInfectionFormsData = tdata;
                      
                    } else {
                        this.AcuteCarePlanInfectionFormsData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }
    
    saveAsUnfinished() {
        this.AcuteCarePlanInfectionFormsData.isFormCompleted = false;
        this.Save();
    }
    Save() {
      
        if (this.userId != null && this.residentAdmissionInfoId != null) {
            this.AcuteCarePlanInfectionFormsData.userId = this.userId;
            this.AcuteCarePlanInfectionFormsData.StartedBy = localStorage.getItem('userId');
            this.AcuteCarePlanInfectionFormsData.LastEnteredBy = localStorage.getItem('userId');
            this.AcuteCarePlanInfectionFormsData.residentAdmissionInfoId = this.residentAdmissionInfoId;

            const objectBody: any = {
                statementType: this.statementType,
                acuteCareForm: this.AcuteCarePlanInfectionFormsData,
            };
            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._UserServices
                .InsertUpdateAcuteCarePlanForm(objectBody)
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
                'Acute Care Plan Infection Prevention and Control details are missing.'
            );
        }
    }
    completeForm() {
        this.AcuteCarePlanInfectionFormsData.isFormCompleted = true;
        this.Save();
    }
}
