import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { EnteralFeedingChartService } from './enteral-feeding-chart.service';
import { DatePipe } from '@angular/common';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-enteral-feeding-chart',
  templateUrl: './enteral-feeding-chart.component.html',
  styleUrls: ['./enteral-feeding-chart.component.scss']
})
export class EnteralFeedingChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  loginId: string;
  userId: any;
  residentAdmissionInfoId: any;

  enteralFeedingChartFormData: any = <any>{};
  stLstYesNoOptions: any[];
  stLstAttendanceOptions: any;
  isEditable: boolean;
  StatementType: string;
  inputFields: boolean;
  reason: boolean = false;
  careGiven: boolean = false;

  rangeOptionTube: any[] = [
    { label: 'PEG', value: 'PEG' },
    { label: 'NGT', value: 'NGT' },
    { label: 'Other', value: 'Other' }
  ];

  //for carousel
  enteralfeedingChartsLst: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 3;
  responsiveOptions: any[] | undefined;
  rightBtnCheck: boolean = false;
  isShowStrikeThroughPopup: boolean = false;
  StrikeThroughData: any = <any>{};
  stLstReason: any[] = [];


  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private _enteralFeedingChart: EnteralFeedingChartService,
    private _ConstantServices: ConstantsService,
    private route: ActivatedRoute
  ) {
    super();
    this.loginId = localStorage.getItem('userId');

    this.unsubscribe.add = this.route.queryParams.subscribe((params) => {
      var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);

      if (ParamsArray?.length > 0) {
        this.userId =
          ParamsArray.find((e) => e.FieldStr == 'id')?.FieldVal ||
          null;
        this.residentAdmissionInfoId =
          ParamsArray.find((e) => e.FieldStr == 'admissionid')
            ?.FieldVal || null;
      }
    });


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedChartData.isEditable;
    if (this.preSelectedChartData.selectedChartID != null) {
      this.enteralFeedingChartFormData = <any>{};
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }

  }

  ngOnInit(): void {
    this.enteralFeedingChartFormData.DateAndTime = new Date()
    this.userId = this.preSelectedChartData.userId;
    this.residentAdmissionInfoId =
      this.preSelectedChartData.residentAdmissionInfoId;

    this.optionService.getstLstYesNoOptions().subscribe((data) => {
      this.stLstYesNoOptions = data;
    });

    this.optionService.getstLstAttendaceOptions().subscribe((data) => {
      this.stLstAttendanceOptions = data;
    });
    this.optionService.getstLstReason().subscribe((data) => {
      this.stLstReason = data;
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
  }



  ClearAllfeilds() {
    if (this.preSelectedChartData.selectedChartID) {
      this.enteralFeedingChartFormData = <any>{};
      this.enteralFeedingChartFormData.enteralFeedingChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }

  Save() {
    this.reason = false;
    this.careGiven = false;
    if (this.enteralFeedingChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.enteralFeedingChartFormData.CareGiven == 'No' && this.enteralFeedingChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.enteralFeedingChartFormData.userId = this.userId;
      this.enteralFeedingChartFormData.StartedBy = this.loginId;
      this.enteralFeedingChartFormData.LastEnteredBy = this.loginId;
      this.enteralFeedingChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.enteralFeedingChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.enteralFeedingChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.enteralFeedingChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.enteralFeedingChartFormData.DateAndTime = parsedDate;
        }
        this.enteralFeedingChartFormData.DateAndTime =
          this.datePipe.transform(
            this.enteralFeedingChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        enteralFeedingChartData: this.enteralFeedingChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._enteralFeedingChart
        .AddInsertUpdateEnteralFeedingChart(objectBody)
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
      this._UtilityService.showWarningAlert('Blood Glucose Chart details are missing.');
    }
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
            this.enteralfeedingChartsLst = tdata;
            if (this.enteralfeedingChartsLst.length < 3 || (((this.enteralfeedingChartsLst.length) * (this.pageNumber + 1)) >= this.enteralfeedingChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }

          } else {
            this.enteralfeedingChartsLst = [];
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
      ChartMasterId: ChartTypes.EnteralFeedingChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;
  }

  openAndClose() {
    if (this.enteralFeedingChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.enteralFeedingChartFormData = <any>{};
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

  Changes(value: boolean) {
    this.isShowStrikeThroughPopup = value;
    this.chartOnChange()
  }

  chartOnChange() {
    this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
  }

}
