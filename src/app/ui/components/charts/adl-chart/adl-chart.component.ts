import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ChartTypes,
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
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

    inputFieldsCheck: boolean;
    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    ADLChartData: any = <any>{};
    StatementType: string = null;
    CareGivenCheck: boolean = false;
    ReasonCheck: boolean = false;
    WaterTempCheck: boolean = false;
    OtherCheck: boolean = false;
    ShowerValueId: string;
    BathValueId: string;
    OtherValueId: string;
    Assistance: any[] = [];

    LstTransferMethod: any[] = [];
    LstAssistanceLevel: any[] = [];
    LstHygieneAssistanceRequired: any[] = [];
    LstRepositionalChanges: any[] = [];
    LstDressingAssistanceRequired: any[] = [];
    LstToiletingAssistanceRequired: any[] = [];
    //Static Options
    stLstYesNoOptions: any[] = [];

    //for carousel
    ADLChartsLst: any[] = [];
    pageNumber: number = 0;
    pageSize: number = 3;
    responsiveOptions: any[] | undefined;
    rightBtnCheck: boolean = false;
    isShowStrikeThroughPopup: boolean = false;
    StrikeThroughData: any = <any>{};
    stLstReason: any[] = [];
    stLstErrorAndWarning: any = <any>{};
    result: any = <any>{};
    ChartName: string;

    constructor(
        private optionService: OptionService,
        private _ConstantServices: ConstantsService,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private _ADLChart: AdlChartService,
        private datePipe: DatePipe
    ) {
        super();
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
        this.optionService.getstLstReason().subscribe((data) => {
            this.stLstReason = data;
        });
        this.optionService.getstLstErrorAndWarning().subscribe((data) => {
            this.stLstErrorAndWarning = data;
            this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.ADLChart);
            this.ChartName = this.result["ChartName"];
            this._ConstantServices.ActiveMenuName = this.ChartName;
        });

        this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
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
        this.ADLChartData.DateAndTime = new Date();
    }

    openAndClose() {
        if (this.ADLChartData.CareGivenOptions == "Yes") {
            this.inputFieldsCheck = true;
        } else {
            this.inputFieldsCheck = false;
        }
    }

    ChangeElement() {
        this.Assistance = this.ADLChartData.HygieneAssistanceRequiredOptions;
        if (this.ADLChartData.HygieneAssistanceRequiredOptions.length != 0) {
                
                this.WaterTempCheck = this.Assistance.includes(this.ShowerValueId) || this.Assistance.includes(this.BathValueId);
                this.OtherCheck = this.Assistance.includes(this.OtherValueId);

            this.LstHygieneAssistanceRequired.forEach(item => {
                if (this.Assistance.includes(item.optionId)) {
                  if (item.optionName === 'Shower' || item.optionName === 'Bath') {
                    this.WaterTempCheck = true;
                    item.optionName === 'Shower' ? this.ShowerValueId = item.optionId : this.BathValueId = item.optionId;
                  } else if (item.optionName === 'Other') {
                    this.OtherCheck = true;
                    this.OtherValueId = item.optionId; 
                  }
                }
              });
        }
        else {
            this.WaterTempCheck = false;
            this.OtherCheck = false;
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
        if (this.preSelectedChartData.chartMasterId) {
            this.ADLChartData = <any>{};
            this.ADLChartData.ADLChartId =
                this.preSelectedChartData.selectedChartID;
        }
    }

    Save() {
        if (this.ADLChartData.CareGivenOptions == null) {
            this.CareGivenCheck = true;
        }
        else if (this.ADLChartData.CareGivenOptions != null) {
            this.CareGivenCheck = false;
            if (this.ADLChartData.CareGivenOptions == 'Yes') {
                this.ReasonCheck = false;
            }
            else {
                if (this.ADLChartData.Reason == null) {
                    this.ReasonCheck = true;
                }
                else {
                    this.ReasonCheck = false;
                }
            }
        }
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null && this.CareGivenCheck == false && this.ReasonCheck == false
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

            this.ADLChartData.WaterTemperatureCheck = this.WaterTempCheck;
            this.ADLChartData.OtherCheck = this.OtherCheck;

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
                this.ChartName + " " + this.stLstErrorAndWarning.Warnings.Common.DetailMissMessage
            );
        }
    }

    ResetModel() {
        this.isEditable = true;
        this.ADLChartData = <any>{};
        this.StatementType = 'Insert';
    }

    SaveAsPDF() { }

    leftBtn() {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.chartOnChange();
        }
    }

    rightBtn() {
        this.pageNumber++;
        this.chartOnChange();
    }

    chartOnChange() {
        this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
    }

    getChartDataById(chartId: any, residentAdmissionInfoId: any, pageNumber: number, pageSize: number) {

        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._UserService
            .GetChartDataById(chartId, residentAdmissionInfoId, pageNumber, pageSize)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : [];
                        this.ADLChartsLst = tdata;
                        if (this.ADLChartsLst.length < 3 || (((this.ADLChartsLst.length) * (this.pageNumber + 1)) >= this.ADLChartsLst[0].countRecords)) {
                            this.rightBtnCheck = true;
                        }
                        else {
                            this.rightBtnCheck = false;
                        }
                    } else {
                        this.ADLChartsLst = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    showPopup(chartId) {
        this.StrikeThroughData = {
            ChartMasterId: ChartTypes.ADLChart,
            ChartId: chartId,
            ModifiedBy: this.loginId,
        };
        this.isShowStrikeThroughPopup = true;
    }

    Changes(value: boolean) {
        this.isShowStrikeThroughPopup = value;
        this.chartOnChange()
    }
}
