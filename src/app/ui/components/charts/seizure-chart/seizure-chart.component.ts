import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { SeizureChartService } from './seizure-chart.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-seizure-chart',
  templateUrl: './seizure-chart.component.html',
  styleUrls: ['./seizure-chart.component.scss']
})
export class SeizureChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  inputFieldsCheck: boolean;
  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  SeizureChartData: any = <any>{};
  StatementType: string = null;
  CareGivenCheck:boolean = false;
  ReasonCheck: boolean = false;
  messages: Message[] | undefined;
  messages1: Message[] | undefined;
  messages2: Message[] | undefined;
  messages3: Message[] | undefined;
  messages4: Message[] | undefined;

  LstPossibleTriggers: any[] = [];
  LstSeizureLength: any[] = [];
  LstSeizureType: any[] = [];
  LstSpecificSeizureType: any[] = [];
  LstSeizureFeeling: any[] = [];
  LstRecoverTime: any[] = [];

  //Static Options
  stLstYesNoOptions: any[] = [];

  //for carousel
  SeizureChartLst: any[] = [];
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
    private _SeizureService: SeizureChartService) {
    super();
    this.loginId = localStorage.getItem('userId');
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedChartData.isEditable;

    if (this.preSelectedChartData.selectedChartID != null) {
        this.SeizureChartData = <any>{};
        this.GetSeizureChartDetails(this.preSelectedChartData.selectedChartID);
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
            this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.SeizureChart);
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
            'PossibleTriggersOptions',
            'SeizureLengthOptions',
            'SeizureTypeOptions',
            'SpecificSeizureTypeOptions',
            'SeizureFeelingOptions',
            'RecoverTimeOptions'
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.SeizureChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.LstPossibleTriggers = responses[0];
            this.LstSeizureLength = responses[1];
            this.LstSeizureType = responses[2];
            this.LstSpecificSeizureType = responses[3];
            this.LstSeizureFeeling = responses[4];
            this.LstRecoverTime = responses[5];
        });

        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.SeizureChartData = <any>{};
            this.GetSeizureChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
        this.SeizureChartData.DateAndTime = new Date();
  }

  openAndClose() {
    if (this.SeizureChartData.CareGivenOptions == "Yes") {
        this.inputFieldsCheck = true;
    } else {
        this.inputFieldsCheck = false;
    }
}

addMessages() {
    this.messages = [
        { severity: 'secondary', summary: 'Select all that apply' }
    ];
}

addMessages1() {
    if(this.SeizureChartData.SeizureTypeOption == "668cc0fc155e8339ed7b6813") {
    this.messages1 = [
        { severity: 'secondary', summary: 'Focal/partial seizures may be simple feeling of ‘strangeness’ or ‘aura’ and a warning that a secondary generalized seizure is about to occur, or they may be complex resulting in confusion, strange or confusion. Strange or repetitive movements wandering or strange behavior.' }
    ];
    }
    else if(this.SeizureChartData.SeizureTypeOption == "668cc0fc155e8339ed7b6814") {
        this.messages1 = [
            { severity: 'secondary', summary: 'In generalized seizures, consciousness is usually lost although occasionally it might be so brief that no one notices .muscles in the body may stiffen and / or jerk and a fall might occur .' }
        ];
    }
}

addMessages2() {
    this.messages2 = [
        { severity: 'secondary', summary: 'Status epilepticus is present if the seizure lasts 30 minutes or longer, or if a cluster of shorter seizures lasts for 30 minutes or more, with little or no recovery in between.' }
    ];
}

addMessages3() {
    this.messages3 = [
        { severity: 'secondary', summary: 'How did the resident feel after the seizure?' }
    ];
}

addMessages4() {
    this.messages4 = [
        { severity: 'secondary', summary: 'Was medication administered either during or immediately after the seizure?' }
    ];
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

GetSeizureChartDetails(chartId: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._SeizureService
      .GetSeizureChartDetails(chartId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                var tdata = data.actionResult.result;
                  tdata = tdata ? tdata : {};
                  this.SeizureChartData = tdata;
                  this.openAndClose();
                  this.SeizureChartData.DateAndTime = this.datePipe.transform(
                      this.SeizureChartData.DateAndTime,
                      'dd-MM-yyyy HH:mm'
                  );
              } else {
                  this.SeizureChartData = {};
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
      this.SeizureChartData = <any>{};
      this.SeizureChartData.SeizureChartId =
          this.preSelectedChartData.selectedChartID;
  }
}

Save() {
  if(this.SeizureChartData.CareGivenOptions == null) {
      this.CareGivenCheck = true;
  }
  else if(this.SeizureChartData.CareGivenOptions != null) {
      this.CareGivenCheck = false;
      if(this.SeizureChartData.CareGivenOptions == 'Yes') {
          this.ReasonCheck = false;
      }
      else{
          if(this.SeizureChartData.Reason == null) {
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
      this.SeizureChartData.userId = this.userId;
      this.SeizureChartData.residentAdmissionInfoId =
          this.residentAdmissionInfoId;
      this.SeizureChartData.StartedBy = this.loginId;
      this.SeizureChartData.LastEnteredBy = this.loginId;

      if (this.SeizureChartData.DateAndTime) {
          if (
              this.StatementType == 'Update' &&
              typeof this.SeizureChartData.DateAndTime === 'string'
          ) {
              //Pare dateTime
              const dateParts =
                  this.SeizureChartData.DateAndTime.split(/[- :]/);
              const parsedDate = new Date(
                  +dateParts[2],
                  dateParts[1] - 1,
                  +dateParts[0],
                  +dateParts[3],
                  +dateParts[4]
              );
              this.SeizureChartData.DateAndTime = parsedDate;
          }
          this.SeizureChartData.DateAndTime =
              this.datePipe.transform(
                  this.SeizureChartData.DateAndTime,
                  'yyyy-MM-ddTHH:mm'
              );
      }

      const objectBody: any = {
          StatementType: this.StatementType,
          SeizureChartDetail: this.SeizureChartData,
      };
      console.log(objectBody);
      
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._SeizureService
          .InsertUpdateSeizureChart(objectBody)
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
  this.SeizureChartData = <any>{};
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
                  this.SeizureChartLst = tdata;
                  if (this.SeizureChartLst.length < 3 || (((this.SeizureChartLst.length) * (this.pageNumber + 1)) >= this.SeizureChartLst[0].countRecords)) {
                      this.rightBtnCheck = true;
                  }
                  else {
                      this.rightBtnCheck = false;
                  }
              } else {
                  this.SeizureChartLst = [];
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
      ChartMasterId:ChartTypes.SeizureChart,
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
