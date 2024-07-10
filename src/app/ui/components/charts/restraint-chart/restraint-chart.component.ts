import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { RestraintChartService } from './restraint-chart.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-restraint-chart',
  templateUrl: './restraint-chart.component.html',
  styleUrls: ['./restraint-chart.component.scss']
})
export class RestraintChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();


  customDateFormat = CustomDateFormat;
  loginId: string;
  userId: any;
  residentAdmissionInfoId: any;

  restraintChartFormData: any = <any>{};
  stLstYesNoOptions: any[];
  stLstAttendanceOptions: any;
  isEditable: boolean;
  StatementType: string;
  inputFields: boolean;
  reason: boolean = false;
  careGiven: boolean = false;
  lstTypeOfRestraint: any[] = [];
  lstTriggersAndBehaviors: any[] = [];

  //for carousel
  restraintChartsLst: any[] = [];
  pageNumber: number = 0;
  pageSize: number = 3;
  responsiveOptions: any[] | undefined;
  rightBtnCheck: boolean = false;
  isShowStrikeThroughPopup: boolean = false;
  StrikeThroughData: any = <any>{};
  stLstReason: any[] = [];
  rangeOptionReskConducted: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ];
  stLstErrorAndWarning: any = <any>{};
  result: any;
  ChartName: any;
  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private _restraintServices: RestraintChartService,
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
      this.restraintChartFormData = <any>{};
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }

  }

  ngOnInit(): void {
    this.restraintChartFormData.DateAndTime = new Date()
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
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.RestraintChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });
    const collectionNames = ['typeOfRestraint', 'triggersAndBehaviors'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.RestraintChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstTypeOfRestraint = responses[0];
      this.lstTriggersAndBehaviors = responses[1];
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

  ClearAllfeilds() {
    if (this.preSelectedChartData.selectedChartID) {
      this.restraintChartFormData = <any>{};
      this.restraintChartFormData.activitiesChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }

  Save() {
    this.reason = false;
    this.careGiven = false;
    if (this.restraintChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.restraintChartFormData.CareGiven == 'No' && this.restraintChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.restraintChartFormData.userId = this.userId;
      this.restraintChartFormData.StartedBy = this.loginId;
      this.restraintChartFormData.LastEnteredBy = this.loginId;
      this.restraintChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.restraintChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.restraintChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.restraintChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.restraintChartFormData.DateAndTime = parsedDate;
        }
        this.restraintChartFormData.DateAndTime =
          this.datePipe.transform(
            this.restraintChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        restraintChart: this.restraintChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._restraintServices
        .AddInsertUpdateRestraintChartForm(objectBody)
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
            this.restraintChartsLst = tdata;
            if (this.restraintChartsLst.length < 3 || (((this.restraintChartsLst.length) * (this.pageNumber + 1)) >= this.restraintChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            }
            else {
              this.rightBtnCheck = false;
            }


          } else {
            this.restraintChartsLst = [];
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
      ChartMasterId: ChartTypes.RestraintChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;

  }

  openAndClose() {
    if (this.restraintChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.restraintChartFormData = <any>{};
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
    this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
  }

}
