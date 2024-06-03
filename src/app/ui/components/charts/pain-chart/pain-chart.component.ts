import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { ActivityChartService } from '../activities-chart/activity-chart.service';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { PainChartService } from './pain-chart.service';

@Component({
  selector: 'app-pain-chart',
  templateUrl: './pain-chart.component.html',
  styleUrls: ['./pain-chart.component.scss']
})
export class PainChartComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  loginId: any;
  userId: any;
  residentAdmissionInfoId: any;

  painChartFormData: any = <any>{};
  stLstYesNoOptions: any;
  isEditable: boolean;
  inputFields: boolean;
  StatementType: string;

  communicationOptions: any[] = [{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }, { label: "Unsure", value: 'Unsure' }];
  rangeOption: any[] = [{ label: '0', value: '0' }, { label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }]
  intervalOption: any[] = [{ label: 'Intermittent', value: 'Intermittent' }, { label: 'Constant', value: 'Constant' }]

  lstResponseToPain: any[] = [];
  lstReferrals: any[] = [];
  lstImpact: any[] = [];
  lstInterventions: any[] = [];
  lstTypeOfPain: any[] = [];

  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipte: DatePipe,
    private _ConstantServices: ConstantsService,
    private route: ActivatedRoute,
    private _PainChartServices: PainChartService
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
      this.painChartFormData = <any>{};
      this.GetPainChartDetails(
        this.preSelectedChartData.selectedChartID
      );
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }
  }

  ngOnInit(): void {
    this.optionService.getstLstYesNoOptions().subscribe((data) => {
      this.stLstYesNoOptions = data;
    });

    const collectionNames = ['TypeOfPain', 'ResponseToPain', 'Impact', 'Interventions', 'Referrals'];

    forkJoin(
      collectionNames.map((collectionName) =>
        this.GetChartDropDownMasterList(
          ChartTypes.PainChart,
          collectionName,
          1
        )
      )
    ).subscribe((responses: any[]) => {
      this.lstTypeOfPain = responses[0];
      this.lstResponseToPain = responses[1];
      this.lstImpact = responses[2];
      this.lstInterventions = responses[3];
      this.lstReferrals = responses[4];

    });
  }

  openAndClose() {
    if (this.painChartFormData.CareGiven == 'Yes') {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  Save() {
    if (
      this.userId != null &&
      this.residentAdmissionInfoId != null &&
      this.loginId != null
    ) {
      this.painChartFormData.userId = this.userId;
      this.painChartFormData.StartedBy = this.loginId;
      this.painChartFormData.LastEnteredBy = this.loginId;
      this.painChartFormData.ResidentAdmissionInfoId =
        this.residentAdmissionInfoId;

      if (this.painChartFormData.DateAndTime) {
        if (
          this.StatementType == 'Update' &&
          typeof this.painChartFormData.DateAndTime === 'string'
        ) {
          //Pare dateTime
          const dateParts =
            this.painChartFormData.DateAndTime.split(/[- :]/);
          const parsedDate = new Date(
            +dateParts[2],
            dateParts[1] - 1,
            +dateParts[0],
            +dateParts[3],
            +dateParts[4]
          );
          this.painChartFormData.DateAndTime = parsedDate;

          //pare review date
          const reviewDate = this.painChartFormData.ReviewDate.split(/[-:]/);
          const parsedReviewDate = new Date(
            +reviewDate[2],
            reviewDate[1] - 1,
            +reviewDate[0],
            +reviewDate[3],
            +reviewDate[4]
          );
          this.painChartFormData.ReviewDate = parsedReviewDate;
        }
        this.painChartFormData.DateAndTime =
          this.datePipte.transform(
            this.painChartFormData.DateAndTime,
            'yyyy-MM-ddTHH:mm'
          );

        this.painChartFormData.NextReviewDate =
          this.datePipte.transform(
            this.painChartFormData.NextReviewDate,
            'yyyy-MM-dd'
          );

        this.painChartFormData.DurationOfPain =
          this.datePipte.transform(
            this.painChartFormData.DurationOfPain,
            'HH:mm'
          );
      }

      const objectBody: any = {
        StatementType: this.StatementType,
        painChartData: this.painChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._PainChartServices
        .AddInsertUpdatePainChartForm(objectBody)
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
      this._UtilityService.showWarningAlert('Pain Chart');
    }
  }
  ClearAllfeilds() {
    if (this.preSelectedChartData.selectedChartID) {
      this.painChartFormData = <any>{};
      this.painChartFormData.activitiesChartId =
        this.preSelectedChartData.selectedChartID;
    }
  }

  GetPainChartDetails(chartId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._PainChartServices
      .GetPainChartById(chartId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};
            this.painChartFormData = tdata;
            this.painChartFormData.DateAndTime =
              this.datePipte.transform(
                this.painChartFormData.DateAndTime,
                'dd-MM-yyyy HH:mm'
              );
            this.painChartFormData.NextReviewDate =
              this.datePipte.transform(
                this.painChartFormData.NextReviewDate,
                'dd-MM-yyyy'
              );
            // this.painChartFormData.DurationOfPain =
            //   this.datePipte.transform(
            //     this.painChartFormData.DurationOfPain,
            //     'HH:mm'
            //   );

            console.log("==>" + this.painChartFormData.NextReviewDate);

            this.openAndClose();
          } else {
            this.painChartFormData = {};
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
          alert(error.message);
          return of([]); // Returning empty array in case of error
        })
      );
  }

  ResetModel() {
    this.isEditable = true;
    this.painChartFormData = <any>{};
    this.StatementType = 'Insert';
  }
}
