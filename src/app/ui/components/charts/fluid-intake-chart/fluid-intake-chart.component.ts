import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AlertTypes, ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { FluidCombinedChartService } from '../fluid-combined-chart/fluid-combined-chart.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { FluidIntakeChartService } from './fluid-intake-chart.service';

@Component({
  selector: 'app-fluid-intake-chart',
  templateUrl: './fluid-intake-chart.component.html',
  styleUrls: ['./fluid-intake-chart.component.scss']
})
export class FluidIntakeChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  customDateFormat = CustomDateFormat;
  inputFields: boolean;
  reason: boolean = false;
  careGiven: boolean = false;
  FluidIntakeChartFormData: any = <any>{};
  isEditable: boolean;
  loginId: any;
  residentAdmissionInfoId: any;
  userId: any;
  StatementType: string = null;
  CareGivenCheck: boolean = false;
  ReasonCheck: boolean = false;
  lstFluidIntake: any[] = [];
  amount:boolean=false;
  typeOfFluid:boolean=false;

  //Static Options
  stLstYesNoOptions: any[] = [];
  stLstAttendanceOptions: any[] = [];

  //for carousel
  FluidIntakeChartsLst: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 3;
  responsiveOptions: any[] | undefined;
  rightBtnCheck: boolean = false;
  isShowStrikeThroughPopup: boolean = false;
  StrikeThroughData: any = <any>{};
  stLstReason: any[] = [];
  stLstErrorAndWarning: any = <any>{};
  result: any = <any>{};
  ChartName: string;

  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private _fluidIntakeChart: FluidIntakeChartService,
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
      this.FluidIntakeChartFormData = <any>{};
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
      this.getChartDataById(this.preSelectedChartData.chartMasterId,this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

    }

  }

  ngOnInit(): void {
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
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.FluidIntakeChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });

    const collectionNames = ['fluidIntake'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.FluidIntakeChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstFluidIntake = responses[0];
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

    if (this.preSelectedChartData.selectedChartID != null) {
      this.FluidIntakeChartFormData = <any>{};
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }

    this.FluidIntakeChartFormData.DateAndTime = new Date();

  }


  Save() {
    this.reason = false;
    this.careGiven = false;
    this.amount=false;
    this.typeOfFluid=false;
    if (this.FluidIntakeChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.FluidIntakeChartFormData.CareGiven == 'No' && this.FluidIntakeChartFormData.Reason == null) {
      this.reason = true;
    }else if(this.FluidIntakeChartFormData.amount==null&&this.FluidIntakeChartFormData.careGiven=='Yes'){
      this.amount=true;
    }else if(this.FluidIntakeChartFormData.typesOfFluid==null&&this.FluidIntakeChartFormData.careGiven=='Yes'){
      this.typeOfFluid=true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.FluidIntakeChartFormData.userId = this.userId;
      this.FluidIntakeChartFormData.StartedBy = this.loginId;
      this.FluidIntakeChartFormData.LastEnteredBy = this.loginId;
      this.FluidIntakeChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.FluidIntakeChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.FluidIntakeChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.FluidIntakeChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.FluidIntakeChartFormData.DateAndTime = parsedDate;
        }
        this.FluidIntakeChartFormData.DateAndTime =
          this.datePipe.transform(
            this.FluidIntakeChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        fluidIntakeChart: this.FluidIntakeChartFormData,
        alertMasterId: AlertTypes.FluidIntakeAlert,
        chartMasterId: ChartTypes.FluidIntakeChart
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._fluidIntakeChart
        .AddInsertUpdateFluidIntakeChartForm(objectBody)
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
            this.FluidIntakeChartsLst = tdata;
            if (this.FluidIntakeChartsLst.length < 3 || (((this.FluidIntakeChartsLst.length) * (this.pageNumber + 1)) >= this.FluidIntakeChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }
          } else {
            this.FluidIntakeChartsLst = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
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

  showPopup(chartId) {
    this.StrikeThroughData = {
      ChartMasterId: ChartTypes.FluidIntakeChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;
  }

  ResetModel() {
    this.isEditable = true;
    this.FluidIntakeChartFormData = <any>{};
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
  openAndClose() {
    if (this.FluidIntakeChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }
  chartOnChange() {
    this.getChartDataById(this.preSelectedChartData.chartMasterId,this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

  }

  ClearAllfeilds() {
    if (this.preSelectedChartData.chartMasterId) {
      this.FluidIntakeChartFormData = <any>{};
      this.FluidIntakeChartFormData.fluidIntakeChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }


}
