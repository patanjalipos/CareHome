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
    ChartTypes,
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AdlChartService } from './adl-chart.service';
import { UserService } from 'src/app/ui/service/user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-adl-chart',
    templateUrl: './adl-chart.component.html',
    styleUrls: ['./adl-chart.component.scss'],
})
export class AdlChartComponent extends AppComponentBase implements OnInit {
    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    inputFieldsCheck: boolean = false;
    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    ADLChartData: any = <any>{};
    StatementType: string = null;

    LstTransferMethod: any[] = [];
    LstAssistanceLevel: any[] = [];
    LstHygieneAssistanceRequired: any[] = [];
    LstRepositionalChanges: any[] = [];
    LstDressingAssistanceRequired: any[] = [];
    LstToiletingAssistanceRequired: any[] = [];
    //Static Options
    stLstYesNoOptions: any[] = [];

    constructor(
        private optionService: OptionService,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private _ADLChart: AdlChartService,
        private datePipe: DatePipe
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'ADL Chart';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.ADLChartData = <any>{};
            this.GetADLChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    ngOnInit(): void {
        this.userId = this.preSelectedChartData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedChartData.residentAdmissionInfoId;

        this.optionService.getstLstYesNoOptions().subscribe((data) => {
            this.stLstYesNoOptions = data;
        });

        const collectionNames = [
            'TransferMethodOptions',
            'AssistanceLevelOptions',
            'HygieneAssistanceRequiredOptions',
            'RepositionalChangesOptions',
            'DressingAssistanceRequiredOptions',
            'ToiletingAssistanceRequiredOptions',
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.ADLChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.LstTransferMethod = responses[0];
            this.LstAssistanceLevel = responses[1];
            this.LstHygieneAssistanceRequired = responses[2];
            this.LstRepositionalChanges = responses[3];
            this.LstDressingAssistanceRequired = responses[4];
            this.LstToiletingAssistanceRequired = responses[5];
        });

        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.ADLChartData = <any>{};
            this.GetADLChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    openAndClose() {
        if (this.ADLChartData.CareGivenOptions == 'Yes') {
            this.inputFieldsCheck = true;
        } else {
            this.inputFieldsCheck = false;
        }
    }

    GetChartDropDownMasterList(
        chartMasterId: string,
        dropdownName: string,
        status: number
    ): Observable<any> {
        this._UtilityService.showSpinner();
        return this._UserService
            .GetChartDropDownMasterList(chartMasterId, dropdownName, status)
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

    GetADLChartDetails(chartId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._ADLChart
            .GetADLChartDetails(chartId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.ADLChartData = tdata;
                        this.openAndClose();
                        this.ADLChartData.DateAndTime = this.datePipe.transform(
                            this.ADLChartData.DateAndTime,
                            'dd-MM-yyyy HH:mm'
                        );
                    } else {
                        this.ADLChartData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    ClearAllfeilds() {
        if (this.preSelectedChartData.selectedChartID) {
            this.ADLChartData = <any>{};
            this.ADLChartData.activitiesChartId =
                this.preSelectedChartData.selectedChartID;
        }
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.ADLChartData.userId = this.userId;
            this.ADLChartData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.ADLChartData.StartedBy = this.loginId;
            this.ADLChartData.LastEnteredBy = this.loginId;

            if (this.ADLChartData.DateAndTime) {
                if (
                    this.StatementType == 'Update' &&
                    typeof this.ADLChartData.DateAndTime === 'string'
                ) {
                    //Pare dateTime
                    const dateParts =
                        this.ADLChartData.DateAndTime.split(/[- :]/);
                    const parsedDate = new Date(
                        +dateParts[2],
                        dateParts[1] - 1,
                        +dateParts[0],
                        +dateParts[3],
                        +dateParts[4]
                    );
                    this.ADLChartData.DateAndTime = parsedDate;
                }
                this.ADLChartData.DateAndTime =
                    this.datePipe.transform(
                        this.ADLChartData.DateAndTime,
                        'yyyy-MM-ddTHH:mm'
                    );
            }

            const objectBody: any = {
                StatementType: this.StatementType,
                ADLChartDetail: this.ADLChartData,
            };
            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._ADLChart
                .InsertUpdateADLChart(objectBody)
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            //   this.ResetModel();
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
                'ADL Chart details are missing.'
            );
        }
    }

    ResetModel() {
        this.isEditable = true;
        this.ADLChartData = <any>{};
        this.StatementType = 'Insert';
    }

    SaveAsPDF() {}
}
