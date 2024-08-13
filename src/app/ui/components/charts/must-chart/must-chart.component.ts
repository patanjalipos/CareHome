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
import { Message } from 'primeng/api';

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
  lstWeightLoss: any[] = [];
  lstWeightLossOption: any[] = [];
  lstBMIOption: any[] = [];
  acuteDisease: boolean = false;
  openStepSection: boolean = false;
  weightmsg: Message[];
  residentAmputeemsg: Message[];
  heightmsg: Message[];
  weightAtThisTimeMsg: Message[];
  acuteDiseaseMsg: Message[];

  rangeOptionResidentAmputee: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];
  rangeOptionOedema: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ]
  rangeOptionAcuteDisease: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ]
  rangeOptionRiskCategory: any[] = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' }
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
  LowMessageA: Message[];
  LowMessageB: Message[];
  MediumMessageA: Message[];
  MediumMessageB: Message[];
  HighMessageA: Message[];
  HighMessageB: Message[];

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
      this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

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
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.MUSTChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });

    this.LowMessageA = [
      { severity: 'secondary', summary: 'All Risk Categories', detail: 'Treate underlying conditional and provide help and advice on food choices , eating and drinking when necessary  record malnutrition risk category . Record need for special diets and follow local policy' }
    ];
    this.LowMessageB = [
      { severity: 'secondary', summary: 'Obesity', detail: 'Record presence of obesity for those with underlying conditions , these are generally conditions, these are generally controlled before treatment of obesity.' }
    ];

    this.MediumMessageA = [
      { severity: 'secondary', summary: 'All Risk Categories', detail: 'Treat underlying condition and provide help and advice on food choices, eating and drinking when necessary Record malnutrition risk category. Record need for category diets and        follow local policy' }
    ]; this.MediumMessageB = [
      { severity: 'secondary', summary: 'Obesity', detail: 'record presence of obesity for those with underlying conditions , these are generally controlled before treatment of obesity.' }
    ];

    this.HighMessageA = [
      { severity: 'secondary', summary: 'All Risk Categories', detail: 'Treat underlying condition and provide help and advice on food choices, eating and drinking when necessary Record malnutrition risk category. Record need for category diets and follow local policy' }
    ]; this.HighMessageB = [
      { severity: 'secondary', summary: 'Obesity', detail: 'Record presence of obesity for those with underlying conditions , these are generally controlled before treatment of obesity.' }
    ];

    this.weightmsg = [
      { severity: 'secondary', detail: 'Use clinical scales where possible. Ensure scales are set to 0 without the resident standing on it.weight the resident in light clothing and without shoes.' }
    ];
    this.residentAmputeemsg = [
      { severity: 'secondary', detail: 'If the resident has had an amputation, the type of amputation will affect their BMI calculation as an adjust.' }
    ]
    this.heightmsg = [
      { severity: 'secondary', detail: 'Use a height stick where possible. Make sure it is correctly positioned against the wall. ask the resident to remove shoes and to stand upright,feet,flat,heels against the height stick or wall looking straight ahead lower the head plate untill it gently touches the top of the head.' }
    ]
    this.weightAtThisTimeMsg = [
      { severity: 'secondary', detail: 'Find the residents highest weight within the last 6 months.' }
    ]
    this.acuteDiseaseMsg = [
      { severity: 'secondary', detail: 'Almost all patients in the community will not be acutely ill. This effect is unlikely to apply outside of a hospital setting. see "MUST" Explanatory Booklet for further infomation.' }
    ]

    const collectionNames = ['heightMeasured', 'weightMeasured', 'armoption', 'legoption', 'weightLoss', 'bmiOption', 'weightLossOption'];

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
      this.lstWeightLoss = responses[4];
      this.lstBMIOption = responses[5];
      this.lstWeightLossOption = responses[6];
    });

    // this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
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
    if (this.preSelectedChartData.chartMasterId) {
      this.mustChartFormData = <any>{};
      this.mustChartFormData.mustChartId =
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
        .AddInsertUpdateMustChartForm(objectBody)
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

  getChartDataById(chartId: any, selectedChartId: any, selectedStartedOn: any, residentAdmissionInfoId: any, pageNumber: number, pageSize: number) {

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserService
      .GetChartDataById(chartId, selectedChartId, selectedStartedOn, residentAdmissionInfoId, pageNumber, pageSize)
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
    this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

  }

  onOption(event) {
    if (event.value == "Yes") {
      this.amputee = true;
    } else {
      this.amputee = false;
    }
  }
  BMICalByAmupteYes() {
    this.mustChartFormData.BMI = 0;
    let weight = this.mustChartFormData.adjustedWeight;
    let height = this.mustChartFormData.height / 100;
    this.mustChartFormData.BMI = parseFloat((weight / (height * height)).toFixed(4));

  }
  calBMIScore() {
    if (this.mustChartFormData.BMI < 18.5) {
      this.mustChartFormData.bmiScore = 2;
    } else if (this.mustChartFormData.BMI < 18.5 && this.mustChartFormData.BMI < 20) {
      this.mustChartFormData.bmiScore = 1;
    } else if (this.mustChartFormData.BMI > 20) {
      this.mustChartFormData.bmiScore = 0;
    }
  }

  JumpBMICal() {
    if (this.mustChartFormData.legoption != null && this.mustChartFormData.armoption != null) {
      this.CalBMIArmAndLeg();
    } else if (this.mustChartFormData.legoption != null || this.mustChartFormData.armoption != null) {
      if (this.mustChartFormData.armoption != null) {
        this.BMICalIfResidentAmputeeByArms();
      }
      else if (this.mustChartFormData.legoption != null) {
        this.BMICalIfResidentAmputeeByLegs();
      }
    }
  }
  BMICalIfResidentAmputeeByArms() {
    let weight = this.mustChartFormData.weight;

    if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 5 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 5 / 100) + (weight * 5 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 2.2 / 100)).toFixed(2));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 2.2 / 100) + (weight * 2.2 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 5 / 100) + (weight * 2.2 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }

    this.calBMIScore();

  }


  BMICalIfResidentAmputeeByLegs() {
    let weight = this.mustChartFormData.weight;

    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58133") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * (18 / 100))).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58134") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 18 / 100) + (weight * 18 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58135") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 10 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58136") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 10 / 100) + (weight * 10 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58137") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 6.3 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58138") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 6.3 / 100) + (weight * 6.3 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a58139") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 18 / 100) + (weight * 10 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a5813a") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 18 / 100) + (weight * 6.3 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }
    if (this.mustChartFormData.legoption == "6694fae4348f88d811a5813b") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * 10 / 100) + (weight * 6.3 / 100)).toFixed(4));
      this.BMICalByAmupteYes();
    }

    this.calBMIScore();


  }
  CalBMIArmAndLeg() {
    let weight = this.mustChartFormData.weight;

    if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a58133") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a58134") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (18 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a58135") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a58136") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a58137") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a58138") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a58139") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813a") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * 6.3 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812e" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813b") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    }


    else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a58133") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a58134") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (18 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a58135") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a58136") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a58137") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a58138") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a58139") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813a") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a5812f" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813b") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (5 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    }



    else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a58133") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100)).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a58134") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100)).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (18 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a58135") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight + (weight * (2.2 / 100))).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat(weight + (weight * (10 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a58136") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100)).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a58137") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100)).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a58138") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100)).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a58139") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100)).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813a") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100)).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58130" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813b") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100)).toFixed(2));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    }


    else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a58133") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a58134") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (18 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a58135") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a58136") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a58137") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a58138") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a58139") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813a") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58131" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813b") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (2.2 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    }


    if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a58133") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a58134") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (18 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a58135") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a58136") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a58137") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100)).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a58138") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (6.3 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a58139") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (10 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813a") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (18 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    } else if (this.mustChartFormData.armoption == "6694fae4348f88d811a58132" && this.mustChartFormData.legoption == "6694fae4348f88d811a5813b") {
      this.mustChartFormData.adjustedWeight = parseFloat((weight * (5 / 100) + (weight * (2.2 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight += parseFloat((weight * (10 / 100) + (weight * (6.3 / 100))).toFixed(4));
      this.mustChartFormData.adjustedWeight = this.mustChartFormData.adjustedWeight + this.mustChartFormData.weight;
      this.BMICalByAmupteYes();
    }

    this.calBMIScore();

  }

  BMICalculater(event, currentweight) {
    if (this.mustChartFormData.weight != 0 && this.mustChartFormData.height != 0) {
      this.mustChartFormData.currentWeight = currentweight;
      let weight = this.mustChartFormData.weight;
      let height = this.mustChartFormData.height / 100;

      this.mustChartFormData.BMI = parseFloat((weight / (height * height)).toFixed(4));
      this.BMICalIfResidentAmputeeByArms();
      this.BMICalIfResidentAmputeeByLegs();
    }

    if (this.mustChartFormData.BMI < 18.5) {
      this.mustChartFormData.bmiScore = 2;
    } else if (this.mustChartFormData.BMI < 18.5 && this.mustChartFormData.BMI < 20) {
      this.mustChartFormData.bmiScore = 1;
    } else if (this.mustChartFormData.BMI > 20) {
      this.mustChartFormData.bmiScore = 0;
    }
  }
  weightLossCal() {
    this.acuteDisease = true;
    let currentWeight = this.mustChartFormData.currentWeight;
    let weightAtTime = this.mustChartFormData.weightAtTime;

    this.mustChartFormData.weightLossInKG = weightAtTime - currentWeight;

    this.mustChartFormData.weightLossInPercent = (1 - (currentWeight / weightAtTime));
    console.log(weightAtTime);
    console.log(currentWeight);

    this.mustChartFormData.weightLossInPercent = (this.mustChartFormData.weightLossInPercent * 100).toFixed(4);


    if (this.mustChartFormData.weightLossInPercent < 5) {
      this.mustChartFormData.weightLossScore = 0;
    } else if (this.mustChartFormData.weightLossInPercent >= 5 && this.mustChartFormData.weightLossInPercent < 10) {
      this.mustChartFormData.weightLossScore = 1;
    } else {
      this.mustChartFormData.weightLossScore = 2;
    }
    if (this.mustChartFormData.weightLossScore == 0) {
      this.mustChartFormData.weightSignificance = "0 - Within NORMAL intra-individual variation.";
    } else if (this.mustChartFormData.weightLossScore == 1) {
      this.mustChartFormData.weightSignificance = "1 - More than normal intra-individual variation, early indicator of increased risk of undernutrition"
    } else if (this.mustChartFormData.weightLossScore == 2) {
      this.mustChartFormData.weightSignificance = "2 - Clinically significant";
    }
  }


  onAcuteScore(event) {
    if (this.mustChartFormData.residentAcutelyIll == 'Yes') {
      this.mustChartFormData.diseaseEffectScore = 2;
    } else {
      this.mustChartFormData.diseaseEffectScore = 0;
    }

    this.mustChartFormData.mustScore = this.mustChartFormData.bmiScore + parseInt(this.mustChartFormData.diseaseEffectScore) + parseInt(this.mustChartFormData.weightLossScore);

  }

  calculateBMIEstimation() {
    this.openStepSection = true;
    if (this.mustChartFormData.armCircurmference <= 20) {
      this.mustChartFormData.BMIEstimation = "Less than 20 (under weight)";
    } else if (this.mustChartFormData.armCircurmference > 20) {
      this.mustChartFormData.BMIEstimation = "More than 20 (normal weight)";
    }
  }

}
