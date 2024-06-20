import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { OptionService } from 'src/app/ui/service/option.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BloodPressureChartService } from './blood-pressure-chart.service';
import { UserService } from 'src/app/ui/service/user.service';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { log } from 'console';

@Component({
    selector: 'app-blood-pressure-chart',
    templateUrl: './blood-pressure-chart.component.html',
    styleUrls: ['./blood-pressure-chart.component.scss'],
})
export class BloodPressureChartComponent
    extends AppComponentBase
    implements OnInit {
    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    bloodPressureChartFormData: any = <any>{};
    stLstMethod: any[] = [];
    stLstYesNoOptions: any[] = [];
    inputFields: boolean = false;

    isEditable: boolean;
    loginId: any;
    residentAdmissionInfoId: any;
    userId: any;
    StatementType: string = null;

    //for carousel
    bloodPressureChartsLst: any[] = [];
    pageNumber: number = 0;
    pageSize: number = 3;
    responsiveOptions: any[] | undefined;
    rightBtnCheck: boolean = false;

    constructor(
        private optionService: OptionService,
        private _UtilityService: UtilityService,
        private datePipte: DatePipe,
        private _UserService: UserService,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _BloodPressureChartService: BloodPressureChartService
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Blood Pressure Chart';
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
        this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
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
                        var tdata = JSON.parse(data.actionResult.result);

                        tdata = tdata ? tdata : {};
                        this.bloodPressureChartFormData = tdata;
                        this.bloodPressureChartFormData.DateAndTime =
                            this.datePipte.transform(
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
        if (this.preSelectedChartData.selectedChartID) {
            this.bloodPressureChartFormData = <any>{};
            this.bloodPressureChartFormData.activitiesChartId =
                this.preSelectedChartData.selectedChartID;
        }
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
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
                    this.datePipte.transform(
                        this.bloodPressureChartFormData.DateAndTime,
                        'yyyy-MM-ddTHH:mm'
                    );
            }

            const objectBody: any = {
                StatementType: this.StatementType,
                bloodPressureChartData: this.bloodPressureChartFormData,
            };

            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._BloodPressureChartService
                .AddInsertUpdateBloodPressureChartForm(objectBody)
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
            this._UtilityService.showWarningAlert('Blood Pressure Chart');
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
                        this.bloodPressureChartsLst = tdata;
                        if (this.bloodPressureChartsLst.length < 3 || (((this.bloodPressureChartsLst.length) * (this.pageNumber + 1)) >= this.bloodPressureChartsLst[0].countRecords)) {
                            this.rightBtnCheck = true;
                        }
                        else {
                            this.rightBtnCheck = false;
                        }
                        console.log(this.bloodPressureChartsLst);

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

    showPopup() {


    }
}
