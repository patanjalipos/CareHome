import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { FoodIntakeChartService } from './food-intake-chart.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { UserService } from 'src/app/ui/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { AppComponentBase } from 'src/app/app-component-base';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-food-intake-chart',
  templateUrl: './food-intake-chart.component.html',
  styleUrls: ['./food-intake-chart.component.scss']
})
export class FoodIntakeChartComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  loginId: string;
  userId: any;
  residentAdmissionInfoId: any;
  lstMealSize: any[] = [];
  lstAmountOfFoodEaten: any[] = [];

  foodIntakeChartFormData: any = <any>{};
  stLstYesNoOptions: any[];
  isEditable: boolean;
  StatementType: string;
  inputFields: boolean;
  reason: boolean = false;
  careGiven: boolean = false;

  //for carousel
  foodIntakeChartsLst: any[] = [];
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
    private _foodIntakeServices: FoodIntakeChartService,
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
      this.foodIntakeChartFormData = <any>{};
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
      this.getChartDataById(this.preSelectedChartData.chartMasterId,this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

    }

  }

  ngOnInit(): void {
    this.foodIntakeChartFormData.DateAndTime = new Date()
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
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.FoodIntakeChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });
    const collectionNames = ['mealSize', 'amountOfFoodEaten'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.FoodIntakeChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstMealSize = responses[0];
      this.lstAmountOfFoodEaten = responses[1];
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

  ClearAllfeilds() {
    if (this.preSelectedChartData.chartMasterId) {
      this.foodIntakeChartFormData = <any>{};
      this.foodIntakeChartFormData.foodIntakeChartId =
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
    if (this.foodIntakeChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.foodIntakeChartFormData.CareGiven == 'No' && this.foodIntakeChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.foodIntakeChartFormData.userId = this.userId;
      this.foodIntakeChartFormData.StartedBy = this.loginId;
      this.foodIntakeChartFormData.LastEnteredBy = this.loginId;
      this.foodIntakeChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.foodIntakeChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.foodIntakeChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.foodIntakeChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.foodIntakeChartFormData.DateAndTime = parsedDate;
        }
        this.foodIntakeChartFormData.DateAndTime =
          this.datePipe.transform(
            this.foodIntakeChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        foodIntakeChart: this.foodIntakeChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._foodIntakeServices
        .AddInsertUpdateFoodIntakeChartForm(objectBody)
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
            this.foodIntakeChartsLst = tdata;
            if (this.foodIntakeChartsLst.length < 3 || (((this.foodIntakeChartsLst.length) * (this.pageNumber + 1)) >= this.foodIntakeChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }


          } else {
            this.foodIntakeChartsLst = [];
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
      ChartMasterId: ChartTypes.FoodIntakeChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;

  }

  openAndClose() {
    if (this.foodIntakeChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.foodIntakeChartFormData = <any>{};
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
