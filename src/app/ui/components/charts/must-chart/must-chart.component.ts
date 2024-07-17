import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { MustChartService } from './must-chart.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-must-chart',
  templateUrl: './must-chart.component.html',
  styleUrls: ['./must-chart.component.scss']
})
export class MustChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  loginId: string;
  userId: any;
  residentAdmissionInfoId: any;

  mustChartFormData: any = <any>{};
  stLstYesNoOptions: any[];
  stLstAttendanceOptions: any;
  isEditable: boolean;
  StatementType: string;
  inputFields: boolean;
  reason: boolean = false;
  careGiven: boolean = false;
  lstHeightMeasured: any[] = [];
  lstWeightMeasured: any[] = [];
  lstLegOption: any[] = [];
  lstArmOption: any[] = [];
  amputee: boolean = false;
  BMI: number;

  rangeOptionResidentAmputee: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];
  rangeOptionOedema: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ]

  //for carousel
  mustChartsLst: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 3;
  responsiveOptions: any[] | undefined;
  rightBtnCheck: boolean = false;
  isShowStrikeThroughPopup: boolean = false;
  StrikeThroughData: any = <any>{};
  stLstReason: any[] = [];
  stLstErrorAndWarning: any;
  result: any;
  ChartName: any;

  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private _mustChartServices: MustChartService,
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
      this.mustChartFormData = <any>{};
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }

  }

  ngOnInit(): void {
    this.mustChartFormData.DateAndTime = new Date()
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
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.BloodGlucoseChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });

    const collectionNames = ['heightMeasured', 'weightMeasured', 'armoption', 'legoption'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.MUSTChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstHeightMeasured = responses[0];
      this.lstWeightMeasured = responses[1];
      this.lstArmOption = responses[2];
      this.lstLegOption = responses[3];
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

  ClearAllfeilds() {
    if (this.preSelectedChartData.selectedChartID) {
      this.mustChartFormData = <any>{};
      this.mustChartFormData.activitiesChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }

  Save() {
    this.reason = false;
    this.careGiven = false;
    if (this.mustChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.mustChartFormData.CareGiven == 'No' && this.mustChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.mustChartFormData.userId = this.userId;
      this.mustChartFormData.StartedBy = this.loginId;
      this.mustChartFormData.LastEnteredBy = this.loginId;
      this.mustChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.mustChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.mustChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.mustChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.mustChartFormData.DateAndTime = parsedDate;
        }
        this.mustChartFormData.DateAndTime =
          this.datePipe.transform(
            this.mustChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        mustChart: this.mustChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._mustChartServices
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
      this._UtilityService.showWarningAlert(this.ChartName + " " + this.stLstErrorAndWarning.Warnings.Common.DetailMissMessage);
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
            this.mustChartsLst = tdata;
            if (this.mustChartsLst.length < 3 || (((this.mustChartsLst.length) * (this.pageNumber + 1)) >= this.mustChartFormData[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }


          } else {
            this.mustChartsLst = [];
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
      ChartMasterId: ChartTypes.MUSTChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;

  }

  openAndClose() {
    if (this.mustChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.mustChartFormData = <any>{};
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

  onOption(event) {
    if (event.value == "Yes") {
      this.amputee = true;
    } else {
      this.amputee = false;
    }
  }
  BMICalIfResidentAmputeeByArms() {
    this.BMI = 0;
    let weight = this.mustChartFormData.weight;
    let height = this.mustChartFormData.height / 100;
    this.BMI = parseFloat((weight / (height * height)).toFixed(4));

    if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 5 / 100)).toFixed(4)));
    }
    if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 5 / 100) + (this.BMI * 5 / 100)).toFixed(4)));
    }
    if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 2.2 / 100)).toFixed(2)));
    }
    if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 2.2 / 100) + (weight * 2.2 / 100)).toFixed(4)));
    }
    if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 5 / 100) + (weight * 2.2 / 100)).toFixed(4)));
    }

  }

  BMICalIfResidentAmputeeByLegs() {
    this.BMI = 0;
    let weight = this.mustChartFormData.weight;
    let height = this.mustChartFormData.height / 100;
    this.BMI = parseFloat((weight / (height * height)).toFixed(4));


    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58133") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 18 / 100)).toFixed(4)));
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58134") {
      this.BMI = this.BMI + (parseFloat(weight + (weight * 18 / 100) + (weight * 18 / 100).toFixed(4)));
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58135") {
      this.BMI = this.BMI + (parseFloat(weight + (weight * 10 / 100)));
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58136") {
      this.BMI = this.BMI + (parseFloat(weight + (weight * 10 / 100) + (weight * 10 / 100).toFixed(4)));
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58137") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 6.3 / 100)).toFixed(4)));
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58138") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 6.3 / 100) + (weight * 6.3 / 100)).toFixed(4)));
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58139") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 18 / 100) + (weight * 10 / 100)).toFixed(4)));
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a5813a") {
      this.BMI = this.BMI + (parseFloat((weight + (weight * 18 / 100) + (weight * 6.3 / 100)).toFixed(4)));
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a5813b") {
      this.BMI = this.BMI + (parseFloat(weight + (weight * 10 / 100) + (weight * 6.3 / 100).toFixed(4)));
    }
  }
  BMICalculater(event) {
    if (this.mustChartFormData.weight != 0 && this.mustChartFormData.height != 0) {
      let weight = this.mustChartFormData.weight;
      let height = this.mustChartFormData.height / 100;

      this.BMI = parseFloat((weight / (height * height)).toFixed(4));
      this.BMICalIfResidentAmputeeByArms();
      this.BMICalIfResidentAmputeeByLegs();
    }
  }

}
