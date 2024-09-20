import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { InfectionChartService } from './infection-chart.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

interface BodyPart {
  name: string;
  top: number;
  left: number;
}

@Component({
  selector: 'app-infection-chart',
  templateUrl: './infection-chart.component.html',
  styleUrls: ['./infection-chart.component.scss']
})
export class InfectionChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  inputFieldsCheck: boolean;
  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  InfectionChartData: any = <any>{};
  StatementType: string = null;
  CareGivenCheck: boolean = false;
  ReasonCheck: boolean = false;

  LstSymptoms: any[] = [];
  LstInfectionStatus: any[] = [];

  //Static Options
  stLstYesNoOptions: any[] = [];
  stLstReason: any[] = [];
  stLstErrorAndWarning: any = <any>{};

  //for carousel
  InfectionChartsLst: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 3;
  responsiveOptions: any[] | undefined;
  rightBtnCheck: boolean = false;
  isShowStrikeThroughPopup: boolean = false;
  StrikeThroughData: any = <any>{};
  result: any = <any>{};
  ChartName: string;

  //Body Map PopUp
  isShowBodyMap: boolean = false;
  isReadOnly: boolean;
  bodyMapData: any;
  selectedBodyParts: string[] = null;
  BodyPartsName: any[] = [];
  UpdatedPartsCheck: any[] = [];
  lastRecordData: any[] = [];
  lastRecordBodyStatus: string | null = null;
  bodyDialogCount: number = 0;
  SelectedOrRemovalCheck: boolean = false;
  PopupOpenCheck: boolean = false;

  constructor(private optionService: OptionService,
    private _ConstantServices: ConstantsService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private _InfectionChart: InfectionChartService) {
    super();
    this.loginId = localStorage.getItem('userId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedChartData.isEditable;

    if (this.preSelectedChartData.selectedChartID != null) {
      this.InfectionChartData = <any>{};
      this.GetInfectionChartDetails(this.preSelectedChartData.selectedChartID);
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
      this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

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
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.InfectionChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });

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
      'SymptomsOptions',
      'InfectionStatusOptions'
    ];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.InfectionChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.LstSymptoms = responses[0];
      this.LstInfectionStatus = responses[1];
    });

    this.isEditable = this.preSelectedChartData.isEditable;

    if (this.preSelectedChartData.selectedChartID != null) {
      this.InfectionChartData = <any>{};
      this.GetInfectionChartDetails(this.preSelectedChartData.selectedChartID);
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }
    this.InfectionChartData.DateAndTime = new Date();
  }

  openAndClose() {
    if (this.InfectionChartData.CareGivenOptions == "Yes") {
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

  GetInfectionChartDetails(chartId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._InfectionChart
      .GetInfectionChartDetails(chartId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
            tdata = tdata ? tdata : {};
            this.InfectionChartData = tdata;
            this.openAndClose();
            this.InfectionChartData.DateAndTime = this.datePipe.transform(
              this.InfectionChartData.DateAndTime,
              'dd-MM-yyyy HH:mm'
            );
          } else {
            this.InfectionChartData = {};
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
      this.InfectionChartData = <any>{};
      this.InfectionChartData.ADLChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }

  ShowBodyMapPopUp(isReadOnly: boolean, preselectedBodyParts: BodyPart[] = null, bodyMapStatus = null) {
    this.bodyDialogCount++;
    this.isShowBodyMap = true;
    this.isReadOnly = isReadOnly;

    this.bodyMapData = {
      preselectedBodyParts: preselectedBodyParts,
      status: isReadOnly == true ? bodyMapStatus : (isReadOnly == false && this.InfectionChartData.bodyMapStatus == null) ? bodyMapStatus : this.InfectionChartData.bodyMapStatus,
      count: this.bodyDialogCount,
      lastSelectedBodyPart: this.lastRecordData,
      UpdatedParts: this.UpdatedPartsCheck.length == 0 ? [] : this.UpdatedPartsCheck,
      buttoncheck: isReadOnly,
      SelectionRemovalCheck: this.SelectedOrRemovalCheck
    }
  }

  extractBodyPainLocations(bodyParts: BodyPart[]): string {
    if (bodyParts) {
      return bodyParts.map(part => part.name).join(', ');
    }
    else return null;
  }

  onSelectedBodyParts(bodyMapData: any) {
    this.SelectedOrRemovalCheck = bodyMapData.selectOrRemoveCheck;
    this.InfectionChartData.selectedBodyParts = [...bodyMapData.selectedBodyParts];
    this.UpdatedPartsCheck = [];
    this.UpdatedPartsCheck.push(...bodyMapData.selectedBodyParts);
    this.InfectionChartData.bodyMapStatus = bodyMapData.bodyMapStatus;
  }

  Save() {
    if (this.InfectionChartData.CareGivenOptions == null) {
      this.CareGivenCheck = true;
    }
    else if (this.InfectionChartData.CareGivenOptions != null) {
      this.CareGivenCheck = false;
      if (this.InfectionChartData.CareGivenOptions == 'Yes') {
        this.ReasonCheck = false;
      }
      else {
        if (this.InfectionChartData.Reason == null) {
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
      this.InfectionChartData.userId = this.userId;
      this.InfectionChartData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.InfectionChartData.StartedBy = this.loginId;
      this.InfectionChartData.LastEnteredBy = this.loginId;

      if (this.InfectionChartData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.InfectionChartData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.InfectionChartData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.InfectionChartData.DateAndTime = parsedDate;
        }
        this.InfectionChartData.DateAndTime =
          this.datePipe.transform(
            this.InfectionChartData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      if (this.isReadOnly == null) {
        this.InfectionChartData.selectedBodyParts = this.lastRecordData;
        this.InfectionChartData.BodyMapStatus = this.lastRecordBodyStatus;
      }
      const objectBody: any = {
        StatementType: this.StatementType,
        infectionChartData: this.InfectionChartData,
      };


      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._InfectionChart
        .InsertUpdateInfectionChart(objectBody)
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
    this.InfectionChartData = <any>{};
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
    this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
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
            this.InfectionChartsLst = tdata;
            this.BodyPartsName = [];
            if (this.InfectionChartsLst[0].selectedBodyParts != null && this.InfectionChartsLst[0].BodyMapStatus != null && this.SelectedOrRemovalCheck == false) {
              this.lastRecordData = this.InfectionChartsLst[0].selectedBodyParts;
              this.lastRecordBodyStatus = this.InfectionChartsLst[0].BodyMapStatus;
              for (let i = 0; i < this.InfectionChartsLst[0].selectedBodyParts.length; i++) {
                this.BodyPartsName.push(this.InfectionChartsLst[0].selectedBodyParts[i].name)
              }
            }
            else {
              this.BodyPartsName = [];
              this.lastRecordData = [];
              this.lastRecordBodyStatus = null;
            }


            if (this.InfectionChartsLst.length < 3 || (((this.InfectionChartsLst.length) * (this.pageNumber + 1)) >= this.InfectionChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }
          } else {
            this.InfectionChartsLst = [];
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
      ChartMasterId: ChartTypes.InfectionChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;
  }

  Changes(value: boolean) {
    this.isShowStrikeThroughPopup = value;
    this.chartOnChange()
  }

}
