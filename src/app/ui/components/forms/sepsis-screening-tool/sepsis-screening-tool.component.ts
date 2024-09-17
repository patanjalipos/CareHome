import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { SepsisScreeningToolService } from './sepsis-screening-tool.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
    selector: 'app-sepsis-screening-tool',
    templateUrl: './sepsis-screening-tool.component.html',
    styleUrls: ['./sepsis-screening-tool.component.scss']
})
export class SepsisScreeningToolComponent extends AppComponentBase implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    SepsisScreeningFormsData: any = <any>{};
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    statementType: string = null;

    lstRiskFactors: any[] = [];
    lstInfectionCheck: any[] = [];
    lstRedFlagsCheck: any[] = [];
    lstAmberFlags: any[] = [];
    lstAssessmentOutcome: any[] = [];

    constructor(private _ConstantServices: ConstantsService, private route: ActivatedRoute, private _UtilityService: UtilityService, private _UserServices: UserService, private _Sepsis: SepsisScreeningToolService) {

        super();
        this._ConstantServices.ActiveMenuName = "Sepsis Screening Tool Form";
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.SepsisScreeningFormsData = <any>{};
            this.GetSepsisScreeningDetails(
                this.preSelectedFormData.selectedFormID
            );
            this.statementType = 'Update';
        }
        else {
            this.ResetModel();
        }
    }

    ngOnInit(): void {

        this.userId = this.preSelectedFormData.userId;
        this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

        const collectionNames = [
            'RiskFactors',
            'InfectionCheck',
            'RedFlagsCheck',
            'AmberFlags',
            'AssessmentOutcome'
        ];

        forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.SepsisScreening, collectionName, 1))).subscribe((responses: any[]) => {
            this.lstRiskFactors = responses[0];
            this.lstInfectionCheck = responses[1];
            this.lstRedFlagsCheck = responses[2];
            this.lstAmberFlags = responses[3];
            this.lstAssessmentOutcome = responses[4];
        });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.SepsisScreeningFormsData = <any>{};
            this.GetSepsisScreeningDetails(
                this.preSelectedFormData.selectedFormID
            );
            this.statementType = 'Update';
        }
        else {
            this.ResetModel();
        }
    }

    SaveAsPDF() { }

    GetSepsisScreeningDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._Sepsis
            .GetSepsisScreeningDetails(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.SepsisScreeningFormsData = tdata;

                    } else {
                        this.SepsisScreeningFormsData = {};
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



    saveAsUnfinished() {

        this.SepsisScreeningFormsData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.SepsisScreeningFormsData.isFormCompleted = true;
        this.Save();
    }

    Save() {
        debugger
        if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

            this.SepsisScreeningFormsData.userId = this.userId;
            this.SepsisScreeningFormsData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.SepsisScreeningFormsData.startedBy = this.loginId;
            this.SepsisScreeningFormsData.lastEnteredBy = this.loginId;

            const objectBody: any = {
                statementType: this.statementType,
                sepsisScreeningForm: this.SepsisScreeningFormsData,
            };

            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._Sepsis
                .InsertUpdateSepsisScreeningForm(
                    objectBody
                )
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            //   this.ResetModel();
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
                'Sepsis Screening Tool details are missing.'
            );
        }
    }


    ResetModel() {
        this.isEditable = true;
        this.SepsisScreeningFormsData = <any>{};
        this.statementType = 'Insert';
    }

}
