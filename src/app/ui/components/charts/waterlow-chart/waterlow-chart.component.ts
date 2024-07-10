import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { WaterlowChartService } from './waterlow-chart.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-waterlow-chart',
  templateUrl: './waterlow-chart.component.html',
  styleUrls: ['./waterlow-chart.component.scss']
})
export class WaterlowChartComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    inputFieldsCheck: boolean;
    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    WaterlowChartData: any = <any>{};
    StatementType: string = null;
    CareGivenCheck:boolean = false;
    ReasonCheck: boolean = false;
    messages: Message[] | undefined;
    NutritionScoreValue: number = 0;
    WaterlowScoreValue: number = 0;
    ClassificationValue: string = 'Normal';

    LstBMIValue:any[] = [];
    LstContinence: any[] = [];
    LstSkinType: any[] = [];
    LstMobility: any[] = [];
    LstAge: any[] = [];
    LstMalnutritionScreening: any[] = [];
    LstSpecialRisksTissue:any[] = [];
    LstSpecialRisksNeurological: any[] = [];
    LstSpecialRisksMajorSurgeryOrTrauma:any[] = [];
    LstSpecialRisksMedication: any[] = [];

    //Static Options
    stLstYesNoOptions: any[] = [];
    stLstReason:any[]=[];

    //for carousel
    WaterlowChartsLst: any[] = [];
    pageNumber: number = 0;
    pageSize: number = 3;
    responsiveOptions: any[] | undefined;
    rightBtnCheck: boolean = false;
    isShowStrikeThroughPopup:boolean = false;
    StrikeThroughData:any = <any>{};
    stLstErrorAndWarning: any = <any>{};
    result:any = <any>{};
    ChartName:string;

    SexOption: any[] = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
    ];


  constructor(private _OptionService: OptionService,
    private _ConstantServices: ConstantsService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private _WaterlowService: WaterlowChartService,
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
          this.WaterlowChartData = <any>{};
          this.GetWaterlowChartDetails(this.preSelectedChartData.selectedChartID);
          this.StatementType = 'Update';
      } else {
          this.ResetModel();
      }
  }

  ngOnInit(): void {

    this.messages = [
      { severity: 'info', detail: 'If >2 refer for nutrition assessment/intervention' }
  ];

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
            this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.WaterlowChart);
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
            'BMIValueOptions',
            'ContinenceOptions',
            'SkinTypeOptions',
            'MobilityOptions',
            'AgeOptions',
            'MalnutritionScreeningOptions',
            'SpecialRisksTissueOptions',
            'SpecialRisksNeurologicalOptions',
            'SpecialRisksMajorSurgeryOrTraumaOptions',
            'SpecialRisksMedicationOptions'
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.WaterlowChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.LstBMIValue = responses[0];
            this.LstContinence = responses[1];
            this.LstSkinType = responses[2];
            this.LstMobility = responses[3];
            this.LstAge = responses[4];
            this.LstMalnutritionScreening = responses[5];
            this.LstSpecialRisksTissue = responses[6];
            this.LstSpecialRisksNeurological = responses[7];
            this.LstSpecialRisksMajorSurgeryOrTrauma = responses[8];
            this.LstSpecialRisksMedication = responses[9];
        });

        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.WaterlowChartData = <any>{};
            this.GetWaterlowChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
        
    this.WaterlowChartData.DateAndTime = new Date();
  }

  openAndClose() {
    if (this.WaterlowChartData.CareGivenOptions == "Yes") {
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

GetWaterlowChartDetails(chartId: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._WaterlowService
      .GetWaterlowChartDetails(chartId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.WaterlowChartData = tdata;
                  this.openAndClose();
                  this.WaterlowChartData.DateAndTime = this._DatePipe.transform(
                      this.WaterlowChartData.DateAndTime,
                      'dd-MM-yyyy HH:mm'
                  );
              } else {
                  this.WaterlowChartData = {};
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
      this.WaterlowChartData = <any>{};
      this.WaterlowChartData.activitiesChartId =
          this.preSelectedChartData.selectedChartID;
  }
}

Save() {
  if(this.WaterlowChartData.CareGivenOptions == null) {
      this.CareGivenCheck = true;
  }
  else if(this.WaterlowChartData.CareGivenOptions != null) {
      this.CareGivenCheck = false;
      if(this.WaterlowChartData.CareGivenOptions == 'Yes') {
          this.ReasonCheck = false;
      }
      else{
          if(this.WaterlowChartData.Reason == null) {
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
    this.WaterlowChartData.userId = this.userId;
    this.WaterlowChartData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.WaterlowChartData.StartedBy = this.loginId;
    this.WaterlowChartData.LastEnteredBy = this.loginId;

    if (this.WaterlowChartData.DateAndTime) {
        if (
            this.StatementType == 'Update' &&
            typeof this.WaterlowChartData.DateAndTime === 'string'
        ) {
            //Pare dateTime
            const dateParts =
                this.WaterlowChartData.DateAndTime.split(/[- :]/);
            const parsedDate = new Date(
                +dateParts[2],
                dateParts[1] - 1,
                +dateParts[0],
                +dateParts[3],
                +dateParts[4]
            );
            this.WaterlowChartData.DateAndTime = parsedDate;
        }
        this.WaterlowChartData.DateAndTime =
                this._DatePipe.transform(
                    this.WaterlowChartData.DateAndTime,
                    'yyyy-MM-ddTHH:mm'
                  );
    }

    const objectBody: any = {
        StatementType: this.StatementType,
        WaterlowChartDetail: this.WaterlowChartData,
    };
    
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._WaterlowService
        .InsertUpdateWaterlowChart(objectBody)
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
  this.WaterlowChartData = <any>{};
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
                  this.WaterlowChartsLst = tdata;
                  if (this.WaterlowChartsLst.length < 3 || (((this.WaterlowChartsLst.length) * (this.pageNumber + 1)) >= this.WaterlowChartsLst[0].countRecords)) {
                      this.rightBtnCheck = true;
                  }
                  else {
                      this.rightBtnCheck = false;
                  }
              } else {
                  this.WaterlowChartsLst = [];
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
      ChartMasterId:ChartTypes.WaterlowChart,
      ChartId: chartId,
      ModifiedBy:this.loginId,
   };
   this.isShowStrikeThroughPopup = true;
}

Changes(value: boolean) {
  this.isShowStrikeThroughPopup = value;
  this.chartOnChange()
}
}
