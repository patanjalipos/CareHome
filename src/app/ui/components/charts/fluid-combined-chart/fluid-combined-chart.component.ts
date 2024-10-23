import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BloodGlucoseChartService } from '../blood-glucose-chart/blood-glucose-chart.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { FluidCombinedChartService } from './fluid-combined-chart.service';
import { log } from 'console';
@Component({
  selector: 'app-fluid-combined-chart',
  templateUrl: './fluid-combined-chart.component.html',
  styleUrls: ['./fluid-combined-chart.component.scss']
})
export class FluidCombinedChartComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  loginId: string;
  userId: any;
  residentAdmissionInfoId: any;

  fluidCombinedChartFormData: any = <any>{};
  stLstYesNoOptions: any[];
  stLstAttendanceOptions: any;
  isEditable: boolean;
  StatementType: string;
  inputFields: boolean;
  reason: boolean = false;
  careGiven: boolean = false;
  lstFluidChart: any[] = [];
  lstFluidInputType: any[] = [];
  lstFluidOutputType:any[]=[];
  lstContinenceLevel:any[]=[];
  lstFluidOutputMethod:any[]=[];
  lstPadChangeReason:any[]=[];
  lstCatheterChecks:any[]=[];
  lstPadFluidOutput:any[]=[];
  rangeOptionApproximation: any[] = [];
  rangeOptionThickener:any[]=[];


  //for carousel
  fluidCombinedChartsLst: any[] = [];
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
    private _fluidCombinedServices: FluidCombinedChartService,
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
      this.fluidCombinedChartFormData = <any>{};
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
      this.getChartDataById(this.preSelectedChartData.chartMasterId,this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

    }

  }

  ngOnInit(): void {
    this.fluidCombinedChartFormData.DateAndTime = new Date()
    this.userId = this.preSelectedChartData.userId;
    this.residentAdmissionInfoId =
      this.preSelectedChartData.residentAdmissionInfoId;

    this.rangeOptionApproximation = [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];
    
    this.rangeOptionThickener = [
      { label: 'Yes', value: 'Yes' },
      { label: 'No', value: 'No' }
    ];
    this.optionService.getstLstYesNoOptions().subscribe((data) => {
      this.stLstYesNoOptions = data;
    });

    this.optionService.getstLstReason().subscribe((data) => {
      this.stLstReason = data;
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
    this.optionService.getstLstErrorAndWarning().subscribe((data) => {
      this.stLstErrorAndWarning = data;
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.FluidCombinedChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });
    const collectionNames = ['fluidChart', 'fluidInputType','fluidOutputType','continenceLevel','fluidOutputMethod','catheterChecks','padChangeReason','padFluidOutput'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.FluidCombinedChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstFluidChart = responses[0];
      this.lstFluidInputType = responses[1];
      this.lstFluidOutputType=responses[2];
      this.lstContinenceLevel=responses[3];
      this.lstFluidOutputMethod=responses[4];
      this.lstCatheterChecks=responses[5];
      this.lstPadChangeReason=responses[6];
      this.lstPadFluidOutput=responses[7];
    });
  }

  ClearAllfeilds() {
    if (this.preSelectedChartData.chartMasterId) {
      this.fluidCombinedChartFormData = <any>{};
      this.fluidCombinedChartFormData.fluidCombinedChartId =
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
    if (this.fluidCombinedChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.fluidCombinedChartFormData.CareGiven == 'No' && this.fluidCombinedChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.fluidCombinedChartFormData.userId = this.userId;
      this.fluidCombinedChartFormData.StartedBy = this.loginId;
      this.fluidCombinedChartFormData.LastEnteredBy = this.loginId;
      this.fluidCombinedChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.fluidCombinedChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.fluidCombinedChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.fluidCombinedChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.fluidCombinedChartFormData.DateAndTime = parsedDate;
        }
        this.fluidCombinedChartFormData.DateAndTime =
          this.datePipe.transform(
            this.fluidCombinedChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        fluidCombinedChartData: this.fluidCombinedChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._fluidCombinedServices
        .AddInsertUpdateFluidCombinedChartForm(objectBody)
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
          var tdata = data.actionResult.result;
            tdata = tdata ? tdata : [];
            this.fluidCombinedChartsLst = tdata;
            if (this.fluidCombinedChartsLst.length < 3 || (((this.fluidCombinedChartsLst.length) * (this.pageNumber + 1)) >= this.fluidCombinedChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }

          } else {
            this.fluidCombinedChartsLst = [];
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
      ChartMasterId: ChartTypes.FluidCombinedChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;
  }

  openAndClose() {
    if (this.fluidCombinedChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.fluidCombinedChartFormData = <any>{};
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
    this.getChartDataById(this.preSelectedChartData.chartMasterId,this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

  }


}
