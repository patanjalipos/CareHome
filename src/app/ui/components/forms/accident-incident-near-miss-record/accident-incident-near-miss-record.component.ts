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
import { AppComponentBase } from 'src/app/app-component-base';
import { DataService } from 'src/app/ui/service/data-service.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { DatePipe } from '@angular/common';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
    selector: 'app-accident-incident-near-miss-record',
    templateUrl: './accident-incident-near-miss-record.component.html',
    styleUrls: ['./accident-incident-near-miss-record.component.scss'],
})
export class AccidentIncidentNearMissRecordComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    AccidentNearMissRecordFormsData: any = <any>{};
    residentAdmissionInfoId: any;
    uniqueReferenceId: any;
    loginId: any;
    userId: any;
    StatementType: string = null;
    checked: boolean = false;

    lstlocationaccident: any[] = [];
    lstAccidentPlace: any[] = [];
    lstAccidentType: any[] = [];
    lstInjurySustained: any[] = [];
    lstJobRole: any[] = [];
    lstEmergencyServices: any[] = [];
    lstQualifiedAssessor:any[]=[];
    lstSecondarySurvay:any[]=[];
    
    constructor(
        private _ConstantServices: ConstantsService,
        private _UserServices: UserService,
        private _UtilityService: UtilityService,
        private datePipe: DatePipe
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Accident Near Miss Record Form';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.AccidentNearMissRecordFormsData = <any>{};
            this.GetAccidentNearMissRecordDetails(
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

        const collectionNames = [
            'LocationOfAccident',
            'AccidentFloorPlace',
            'AccidentType',
            'InjuriesSustained',
            'JobRole',
            'EmergencyServices',
            'QualifiedAssessor',
            'SecondarySurvay'
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.getDropdownMasterLists(
                    FormTypes.AccidentIncident,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.lstlocationaccident = responses[0];
            this.lstAccidentPlace = responses[1];
            this.lstAccidentType = responses[2];
            this.lstInjurySustained = responses[3];
            this.lstJobRole = responses[4];
            this.lstEmergencyServices = responses[5];
            this.lstQualifiedAssessor=responses[6];
            this.lstSecondarySurvay=responses[7];
        });

        if (this.preSelectedFormData.selectedFormID != null) {
            this.AccidentNearMissRecordFormsData = <any>{};
            this.GetAccidentNearMissRecordDetails(
                this.preSelectedFormData.selectedFormID
            );
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
        this.AccidentNearMissRecordFormsData.DateOfAccident = new Date();
    }

    getFormattedTime(time: Date) {
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    getDropdownMasterLists(
        formMasterId: string,
        dropdownName: string,
        status: number
    ): Observable<any> {
        this._UtilityService.showSpinner();
        return this._UserServices
            .GetDropDownMasterList(formMasterId, dropdownName, status)
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

    SaveAsPDF() { }

    GetAccidentNearMissRecordDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._UserServices
            .GetAccidentNearMissRecordDetails(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};

                        this.AccidentNearMissRecordFormsData = tdata;
                        this.AccidentNearMissRecordFormsData.DateOfAccident =
                            this.datePipe.transform(
                                this.AccidentNearMissRecordFormsData
                                    .DateOfAccident,
                                'MM/dd/yyyy'
                            );
                        this.AccidentNearMissRecordFormsData.EmergencyServicesContacted =
                            this.datePipe.transform(
                                this.AccidentNearMissRecordFormsData
                                    .EmergencyServicesContacted,
                                'MM/dd/yyyy'
                            );

                    } else {
                        this.AccidentNearMissRecordFormsData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }
    saveAsUnfinished() {
        this.AccidentNearMissRecordFormsData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.AccidentNearMissRecordFormsData.isFormCompleted = true;
        this.Save();
    }

    Save() {
        debugger;
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.AccidentNearMissRecordFormsData.userId = this.userId;
            this.AccidentNearMissRecordFormsData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.AccidentNearMissRecordFormsData.StartedBy = this.loginId;
            this.AccidentNearMissRecordFormsData.LastEnteredBy = this.loginId;
            this.AccidentNearMissRecordFormsData.DateOfAccident =
                this.datePipe.transform(
                    this.AccidentNearMissRecordFormsData.DateOfAccident,
                    'yyyy-MM-dd'
                );
            // this.AccidentNearMissRecordFormsData.EmergencyServicesContacted =
            //     this.datePipe.transform(
            //         this.AccidentNearMissRecordFormsData
            //             .EmergencyServicesContacted,
            //         'yyyy-MM-dd'
            //     );
            const objectBody: any = {
                StatementType: this.StatementType,
                accidentNearMissRecordForm:
                    this.AccidentNearMissRecordFormsData,
            };

console.log(objectBody);


            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._UserServices
                .AddInsertUpdateAccidentNearMissRecordForm(objectBody)
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            this.ResetModel();
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
                'Accident Near or Miss record details are missing.'
            );
        }
    }

    ResetModel() {
        this.isEditable = true;
        this.AccidentNearMissRecordFormsData = <any>{};
        this.StatementType = 'Insert';
    }
}
