import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BowelChartService } from './bowel-chart.service';

@Component({
  selector: 'app-bowel-chart',
  templateUrl: './bowel-chart.component.html',
  styleUrls: ['./bowel-chart.component.scss']
})
export class BowelChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  customDateFormat = CustomDateFormat;
  inputFields: boolean;
  BowelChartFormData: any = <any>{};
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

  //Static Options
  stLstYesNoOptions: any[] = [];
  stLstAttendanceOptions: any[] = [];

  //for carousel
  BowelChartsLst: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 3;
  responsiveOptions: any[] | undefined;
  rightBtnCheck: boolean = false;
  isShowStrikeThroughPopup: boolean = false;
  StrikeThroughData: any = <any>{};
  stLstReason: any[] = [];
  careGiven: boolean = false;
  reason: boolean = false;
  continenceRangeOption: any[] = [
    { label: 'Continent', value: 'Continent' },
    { label: 'Incontinent', value: 'Incontinent' }
  ];

  consistencyRangeOption: any[] = [
    { label: "1", value: '1' },
    { label: "2", value: '2' },
    { label: "3", value: '3' },
    { label: "4", value: '4' },
    { label: "5", value: '5' },
    { label: "6", value: '6' },
    { label: "7", value: '7' }
  ];
  stLstErrorAndWarning: any;
  result: any;
  ChartName: any;



  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private _bowelChartServices: BowelChartService,
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
      this.BowelChartFormData = <any>{};

      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }

  }


  ngOnInit(): void {
    this.BowelChartFormData.DateAndTime = new Date()
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
    this.optionService.getstLstErrorAndWarning().subscribe((data) => {
      this.stLstErrorAndWarning = data;
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.BowelChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });
    const collectionNames = ['BowelAction', 'Amount', 'Interventions'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.BowelChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstBowelAction = responses[0];
      this.lstAmount = responses[1];
      this.lstInterventions = responses[2];
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


  openAndClose() {
    if (this.BowelChartFormData.CareGiven == 'Yes') {
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
    if (this.BowelChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.BowelChartFormData.CareGiven == 'No' && this.BowelChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.BowelChartFormData.userId = this.userId;
      this.BowelChartFormData.StartedBy = this.loginId;
      this.BowelChartFormData.LastEnteredBy = this.loginId;
      this.BowelChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.BowelChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.BowelChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.BowelChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.BowelChartFormData.DateAndTime = parsedDate;
        }
        this.BowelChartFormData.DateAndTime =
          this.datePipe.transform(
            this.BowelChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        bowelChartData: this.BowelChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._bowelChartServices
        .AddInsertUpdateBowelChartForm(objectBody)
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
      ChartMasterId: ChartTypes.BowelChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;
  }

  ResetModel() {
    this.isEditable = true;
    this.BowelChartFormData = <any>{};
    this.StatementType = 'Insert';
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
            this.BowelChartsLst = tdata;
            if (this.BowelChartsLst.length < 3 || (((this.BowelChartsLst.length) * (this.pageNumber + 1)) >= this.BowelChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }

          } else {
            this.BowelChartsLst = [];
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
    if (this.preSelectedChartData.selectedChartID) {
      this.BowelChartFormData = <any>{};
      this.BowelChartFormData.bowelChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }





}
