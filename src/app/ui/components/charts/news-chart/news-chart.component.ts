import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { AlertTypes, ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BowelChartService } from '../bowel-chart/bowel-chart.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/ui/service/user.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { Message } from 'primeng/api';
import { NewsChartService } from './news-chart.service';

@Component({
  selector: 'app-news-chart',
  templateUrl: './news-chart.component.html',
  styleUrls: ['./news-chart.component.scss']
})
export class NewsChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  customDateFormat = CustomDateFormat;
  inputFields: boolean;
  NewsChartFormData: any = <any>{};
  isEditable: boolean;
  loginId: any;
  residentAdmissionInfoId: any;
  userId: any;
  StatementType: string = null;
  lstBowelAction: any;
  lstAmount: any;
  lstInterventions: any;
  lstActivity: any[] = [];
  lstPurposeOfActivity: any[] = [];
  lstParticipation: any[] = [];
  lstConsciousness: any[] = [];
  lstAirOrOxygen: any[] = [];
  lstDevice: any[] = [];
  alertMsg: Message[];
  confuseMsg: Message[];
  verbalmsg: Message[];
  painMsg: Message[];
  unresponshiveMsg: Message[];
  monterningFrequancySuffix: string;


  //Static Options
  stLstYesNoOptions: any[] = [];
  stLstAttendanceOptions: any[] = [];
  stLstmonterningFrequancySuffix: any[] = [];

  //for carousel
  NewsChartsLst: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 3;
  responsiveOptions: any[] | undefined;
  rightBtnCheck: boolean = false;
  isShowStrikeThroughPopup: boolean = false;
  StrikeThroughData: any = <any>{};
  stLstReason: any[] = [];
  careGiven: boolean = false;
  reason: boolean = false;

  stLstErrorAndWarning: any;
  result: any;
  ChartName: any;



  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private _newsChartServices: NewsChartService,
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
      this.NewsChartFormData = <any>{};

      this.StatementType = 'Update';
    } else {
      this.ResetModel();
      this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

    }

  }


  ngOnInit(): void {
    this.NewsChartFormData.DateAndTime = new Date()
    this.userId = this.preSelectedChartData.userId;
    this.residentAdmissionInfoId =
      this.preSelectedChartData.residentAdmissionInfoId;

    this.optionService.getstLstYesNoOptions().subscribe((data) => {
      this.stLstYesNoOptions = data;
    });

    this.optionService.getstLstReason().subscribe((data) => {
      this.stLstReason = data;
    });

    this.optionService.getstLstmonterningFrequancySuffix().subscribe((data) => {
      this.stLstmonterningFrequancySuffix = data;
    })
    this.optionService.getstLstErrorAndWarning().subscribe((data) => {
      this.stLstErrorAndWarning = data;
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.BowelChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });
    const collectionNames = ['consciousness', 'airOrOxygen', 'device'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.NEWS2Chart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstConsciousness = responses[0];
      this.lstAirOrOxygen = responses[1];
      this.lstDevice = responses[2];
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

    this.alertMsg = [
      { severity: 'secondary', detail: 'The Person is alert.' }
    ];
    this.confuseMsg = [
      { severity: 'secondary', detail: 'The Person may be alert but confused or disorientated.' }
    ]
    this.verbalmsg = [
      { severity: 'secondary', detail: 'The Person only responds to varbal simulation.' }
    ]
    this.painMsg = [
      { severity: 'secondary', detail: 'The Person only responds to pain simulation.' }
    ]
    this.unresponshiveMsg = [
      { severity: 'secondary', detail: 'The Person completely unresponsive.' }
    ]
  }

  openAndClose() {
    if (this.NewsChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
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
            return response.actionResult.result;
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


  Save() {
    this.reason = false;
    this.careGiven = false;
    if (this.NewsChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.NewsChartFormData.CareGiven == 'No' && this.NewsChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.NewsChartFormData.userId = this.userId;
      this.NewsChartFormData.StartedBy = this.loginId;
      this.NewsChartFormData.LastEnteredBy = this.loginId;
      this.NewsChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.NewsChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.NewsChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.NewsChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.NewsChartFormData.DateAndTime = parsedDate;
        }
        this.NewsChartFormData.DateAndTime =
          this.datePipe.transform(
            this.NewsChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        newsChart: this.NewsChartFormData,
        alertMasterId: AlertTypes.NEWS2Alert,
        chartMasterId: ChartTypes.NEWS2Chart
      };


      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._newsChartServices
        .AddInsertUpdateNewsChartForm(objectBody)
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


  showPopup(chartId) {
    this.StrikeThroughData = {
      ChartMasterId: ChartTypes.NEWS2Chart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;
  }

  ResetModel() {
    this.isEditable = true;
    this.NewsChartFormData = <any>{};
    this.StatementType = 'Insert';
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
            this.NewsChartsLst = tdata;
            if (this.NewsChartsLst.length < 3 || (((this.NewsChartsLst.length) * (this.pageNumber + 1)) >= this.NewsChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }

          } else {
            this.NewsChartsLst = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
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


  ClearAllfeilds() {
    if (this.preSelectedChartData.chartMasterId) {
      this.NewsChartFormData = <any>{};
      this.NewsChartFormData.newsChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }

  caluNewsTwoScore() {
    this.NewsChartFormData.newstwoScore = this.NewsChartFormData.scaleScore + this.NewsChartFormData.bloodPressureScore + this.NewsChartFormData.airOrOxygenScore + this.NewsChartFormData.pulesScore + this.NewsChartFormData.airOrOxygenScore + this.NewsChartFormData.respirationScore + this.NewsChartFormData.consciousnessScore + this.NewsChartFormData.tempratureScore;

    this.calcuClinicalRisk();
  }
  msgForResponse() {
    this.NewsChartFormData.response = "Urgent or Emergency Response Consider sepsis.";
  }
  calcuClinicalRisk() {
    let data = this.NewsChartFormData.newstwoScore;

    if (data > 0 && data <= 2) {
      this.NewsChartFormData.clinicalRisk = "Low"
    } else if (data > 3 && data <= 4) {
      this.NewsChartFormData.clinicalRisk = "Low Medium";
    } else if (data > 5 && data <= 7) {
      this.NewsChartFormData.clinicalRisk = "Medium";
    } else if (data > 8) {
      this.NewsChartFormData.clinicalRisk = "Risk";
    }
    this.msgForResponse();

  }

  calcuRespirationRate() {
    let data = this.NewsChartFormData.respirationRate;
    if (data > 0 && data <= 8) {
      this.NewsChartFormData.respirationScore = 3;
    } else if (data > 9 && data <= 11) {
      this.NewsChartFormData.respirationScore = 1;
    } else if (data > 12 && data <= 20) {
      this.NewsChartFormData.respirationScore = 0;
    } else if (data > 21 && data <= 24) {
      this.NewsChartFormData.respirationScore = 2;
    } else if (data > 25) {
      this.NewsChartFormData.respirationScore = 3;
    }
    this.caluNewsTwoScore();
  }

  calcuScaleScore() {
    let data = this.NewsChartFormData.oxigen;

    if (data > 0 && data <= 83) {
      this.NewsChartFormData.scaleScore = 3;
    } else if (data > 83 && data <= 85) {
      this.NewsChartFormData.scaleScore = 2;
    } else if (data > 86 && data <= 87) {
      this.NewsChartFormData.scaleScore = 1;
    } else if (data > 88 && data <= 100) {
      this.NewsChartFormData.scaleScore = 0;
    } else if (data > 100) {
      this.NewsChartFormData.scaleScore = 3;
    }
    this.caluNewsTwoScore();
  }

  calcuAirOxygenScore() {
    if (this.NewsChartFormData.airOrOxygen == '66a878fdc3c14242d80a2647') {
      this.NewsChartFormData.airOrOxygenScore = 0;
    } else if (this.NewsChartFormData.airOrOxygen == '66a878fdc3c14242d80a2648') {
      this.NewsChartFormData.airOrOxygenScore = 2;
    }
    this.caluNewsTwoScore();

  }

  caluSystolicBPScore() {
    let data = this.NewsChartFormData.bloodPressure;

    if (data > 0 && data <= 90) {
      this.NewsChartFormData.bloodPressureScore = 3;
    } else if (data > 91 && data <= 100) {
      this.NewsChartFormData.bloodPressureScore = 2;
    } else if (data > 101 && data <= 110) {
      this.NewsChartFormData.bloodPressureScore = 1;
    } else if (data > 111 && data <= 218) {
      this.NewsChartFormData.bloodPressureScore = 0;
    } else if (data > 218) {
      this.NewsChartFormData.bloodPressureScore = 3;
    }
    this.caluNewsTwoScore();
  }

  calcuPulesScore() {

    let data = this.NewsChartFormData.pulesRate;

    if (data > 0 && data <= 40) {
      this.NewsChartFormData.pulesScore = 3;
    } else if (data > 41 && data <= 50) {
      this.NewsChartFormData.pulesScore = 1;
    } else if (data > 51 && data <= 90) {
      this.NewsChartFormData.pulesScore = 0;
    } else if (data > 91 && data <= 110) {
      this.NewsChartFormData.pulesScore = 1;
    } else if (data > 110 && data <= 130) {
      this.NewsChartFormData.pulesScore = 2;
    } else if (data > 131) {
      this.NewsChartFormData.pulesScore = 3;
    }

    this.caluNewsTwoScore();
  }

  calcuConsciousnessScore() {
    if (this.NewsChartFormData.consciousness == '66a878fdc3c14242d80a2642') {
      this.NewsChartFormData.consciousnessScore = 0;
    } else {
      this.NewsChartFormData.consciousnessScore = 3;
    }
    this.caluNewsTwoScore();
  }

  caluTempratureScore() {
    let data = this.NewsChartFormData.temprature;

    if (data <= 35) {
      this.NewsChartFormData.tempratureScore = 3;
    } else if (data > 35.1 && data <= 36) {
      this.NewsChartFormData.tempratureScore = 1;
    } else if (data > 36.1 && data <= 38) {
      this.NewsChartFormData.tempratureScore = 0;
    } else if (data > 38.1 && data <= 39) {
      this.NewsChartFormData.tempratureScore = 1;
    } else if (data > 39) {
      this.NewsChartFormData.tempratureScore = 2;
    }

    this.caluNewsTwoScore();
  }

  setValueOfMonterningFrequancy() {
    this.NewsChartFormData.monterningFrequancy = this.NewsChartFormData.monterningFrequancy + this.monterningFrequancySuffix;
  }

}
