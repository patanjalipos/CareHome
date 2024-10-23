import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { OptionService } from 'src/app/ui/service/option.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BloodPressureChartService } from './blood-pressure-chart.service';
import { UserService } from 'src/app/ui/service/user.service';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    AlertTypes,
    ChartTypes,
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { StrikeThroughEntryComponent } from '../strike-through-entry/strike-through-entry.component';

@Component({
    selector: 'app-blood-pressure-chart',
    templateUrl: './blood-pressure-chart.component.html',
    styleUrls: ['./blood-pressure-chart.component.scss'],
})
export class BloodPressureChartComponent
    extends AppComponentBase
    implements OnInit {
    @ViewChild('child') child: StrikeThroughEntryComponent;
    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
    @Output() EmitUpdateAlert: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    bloodPressureChartFormData: any = <any>{};
    stLstMethod: any[] = [];
    stLstYesNoOptions: any[] = [];
    inputFields: boolean;

    isEditable: boolean;
    loginId: any;
    residentAdmissionInfoId: any;
    userId: any;
    StatementType: string = null;
    CareGivenCheck: boolean = false;
    ReasonCheck: boolean = false;

    //Alert Checks properties
    Clinical: any = <any>{};
    AlertCheck: boolean = false;

    //for carousel
    bloodPressureChartsLst: any[] = [];
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

    // chartId: string = '';
    alertCount: number = 0;

    constructor(
        private optionService: OptionService,
        private _UtilityService: UtilityService,
        private datePipe: DatePipe,
        private _UserService: UserService,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _BloodPressureChartService: BloodPressureChartService
    ) {
        super();
        this.loginId = localStorage.getItem('userId');
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedChartData.isEditable;
        if (this.preSelectedChartData.selectedChartID != null) {
            this.bloodPressureChartFormData = <any>{};
            this.GetBloodPressureChartDetails(
                this.preSelectedChartData.selectedChartID
            );
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
            this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

        }
    }

    ngOnInit(): void {
        this.userId = this.preSelectedChartData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedChartData.residentAdmissionInfoId;

        this.optionService.getstLstYesNoOptions().subscribe((data) => {
            this.stLstYesNoOptions = data;
        });

        this.optionService.getstLstMethod().subscribe((data) => {
            this.stLstMethod = data;
        });
        this.optionService.getstLstReason().subscribe((data) => {
            this.stLstReason = data;
        });
        this.optionService.getstLstErrorAndWarning().subscribe((data) => {
            this.stLstErrorAndWarning = data;
            this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.BloodPressureChart);
            this.ChartName = this.result["ChartName"];
            this._ConstantServices.ActiveMenuName = this.ChartName;
        });
        this.bloodPressureChartFormData.DateAndTime = new Date();
        // this.GetClinicalBaselineHealthInfoById(this.residentAdmissionInfoId);
        // this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
    }

    openAndClose() {
        if (this.bloodPressureChartFormData.CareGiven == 'Yes') {
            this.inputFields = true;
        } else {
            this.inputFields = false;
        }
    }

    GetBloodPressureChartDetails(chartId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._BloodPressureChartService
            .GetBloodPressureChartById(chartId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;

                        tdata = tdata ? tdata : {};
                        this.bloodPressureChartFormData = tdata;
                        this.bloodPressureChartFormData.DateAndTime =
                            this.datePipe.transform(
                                this.bloodPressureChartFormData.DateAndTime,
                                'dd-MM-yyyy HH:mm'
                            );
                        this.openAndClose();
                    } else {
                        this.bloodPressureChartFormData = {};
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
            this.bloodPressureChartFormData = <any>{};
            this.bloodPressureChartFormData.bloodPressureChartId =
                this.preSelectedChartData.selectedChartID;
        }
    }

    // GetClinicalBaselineHealthInfoById(admissionid) {
    //     this._UtilityService.showSpinner();
    //     this.unsubscribe.add = this._UserService.GetClinicalBaselineHealthInfoById(admissionid)
    //         .subscribe({
    //             next: (data) => {
    //                 this._UtilityService.hideSpinner();
    //                 if (data.actionResult.success == true) {
    //                   var tdata = data.actionResult.result;
    //                     tdata = tdata ? tdata : [];
    //                     this.Clinical = tdata;
    //                 }
    //             },
    //             error: (e) => {
    //                 this._UtilityService.hideSpinner();
    //                 this._UtilityService.showErrorAlert(e.message);
    //             },
    //         });
    // }

    // SaveAlert(chartId: any) {
    //     var value = this.bloodPressureChartFormData.Systolic.toString() + '/' + this.bloodPressureChartFormData.Diastolic.toString();
    //     var ChartAlert = {
    //         alertMasterId: AlertTypes.BloodPressureAlert,
    //         chartId: chartId,
    //         chartMasterId: this.preSelectedChartData.chartMasterId,
    //         userId: this.bloodPressureChartFormData.userId,
    //         residentAdmissionInfoId: this.bloodPressureChartFormData.ResidentAdmissionInfoId,
    //         dateAndTime: this.bloodPressureChartFormData.DateAndTime,
    //         status: AlertStatus.Active,
    //         value: value,
    //         createdBy: this.loginId,
    //         modifiedBy: this.loginId
    //     }
    //     debugger
    //    this.unsubscribe.add = this._UserService
    //         .InsertDailyVitalAlertLog(ChartAlert)
    //         .subscribe({
    //             next: (data) => {
                    
    //                 this.alertCount = parseInt(data.actionResult.stringVal);
    //                 this.EmitUpdateForm.emit(this.alertCount);
    //                 this._UtilityService.hideSpinner();
    //                 if (data.actionResult.success == true) {
    //                     this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
    //                 } else {
    //                     this._UtilityService.showWarningAlert(data.actionResult.errMsg);
    //                 }
    //             },
    //             error: (e) => {
    //                 this._UtilityService.hideSpinner();
    //                 this._UtilityService.showErrorAlert(e.message);
    //             },
    //         });
    // }

    // CompareAlert() {
    //     if ((!(this.bloodPressureChartFormData.Systolic >= this.Clinical.MinSBP && this.bloodPressureChartFormData.Systolic <= this.Clinical.MaxSBP)) && (!(this.bloodPressureChartFormData.Diastolic >= this.Clinical.MinDBP && this.bloodPressureChartFormData.Diastolic <= this.Clinical.MaxDBP))) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }

    Save() {
        if (this.bloodPressureChartFormData.CareGiven == null) {
            this.CareGivenCheck = true;
        }
        else if (this.bloodPressureChartFormData.CareGiven != null) {
            this.CareGivenCheck = false;
            if (this.bloodPressureChartFormData.CareGiven == 'Yes') {
                this.ReasonCheck = false;
            }
            else {
                if (this.bloodPressureChartFormData.Reason == null) {
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
            this.bloodPressureChartFormData.userId = this.userId;
            this.bloodPressureChartFormData.StartedBy = this.loginId;
            this.bloodPressureChartFormData.LastEnteredBy = this.loginId;
            this.bloodPressureChartFormData.ResidentAdmissionInfoId =
                this.residentAdmissionInfoId;

            if (this.bloodPressureChartFormData.DateAndTime) {
                if (
                    this.StatementType == 'Update' &&
                    typeof this.bloodPressureChartFormData.DateAndTime ===
                    'string'
                ) {
                    //Pare dateTime
                    const dateParts =
                        this.bloodPressureChartFormData.DateAndTime.split(
                            /[- :]/
                        );
                    const parsedDate = new Date(
                        +dateParts[2],
                        dateParts[1] - 1,
                        +dateParts[0],
                        +dateParts[3],
                        +dateParts[4]
                    );
                    this.bloodPressureChartFormData.DateAndTime = parsedDate;
                }
                this.bloodPressureChartFormData.DateAndTime =
                    this.datePipe.transform(
                        this.bloodPressureChartFormData.DateAndTime,
                        'yyyy-MM-ddTHH:mm'
                    );
            }

            const objectBody: any = {
                StatementType: this.StatementType,
                bloodPressureChartData: this.bloodPressureChartFormData,
                alertMasterId: AlertTypes.BloodPressureAlert,
                chartMasterId: ChartTypes.BloodPressureChart
            };
            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._BloodPressureChartService
                .AddInsertUpdateBloodPressureChartForm(objectBody)
                .subscribe({
                    next: (data) => {

                        // this.chartId = data.actionResult.stringVal;
                        this.alertCount = data.actionResult.value;
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            this.EmitUpdateAlert.emit(this.alertCount);

                            // this.CompareAlert();

                            // if (this.CompareAlert()) {
                            //     this.SaveAlert(this.chartId);
                            // }

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
            this._UtilityService.showWarningAlert(this.ChartName + " " + this.stLstErrorAndWarning.Warnings.Common.DetailMissMessage);
        }

    }

    ResetModel() {
        this.isEditable = true;
        this.bloodPressureChartFormData = <any>{};
        this.StatementType = 'Insert';
    }

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
        this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

    }

    getChartDataById(chartId: any, selectedChartId: any, selectedStartedOn: any, residentAdmissionInfoId: any, pageNumber: number, pageSize: number) {

        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._UserService
            .GetChartDataById(chartId, selectedChartId, selectedStartedOn, residentAdmissionInfoId, pageNumber, pageSize)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : [];
                        this.bloodPressureChartsLst = tdata;
                        if (this.bloodPressureChartsLst.length < 3 || (((this.bloodPressureChartsLst.length) * (this.pageNumber + 1)) >= this.bloodPressureChartsLst[0].countRecords)) {
                            this.rightBtnCheck = true;
                        }
                        else {
                            this.rightBtnCheck = false;
                        }
                    } else {
                        this.bloodPressureChartsLst = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    showPopup(chartId, chart) {
        this.StrikeThroughData = {
            ChartMasterId: ChartTypes.BloodPressureChart,
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
