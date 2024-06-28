import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { WeightChartService } from './weight-chart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weight-chart',
  templateUrl: './weight-chart.component.html',
  styleUrls: ['./weight-chart.component.scss']
})
export class WeightChartComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    inputFieldsCheck: boolean;
    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    WeightChartData: any = <any>{};
    StatementType: string = null;
    CareGivenCheck:boolean = false;
    ReasonCheck: boolean = false;
    ZeroValueCheck: boolean = false;
    BMIValueCHeck: boolean = false;
    ButtonCheck: boolean = true;

    LstScaleTypes: any[] = [];

    //Static Options
    stLstYesNoOptions: any[] = [];
    stLstReason:any[]=[];

    //for carousel
    WeightChartsLst: any[] = [];
    pageNumber: number = 0;
    pageSize: number = 3;
    responsiveOptions: any[] | undefined;
    rightBtnCheck: boolean = false;
    isShowStrikeThroughPopup:boolean = false;
    StrikeThroughData:any = <any>{};
    stLstErrorAndWarning: any = <any>{};
    result:any = <any>{};
    ChartName:string;

  constructor(private _OptionService: OptionService,
    private _ConstantServices: ConstantsService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private _WeightService: WeightChartService,
    private _DatePipe: DatePipe,
    private _route: ActivatedRoute) {
    super();
    this.loginId = localStorage.getItem('userId');
    this.unsubscribe.add = this._route.queryParams.subscribe((params) => {
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
        this.WeightChartData = <any>{};
        this.GetWeightChartDetails(this.preSelectedChartData.selectedChartID);
        this.StatementType = 'Update';
    } else {
        this.ResetModel();
    }
}

  ngOnInit(): void {
    this.userId = this.preSelectedChartData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedChartData.residentAdmissionInfoId;

        this._OptionService.getstLstYesNoOptions().subscribe((data) => {
            this.stLstYesNoOptions = data;
        });
        this._OptionService.getstLstReason().subscribe((data) => {
            this.stLstReason = data;
        });
        this._OptionService.getstLstErrorAndWarning().subscribe((data) => {
            this.stLstErrorAndWarning = data;
            this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.WeightChart);
            this.ChartName = this.result["ChartName"];
            this._ConstantServices.ActiveMenuName = this.ChartName;
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
        const collectionNames = [
            'ScaleTypesOptions'
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.WeightChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.LstScaleTypes = responses[0];
        });

        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.WeightChartData = <any>{};
            this.GetWeightChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
        
    this.WeightChartData.DateAndTime = new Date();
  }

  openAndClose() {
    if (this.WeightChartData.CareGivenOptions == "Yes") {
        this.inputFieldsCheck = true;
    } else {
        this.inputFieldsCheck = false;
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

GetWeightChartDetails(chartId: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._WeightService
      .GetWeightChartDetails(chartId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.WeightChartData = tdata;
                  this.openAndClose();
                  this.WeightChartData.DateAndTime = this._DatePipe.transform(
                      this.WeightChartData.DateAndTime,
                      'dd-MM-yyyy HH:mm'
                  );
              } else {
                  this.WeightChartData = {};
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

ClearAllfeilds() {
  if (this.preSelectedChartData.selectedChartID) {
      this.WeightChartData = <any>{};
      this.WeightChartData.activitiesChartId =
          this.preSelectedChartData.selectedChartID;
  }
}

Save() {
    if(this.WeightChartData.CareGivenOptions == null) {
        this.CareGivenCheck = true;
    }
    else if(this.WeightChartData.CareGivenOptions != null) {
        this.CareGivenCheck = false;
        if(this.WeightChartData.CareGivenOptions == 'Yes') {
            this.ReasonCheck = false;
        }
        else{
            if(this.WeightChartData.Reason == null) {
                this.ReasonCheck = true;
            }
            else {
                this.ReasonCheck = false;
            }
    }
}
  if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null && this.CareGivenCheck == false && this.ReasonCheck == false
  ) {
      this.WeightChartData.userId = this.userId;
      this.WeightChartData.residentAdmissionInfoId =
          this.residentAdmissionInfoId;
      this.WeightChartData.StartedBy = this.loginId;
      this.WeightChartData.LastEnteredBy = this.loginId;

      if (this.WeightChartData.DateAndTime) {
          if (
              this.StatementType == 'Update' &&
              typeof this.WeightChartData.DateAndTime === 'string'
          ) {
              //Pare dateTime
              const dateParts =
                  this.WeightChartData.DateAndTime.split(/[- :]/);
              const parsedDate = new Date(
                  +dateParts[2],
                  dateParts[1] - 1,
                  +dateParts[0],
                  +dateParts[3],
                  +dateParts[4]
              );
              this.WeightChartData.DateAndTime = parsedDate;
          }
          this.WeightChartData.DateAndTime =
                  this._DatePipe.transform(
                      this.WeightChartData.DateAndTime,
                      'yyyy-MM-ddTHH:mm'
                    );
      }

      const objectBody: any = {
          StatementType: this.StatementType,
          WeightChartDetail: this.WeightChartData,
      };
      
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._WeightService
          .InsertUpdateWeightChart(objectBody)
          .subscribe({
              next: (data) => {
                  this._UtilityService.hideSpinner();
                  if (data.actionResult.success == true) {
                      this.EmitUpdateForm.emit(true);
                      //   this.ResetModel();
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
      this._UtilityService.showWarningAlert(
          this.ChartName + " " + this.stLstErrorAndWarning.Warnings.Common.DetailMissMessage
      );
  }
}

ResetModel() {
  this.isEditable = true;
  this.WeightChartData = <any>{};
  this.StatementType = 'Insert';
}

SaveAsPDF() { }

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
                  this.WeightChartsLst = tdata;
                  if (this.WeightChartsLst.length < 3 || (((this.WeightChartsLst.length) * (this.pageNumber + 1)) >= this.WeightChartsLst[0].countRecords)) {
                      this.rightBtnCheck = true;
                  }
                  else {
                      this.rightBtnCheck = false;
                  }
              } else {
                  this.WeightChartsLst = [];
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
      ChartMasterId:ChartTypes.WeightChart,
      ChartId: chartId,
      ModifiedBy:this.loginId,
   };
   this.isShowStrikeThroughPopup = true;
}

Changes(value: boolean) {
  this.isShowStrikeThroughPopup = value;
  this.chartOnChange()
}

CalculateBMI(value: number) {
    if(value == 1) {
        this.BMIValueCHeck = true;
    }

    if((this.WeightChartData.Weight != null && (this.WeightChartData.Height != null && this.WeightChartData.Height != 0))) {
        this.ButtonCheck = false;
        this.ZeroValueCheck = false;
    }
    else if(this.WeightChartData.Weight == null || this.WeightChartData.Height == null || this.WeightChartData.Height == 0) {
        this.ButtonCheck = true;
        this.ZeroValueCheck = true;
    }

    if(this.BMIValueCHeck) {
        if(this.WeightChartData.Height == 0 || this.WeightChartData.Height == null || this.WeightChartData.Weight == null) {
            this.ZeroValueCheck = true;
            this.BMIValueCHeck = false;
            this.ButtonCheck = true;
            }
        else{
            this.ZeroValueCheck = false;
            this.ButtonCheck = false;
            this.BMIValueCHeck = true;
            this.WeightChartData.BMI = this.WeightChartData.Weight/(Math.pow(this.WeightChartData.Height,2));
            }
    }
}

}
