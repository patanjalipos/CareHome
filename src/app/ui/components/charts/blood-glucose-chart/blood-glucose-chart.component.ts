import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BloodGlucoseChartService } from './blood-glucose-chart.service';
import { DatePipe } from '@angular/common';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blood-glucose-chart',
  templateUrl: './blood-glucose-chart.component.html',
  styleUrls: ['./blood-glucose-chart.component.scss']
})
export class BloodGlucoseChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  loginId: string;
  userId: any;
  residentAdmissionInfoId: any;

  bloodGlucoseChartFormData: any = <any>{};
  stLstYesNoOptions: any[];
  stLstAttendanceOptions: any;
  isEditable: boolean;
  StatementType: string;
  inputFields: boolean;

  rangeOptionPrePostMeal: any[] = [
    { label: 'Pre Meal', value: 'Pre Meal' },
    { label: 'Post Meal', value: 'Post Meal' }
  ];

  //for carousel
  bloodGlucoseChartsLst: any[] = [];
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
    private _bloodGlucoseServices: BloodGlucoseChartService,
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
      this.bloodGlucoseChartFormData = <any>{};
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
      this.bloodGlucoseChartFormData = <any>{};
      this.bloodGlucoseChartFormData.activitiesChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }

  Save() {
    if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.bloodGlucoseChartFormData.userId = this.userId;
      this.bloodGlucoseChartFormData.StartedBy = this.loginId;
      this.bloodGlucoseChartFormData.LastEnteredBy = this.loginId;
      this.bloodGlucoseChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.bloodGlucoseChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.bloodGlucoseChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.bloodGlucoseChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.bloodGlucoseChartFormData.DateAndTime = parsedDate;
        }
        this.bloodGlucoseChartFormData.DateAndTime =
          this.datePipe.transform(
            this.bloodGlucoseChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        bloodGlucoseChart: this.bloodGlucoseChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._bloodGlucoseServices
        .AddInsertUpdatebloodGlucoseChartForm(objectBody)
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
            this.bloodGlucoseChartsLst = tdata;
            if (this.bloodGlucoseChartsLst.length < 3 || (((this.bloodGlucoseChartsLst.length) * (this.pageNumber + 1)) >= this.bloodGlucoseChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }
            console.log(this.bloodGlucoseChartsLst);

          } else {
            this.bloodGlucoseChartsLst = [];
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
      ChartMasterId: ChartTypes.BloodGlucoseChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;

    console.log(this.StrikeThroughData, 'chartdata');
  }

  openAndClose() {
    if (this.bloodGlucoseChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.bloodGlucoseChartFormData = <any>{};
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
