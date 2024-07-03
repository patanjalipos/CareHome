import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { GlasgowComaScaleChartService } from './glasgow-coma-scale-chart.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-glasgow-coma-scale-chart',
  templateUrl: './glasgow-coma-scale-chart.component.html',
  styleUrls: ['./glasgow-coma-scale-chart.component.scss']
})
export class GlasgowComaScaleChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();


  customDateFormat = CustomDateFormat;
  loginId: string;
  userId: any;
  residentAdmissionInfoId: any;

  glasgowComaScaleChartFormData: any = <any>{};
  stLstYesNoOptions: any[];
  stLstAttendanceOptions: any;
  isEditable: boolean;
  StatementType: string;
  inputFields: boolean;
  reason: boolean = false;
  careGiven: boolean = false;
  message: any[] = [];
  ScaleScore: number = 0;

  lstEyeOpening: any[] = [];
  lstVerbalResponse: any[] = [];
  lstBestMotorResponse: any[] = [];
  lstSiteOfMeasurement: any[] = [];
  lstRhythm: any[] = [];
  lstResidentPosition: any[] = [];

  //for carousel
  glasgowComaScaleChartLst: any[] = [];
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
    private _glasgowComaScaleChartServices: GlasgowComaScaleChartService,
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
      this.glasgowComaScaleChartFormData = <any>{};
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }

  }

  ngOnInit(): void {
    this.glasgowComaScaleChartFormData.DateAndTime = new Date()
    this.userId = this.preSelectedChartData.userId;
    this.residentAdmissionInfoId =
      this.preSelectedChartData.residentAdmissionInfoId;

    this.optionService.getstLstYesNoOptions().subscribe((data) => {
      this.stLstYesNoOptions = data;
    });
    this.optionService.getstLstReason().subscribe((data) => {
      this.stLstReason = data;
    });

    this.message = [
      { severity: 'info', detail: 'Complete the eye verbal and motor responses to calculate the score' }
    ];

    const collectionNames = ['eyeOpening', 'verbalResponse', 'bestMotorResponse', 'siteOfMeasurement', 'rhythm', 'residentPosition'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.GlasgowComaScaleChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstEyeOpening = responses[0];
      this.lstVerbalResponse = responses[1];
      this.lstBestMotorResponse = responses[2];
      this.lstSiteOfMeasurement = responses[3];
      this.lstRhythm = responses[4];
      this.lstResidentPosition = responses[5];
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

  scaleScoreCalculater(optionId: any) {
    if (this.ScaleScore == -1) {
      return;
    }else if (optionId == "6683cf8b047186747f31e460") {
      this.ScaleScore += 6;
    } else if (optionId == "6683cf8b047186747f31e45b" || optionId == "6683cf8b047186747f31e461") {
      this.ScaleScore += 5;
    } else if (optionId == "6683cf8b047186747f31e456" || optionId == "6683cf8b047186747f31e45c" || optionId == "6683cf8b047186747f31e462") {
      this.ScaleScore += 4;
    } else if (optionId == "6683cf8b047186747f31e463" || optionId == "6683cf8b047186747f31e457" || optionId == "66851349b87aeab16ecd10e3") {
      this.ScaleScore += 3;
    } else if (optionId == "6683cf8b047186747f31e458" || optionId == "6683cf8b047186747f31e45d" || optionId == "6683cf8b047186747f31e464") {
      this.ScaleScore += 2;
    } else if (optionId == "6683cf8b047186747f31e459" || optionId == "6683cf8b047186747f31e45e" || optionId == "6683cf8b047186747f31e465") {
      this.ScaleScore += 1;
    } else {
      this.ScaleScore = -1;
    }
  }

  ClearAllfeilds() {
    if (this.preSelectedChartData.selectedChartID) {
      this.glasgowComaScaleChartFormData = <any>{};
      this.glasgowComaScaleChartFormData.activitiesChartId =
        this.preSelectedChartData.selectedChartID;
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

  Save() {
    this.reason = false;
    this.careGiven = false;
    if (this.glasgowComaScaleChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.glasgowComaScaleChartFormData.CareGiven == 'No' && this.glasgowComaScaleChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.glasgowComaScaleChartFormData.userId = this.userId;
      this.glasgowComaScaleChartFormData.StartedBy = this.loginId;
      this.glasgowComaScaleChartFormData.LastEnteredBy = this.loginId;
      this.glasgowComaScaleChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.glasgowComaScaleChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.glasgowComaScaleChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.glasgowComaScaleChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.glasgowComaScaleChartFormData.DateAndTime = parsedDate;
        }
        this.glasgowComaScaleChartFormData.DateAndTime =
          this.datePipe.transform(
            this.glasgowComaScaleChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        glasgowComaScaleChart: this.glasgowComaScaleChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._glasgowComaScaleChartServices
        .AddInsertUpdateGlasgowComaChartForm(objectBody)
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
            this.glasgowComaScaleChartLst = tdata;
            if (this.glasgowComaScaleChartLst.length < 3 || (((this.glasgowComaScaleChartLst.length) * (this.pageNumber + 1)) >= this.glasgowComaScaleChartLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }
          } else {
            this.glasgowComaScaleChartLst = [];
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
      ChartMasterId: ChartTypes.GlasgowComaScaleChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;

  }

  openAndClose() {
    if (this.glasgowComaScaleChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.glasgowComaScaleChartFormData = <any>{};
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
