import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { SightingChartService } from './sighting-chart.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-sighting-chart',
  templateUrl: './sighting-chart.component.html',
  styleUrls: ['./sighting-chart.component.scss']
})
export class SightingChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    inputFieldsCheck: boolean;
    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    SightingChartData: any = <any>{};
    StatementType: string = null;
    CareGivenCheck:boolean = false;
    ReasonCheck: boolean = false;

    LstSightingType: any[] = [];
    LstResidentState: any[] = [];

    //Static Options
    stLstYesNoOptions: any[] = [];

    //for carousel
    SightingChartLst: any[] = [];
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
    private datePipe: DatePipe,
    private _SightingService: SightingChartService) {
    super();
    this.loginId = localStorage.getItem('userId');
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedChartData.isEditable;

    if (this.preSelectedChartData.selectedChartID != null) {
        this.SightingChartData = <any>{};
        this.GetSightingChartDetails(this.preSelectedChartData.selectedChartID);
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
            this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.SightingChart);
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
            'SightingTypeOptions',
            'ResidentStateOptions'
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.SightingChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.LstSightingType = responses[0];
            this.LstResidentState = responses[1];
        });

        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.SightingChartData = <any>{};
            this.GetSightingChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
        this.SightingChartData.DateAndTime = new Date();
  }

  openAndClose() {
    if (this.SightingChartData.CareGivenOptions == "Yes") {
        this.inputFieldsCheck = true;
    } else {
        this.inputFieldsCheck = false;
    }
}

ChangeState() {
    this.LstResidentState.forEach(ele => {
        if(ele.optionId == this.SightingChartData.ResidentStateOption) {
            if(ele.optionName == 'Other') {
                this.SightingChartData.OtherCheck = true;
            }
            else {
                this.SightingChartData.OtherCheck = false;
            }
        }
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

GetSightingChartDetails(chartId: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._SightingService
      .GetSightingChartDetails(chartId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                var tdata = data.actionResult.result;
                  tdata = tdata ? tdata : {};
                  this.SightingChartData = tdata;
                  this.openAndClose();
                  this.SightingChartData.DateAndTime = this.datePipe.transform(
                      this.SightingChartData.DateAndTime,
                      'dd-MM-yyyy HH:mm'
                  );
              } else {
                  this.SightingChartData = {};
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
      this.SightingChartData = <any>{};
      this.SightingChartData.SightingChartId =
          this.preSelectedChartData.selectedChartID;
  }
}

Save() {
  if(this.SightingChartData.CareGivenOptions == null) {
      this.CareGivenCheck = true;
  }
  else if(this.SightingChartData.CareGivenOptions != null) {
      this.CareGivenCheck = false;
      if(this.SightingChartData.CareGivenOptions == 'Yes') {
          this.ReasonCheck = false;
      }
      else{
          if(this.SightingChartData.Reason == null) {
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
      this.SightingChartData.userId = this.userId;
      this.SightingChartData.residentAdmissionInfoId =
          this.residentAdmissionInfoId;
      this.SightingChartData.StartedBy = this.loginId;
      this.SightingChartData.LastEnteredBy = this.loginId;

      if (this.SightingChartData.DateAndTime) {
          if (
              this.StatementType == 'Update' &&
              typeof this.SightingChartData.DateAndTime === 'string'
          ) {
              //Pare dateTime
              const dateParts =
                  this.SightingChartData.DateAndTime.split(/[- :]/);
              const parsedDate = new Date(
                  +dateParts[2],
                  dateParts[1] - 1,
                  +dateParts[0],
                  +dateParts[3],
                  +dateParts[4]
              );
              this.SightingChartData.DateAndTime = parsedDate;
          }
          this.SightingChartData.DateAndTime =
              this.datePipe.transform(
                  this.SightingChartData.DateAndTime,
                  'yyyy-MM-ddTHH:mm'
              );
      }

      const objectBody: any = {
          StatementType: this.StatementType,
          SightingChartDetail: this.SightingChartData,
      };
      console.log(objectBody);
      
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._SightingService
          .InsertUpdateSightingChart(objectBody)
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
  this.SightingChartData = <any>{};
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
                  this.SightingChartLst = tdata;
                  if (this.SightingChartLst.length < 3 || (((this.SightingChartLst.length) * (this.pageNumber + 1)) >= this.SightingChartLst[0].countRecords)) {
                      this.rightBtnCheck = true;
                  }
                  else {
                      this.rightBtnCheck = false;
                  }
              } else {
                  this.SightingChartLst = [];
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
      ChartMasterId:ChartTypes.SightingChart,
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
