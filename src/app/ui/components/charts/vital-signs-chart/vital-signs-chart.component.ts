import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { VitalSignsChartService } from './vital-signs-chart.service';
import { DatePipe } from '@angular/common';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-vital-signs-chart',
  templateUrl: './vital-signs-chart.component.html',
  styleUrls: ['./vital-signs-chart.component.scss']
})
export class VitalSignsChartComponent extends AppComponentBase implements OnInit {
    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    inputFieldsCheck: boolean;
    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    VitalSignsChartData: any = <any>{};
    StatementType: string = null;
    CareGivenCheck:boolean = false;
    ReasonCheck: boolean = false;

    LstResidentPosition: any[] = [];
    LstPulseSiteOfMeasurement: any[] = [];
    LstRhythm: any[] = [];
    LstAmplitudeOrVolume: any[] = [];
    LstOxygenSiteOfMeasurement: any[] = [];

    //Static Options
    stLstYesNoOptions: any[] = [];

    //for carousel
    VitalSignsChartLst: any[] = [];
    pageNumber: number = 0;
    pageSize: number = 3;
    responsiveOptions: any[] | undefined;
    rightBtnCheck: boolean = false;
    isShowStrikeThroughPopup:boolean = false;
    StrikeThroughData:any = <any>{};
    stLstReason:any[]=[];
    stLstErrorAndWarning: any = <any>{};
    result:any = <any>{};
    ChartName:string;

  constructor(private optionService: OptionService,
    private _ConstantServices: ConstantsService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private _VitalService: VitalSignsChartService,
    private datePipe: DatePipe) {
    super();
    
    this.loginId = localStorage.getItem('userId');
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedChartData.isEditable;

    if (this.preSelectedChartData.selectedChartID != null) {
        this.VitalSignsChartData = <any>{};
        this.GetVitalSignsChartDetails(this.preSelectedChartData.selectedChartID);
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
            this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.VitalSignsChart);
            this.ChartName = this.result["ChartName"];
            this._ConstantServices.ActiveMenuName = this.ChartName;
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
        const collectionNames = [
            'ResidentPositionOptions',
            'PulseSiteOfMeasurementOptions',
            'RhythmOptions',
            'AmplitudeOrVolumeOptions',
            'OxygenSiteOfMeasurementOptions',
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.VitalSignsChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.LstResidentPosition = responses[0];
            this.LstPulseSiteOfMeasurement = responses[1];
            this.LstRhythm = responses[2];
            this.LstAmplitudeOrVolume = responses[3];
            this.LstOxygenSiteOfMeasurement = responses[4];
        });

        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.VitalSignsChartData = <any>{};
            this.GetVitalSignsChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
        this.VitalSignsChartData.DateAndTime = new Date();
  }

  openAndClose() {
    if (this.VitalSignsChartData.CareGivenOptions == "Yes") {
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

GetVitalSignsChartDetails(chartId: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._VitalService
      .GetVitalSignsChartDetails(chartId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                var tdata = data.actionResult.result;
                  tdata = tdata ? tdata : {};
                  this.VitalSignsChartData = tdata;
                  this.openAndClose();
                  this.VitalSignsChartData.DateAndTime = this.datePipe.transform(
                      this.VitalSignsChartData.DateAndTime,
                      'dd-MM-yyyy HH:mm'
                  );
              } else {
                  this.VitalSignsChartData = {};
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

ClearAllfeilds() {
  if (this.preSelectedChartData.chartMasterId) {
      this.VitalSignsChartData = <any>{};
      this.VitalSignsChartData.VitalSignsChartId =
          this.preSelectedChartData.selectedChartID;
  }
}

Save() {
  if(this.VitalSignsChartData.CareGivenOptions == null) {
      this.CareGivenCheck = true;
  }
  else if(this.VitalSignsChartData.CareGivenOptions != null) {
      this.CareGivenCheck = false;
      if(this.VitalSignsChartData.CareGivenOptions == 'Yes') {
          this.ReasonCheck = false;
      }
      else{
          if(this.VitalSignsChartData.Reason == null) {
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
      this.VitalSignsChartData.userId = this.userId;
      this.VitalSignsChartData.residentAdmissionInfoId =
          this.residentAdmissionInfoId;
      this.VitalSignsChartData.StartedBy = this.loginId;
      this.VitalSignsChartData.LastEnteredBy = this.loginId;

      if (this.VitalSignsChartData.DateAndTime) {
          if (
              this.StatementType == 'Update' &&
              typeof this.VitalSignsChartData.DateAndTime === 'string'
          ) {
              //Pare dateTime
              const dateParts =
                  this.VitalSignsChartData.DateAndTime.split(/[- :]/);
              const parsedDate = new Date(
                  +dateParts[2],
                  dateParts[1] - 1,
                  +dateParts[0],
                  +dateParts[3],
                  +dateParts[4]
              );
              this.VitalSignsChartData.DateAndTime = parsedDate;
          }
          this.VitalSignsChartData.DateAndTime =
              this.datePipe.transform(
                  this.VitalSignsChartData.DateAndTime,
                  'yyyy-MM-ddTHH:mm'
              );
      }

      const objectBody: any = {
          StatementType: this.StatementType,
          VitalSignsChartDetail: this.VitalSignsChartData,
      };
      console.log(objectBody);
      
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._VitalService
          .InsertUpdateVitalSignsChart(objectBody)
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
  this.VitalSignsChartData = <any>{};
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
    this.getChartDataById(this.preSelectedChartData.chartMasterId,this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

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
                  this.VitalSignsChartLst = tdata;
                  if (this.VitalSignsChartLst.length < 3 || (((this.VitalSignsChartLst.length) * (this.pageNumber + 1)) >= this.VitalSignsChartLst[0].countRecords)) {
                      this.rightBtnCheck = true;
                  }
                  else {
                      this.rightBtnCheck = false;
                  }
              } else {
                  this.VitalSignsChartLst = [];
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
      ChartMasterId:ChartTypes.VitalSignsChart,
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
