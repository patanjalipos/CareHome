import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ChartTypes,
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BehaviourChartService } from './behaviour-chart.service';
import { DatePipe } from '@angular/common';
import { StrikeThroughEntryComponent } from '../strike-through-entry/strike-through-entry.component';

@Component({
    selector: 'app-behaviour-chart',
    templateUrl: './behaviour-chart.component.html',
    styleUrls: ['./behaviour-chart.component.scss'],
})
export class BehaviourChartComponent
    extends AppComponentBase
    implements OnInit {
    @ViewChild('child') child: StrikeThroughEntryComponent;
    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    inputFieldsCheck: boolean = false;
    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    BehaviourChartData: any = <any>{};
    StatementType: string = null;

    LstBehaviourPurpose: any[] = [];
    //Static Options
    stLstYesNoOptions: any[] = [];

    //for carousel
    behaviourChartsLst: any[] = [];
    pageNumber: number = 0;
    pageSize: number = 3;
    responsiveOptions: any[] | undefined;
    rightBtnCheck: boolean = false;
    isShowStrikeThroughPopup: boolean = false;
    StrikeThroughData: any = <any>{};

    constructor(
        private optionService: OptionService,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private _Behaviour: BehaviourChartService,
        private datePipe: DatePipe
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Behaviour Chart';
        this.loginId = localStorage.getItem('userId');
    }

    ngOnChanges(changes: SimpleChanges): void {
        debugger;
        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.BehaviourChartData = <any>{};
            this.GetBehaviourChartDetails(
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

        const collectionNames = ['BehaviourPurposeOptions'];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.BehaviourChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.LstBehaviourPurpose = responses[0];
        });

        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.BehaviourChartData = <any>{};
            this.GetBehaviourChartDetails(
                this.preSelectedChartData.selectedChartID
            );
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }

        this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
    }

    openAndClose() {
        if (this.BehaviourChartData.CareGivenOptions == 'Yes') {
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

                    return of([]); // Returning empty array in case of error
                })
            );
    }

    GetBehaviourChartDetails(chartId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._Behaviour
            .GetBehaviourChartDetails(chartId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.BehaviourChartData = tdata;
                        this.openAndClose();
                        this.BehaviourChartData.DateAndTime =
                            this.datePipe.transform(
                                this.BehaviourChartData.DateAndTime,
                                'dd-MM-yyyy HH:mm'
                            );
                    } else {
                        this.BehaviourChartData = {};
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
            this.BehaviourChartData = <any>{};
            this.BehaviourChartData.activitiesChartId =
                this.preSelectedChartData.selectedChartID;
        }
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.BehaviourChartData.userId = this.userId;
            this.BehaviourChartData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.BehaviourChartData.StartedBy = this.loginId;
            this.BehaviourChartData.LastEnteredBy = this.loginId;

            if (this.BehaviourChartData.DateAndTime) {
                if (
                    this.StatementType == 'Update' &&
                    typeof this.BehaviourChartData.DateAndTime === 'string'
                ) {
                    //Pare dateTime
                    const dateParts =
                        this.BehaviourChartData.DateAndTime.split(/[- :]/);
                    const parsedDate = new Date(
                        +dateParts[2],
                        dateParts[1] - 1,
                        +dateParts[0],
                        +dateParts[3],
                        +dateParts[4]
                    );
                    this.BehaviourChartData.DateAndTime = parsedDate;
                }
                this.BehaviourChartData.DateAndTime = this.datePipe.transform(
                    this.BehaviourChartData.DateAndTime,
                    'yyyy-MM-ddTHH:mm'
                );
            }

            const objectBody: any = {
                StatementType: this.StatementType,
                BehaviourChartDetail: this.BehaviourChartData,
            };

            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._Behaviour
                .InsertUpdateBehaviourChart(objectBody)
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
                'Behaviour Chart details are missing.'
            );
        }
    }

    ResetModel() {
        this.isEditable = true;
        this.BehaviourChartData = <any>{};
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
                        this.behaviourChartsLst = tdata;
                        if (this.behaviourChartsLst.length < 3 || (((this.behaviourChartsLst.length) * (this.pageNumber + 1)) >= this.behaviourChartsLst[0].countRecords)) {
                            this.rightBtnCheck = true;
                        }
                        else {
                            this.rightBtnCheck = false;
                        }
                        console.log(this.behaviourChartsLst);

                    } else {
                        this.behaviourChartsLst = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    showPopup(chartId,chart) {
        this.StrikeThroughData = {
           ChartMasterId:ChartTypes.BehaviourChart,
           ChartId: chartId,
           ModifiedBy:this.loginId,
        };
        this.isShowStrikeThroughPopup = true;
        console.log(chart,'particular chart');
        
        console.log(this.StrikeThroughData,'chartdata');
       }

    Changes(value: boolean) {
        this.isShowStrikeThroughPopup = value;
        this.chartOnChange()
    }

}
