import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertTypes, ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { WoundChartService } from './wound-chart.service';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';

interface BodyPart {
  name: string;
  top: number;
  left: number;
}

@Component({
  selector: 'app-wound-chart',
  templateUrl: './wound-chart.component.html',
  styleUrls: ['./wound-chart.component.scss']
})
export class WoundChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  loginId: string;
  userId: any;
  residentAdmissionInfoId: any;
  lstObservationType: any[] = [];
  lstWoundColour: any[] = [];
  lstExudateType: any[] = [];
  lstExudateAmount: any[] = [];
  lstEdgeAppearance: any[] = [];
  lstSurroundingEdges: any[] = [];
  lstFectorAffectingHealing: any[] = [];
  lstUlcerClassification:any[]=[];
  lastRecordData: any[] = [];
  lastRecordBodyStatus: string | null = null;

  woundChartFormData: any = <any>{};
  stLstYesNoOptions: any[];
  isEditable: boolean;
  StatementType: string;
  inputFields: boolean;
  reason: boolean = false;
  careGiven: boolean = false;
  selecteWoundImage: any[] = [];
  SelectedProductImage: any[] = [];

  repairStageOptions: any[] = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ]

  odureOptions: any[] = [
    { label: 'Nill', value: 'Nill' },
    { label: 'Offensive', value: 'Offensive' }
  ]
  dressingOptions: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ]

  dressingChangeRequiredOptions: any[] = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' }
  ]

  //for carousel
  woundChartsLst: any = <any>{};
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


  //Body Map PopUp
  isShowBodyMap: boolean = false;
  isReadOnly: boolean = false;
  bodyMapData: any;
  selectedBodyParts: string[] = null;
  BodyPartsName: any[] = [];
  bodyDialogCount: number = 0;
  UpdatedPartsCheck: any[] = [];
  SelectedOrRemovalCheck: boolean = false;

  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipe: DatePipe,
    private _woundChartServices: WoundChartService,
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
      this.woundChartFormData = <any>{};
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
      this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.WoundChart);
      this.ChartName = this.result["ChartName"];
      this._ConstantServices.ActiveMenuName = this.ChartName;
    });
    const collectionNames = ['ObservationType', 'woundColour', 'exudateType', 'exudateAmount', 'edgeAppearance', 'surroundingEdges', 'fectorAffectingHealing','ulcerClassification'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.WoundChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstObservationType = responses[0];
      this.lstWoundColour = responses[1];
      this.lstExudateType = responses[2];
      this.lstExudateAmount = responses[3];
      this.lstEdgeAppearance = responses[4];
      this.lstSurroundingEdges = responses[5];
      this.lstFectorAffectingHealing = responses[6];
      this.lstUlcerClassification=responses[7];

    });
    //this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
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
    this.woundChartFormData.DateAndTime = new Date();
  }

  ClearAllfeilds() {
    if (this.preSelectedChartData.chartMasterId) {
      this.woundChartFormData = <any>{};
      this.woundChartFormData.woundChartId =
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
    if (this.woundChartFormData.CareGiven == null) {
      this.careGiven = true;
    } else if (this.woundChartFormData.CareGiven == 'No' && this.woundChartFormData.Reason == null) {
      this.reason = true;
    }
    else if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.woundChartFormData.userId = this.userId;
      this.woundChartFormData.StartedBy = this.loginId;
      this.woundChartFormData.LastEnteredBy = this.loginId;
      this.woundChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.woundChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.woundChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.woundChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.woundChartFormData.DateAndTime = parsedDate;
        }
        this.woundChartFormData.DateAndTime =
          this.datePipe.transform(
            this.woundChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );
      }

      if (this.selecteWoundImage[0]) {
        this.woundChartFormData.woundImage = this.selecteWoundImage[0];
      }
      if (this.SelectedProductImage[0]) {
        this.woundChartFormData.productImage = this.SelectedProductImage[0];
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        woundChart: this.woundChartFormData,
        alertMasterId: AlertTypes.PressureUlcerAlert,
        chartMasterId: ChartTypes.WoundChart
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._woundChartServices
        .AddInsertUpdateWoundChart(objectBody)
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
          if (data.actionResult.success) {
            var tdata = JSON.parse(data.actionResult.result) || [];
            this.woundChartsLst = tdata;
            this.BodyPartsName = [];
            this.woundChartsLst.forEach(chart => {
              if (chart.woundImage) {
                const imageFormat = this._UtilityService.getFileExtension(chart.woundImage);
                chart.woundImage = `data:image/${imageFormat};base64,${chart.woundImage}`;
              }

              if (chart.productImage) {
                const imageFormat = this._UtilityService.getFileExtension(chart.productImage);
                chart.productImage = `data:image/${imageFormat};base64,${chart.productImage}`;
              }

            });
            if (this.woundChartsLst[0].selectedBodyParts && this.woundChartsLst[0].BodyMapStatus) {
              this.lastRecordData = this.woundChartsLst[0].selectedBodyParts;
              this.lastRecordBodyStatus = this.woundChartsLst[0].BodyMapStatus;
              for (let i = 0; i < this.woundChartsLst[0].selectedBodyParts.length; i++) {
                this.BodyPartsName.push(this.woundChartsLst[0].selectedBodyParts[i].name)
              }
            } else {
              this.BodyPartsName = [];
              this.lastRecordBodyStatus = null;
            }

            if (this.woundChartsLst.length < 3 || ((this.woundChartsLst.length * (this.pageNumber + 1)) >= this.woundChartsLst[0].countRecords)) {
              this.rightBtnCheck = true;
            } else {
              this.rightBtnCheck = false;
            }
            console.log(this.woundChartsLst);

          } else {
            this.woundChartsLst = [];
          }
        },
      });
  }

  extractBodyPainLocations(bodyParts: BodyPart[]): string {
    if (bodyParts) {
      return bodyParts.map(part => part.name).join(', ');
    }
    else return null;
  }


  showPopup(chartId) {
    this.StrikeThroughData = {
      ChartMasterId: ChartTypes.WoundChart,
      ChartId: chartId,
      ModifiedBy: this.loginId,
    };
    this.isShowStrikeThroughPopup = true;

  }

  openAndClose() {
    if (this.woundChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.woundChartFormData = <any>{};
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
    this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.chartId, this.preSelectedChartData.selectedStartedOn, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);

  }


  productImageUploader(event) {
    this.SelectedProductImage = [];
    for (let file of event.files) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.SelectedProductImage.push(reader.result as string);
        };
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  productImageReset() {
    this.SelectedProductImage = [];
  }
  RemoveProductImage() {
    this.woundChartFormData.woundImage = null;
    this.SelectedProductImage = [];
  }




  woundImageUploader(event) {
    this.selecteWoundImage = [];
    for (let file of event.files) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selecteWoundImage.push(reader.result as string);
        };
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  woundImageReset() {
    this.selecteWoundImage = [];
  }
  RemoveWoundImage() {
    this.woundChartFormData.woundImage = null;
    this.selecteWoundImage = [];
  }

  ShowBodyMapPopUp(isReadOnly: boolean, preselectedBodyParts: BodyPart[] = null, bodyMapStatus = null) {
    this.bodyDialogCount++;
    this.isShowBodyMap = true;
    this.isReadOnly = isReadOnly;
    this.bodyMapData = {
      preselectedBodyParts: preselectedBodyParts,
      status: isReadOnly == true ? bodyMapStatus : (isReadOnly == false && this.woundChartFormData.bodyMapStatus == null) ? bodyMapStatus : this.woundChartFormData.bodyMapStatus,
      count: this.bodyDialogCount,
      lastSelectedBodyPart: this.lastRecordData,
      UpdatedParts: this.UpdatedPartsCheck.length == 0 ? [] : this.UpdatedPartsCheck,
      buttoncheck: isReadOnly,
      SelectionRemovalCheck: this.SelectedOrRemovalCheck
    }
  }

  onSelectedBodyParts(bodyMapData: any) {
    this.SelectedOrRemovalCheck = bodyMapData.selectOrRemoveCheck;
    this.woundChartFormData.selectedBodyParts = [...bodyMapData.selectedBodyParts];
    this.UpdatedPartsCheck = [];
    this.UpdatedPartsCheck.push(...bodyMapData.selectedBodyParts);
    this.woundChartFormData.bodyMapStatus = bodyMapData.bodyMapStatus
  }

}
