import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UtilityModule } from 'src/app/utility/utility.module';
import { UtilityService } from 'src/app/utility/utility.service';
import { ActivityChartService } from './activity-chart.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { ChartTypes } from 'src/app/ui/service/constants.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-activities-chart',
  templateUrl: './activities-chart.component.html',
  styleUrls: ['./activities-chart.component.scss'],
})
export class ActivitiesChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  inputFields: boolean = false;
  ActivitiesChartFormData: any = <any>{};
  isEditable: boolean;
  loginId: any;
  residentAdmissionInfoId:any;
  userId: any;
  StatementType: string = null;

  lstActivity:any[]=[];
  lstPurposeOfActivity:any[]=[];

  //Static Options
  stLstYesNoOptions: any[] = [];
  stLstAttendanceOptions: any[] = [];

  constructor(private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private _ActivityChartServices:ActivityChartService
  ) {
    super();
  }

  ngOnInit(): void {
    this.optionService.getstLstYesNoOptions().subscribe(data => {
      this.stLstYesNoOptions = data;
    });

    this.optionService.getstLstAttendaceOptions().subscribe(data => {
      this.stLstAttendanceOptions = data;
    });

    const collectionNames = [
      'Activity',
      'PurposeofActivity'
    ];

    forkJoin(collectionNames.map((collectionName) => this.GetChartDropDownMasterList(ChartTypes.ActivitiesChart, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstActivity = responses[0];
      this.lstPurposeOfActivity = responses[1];
    });
  }

  openAndClose() {
    if (this.ActivitiesChartFormData.CareGiven == "Yes") {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }

  GetChartDropDownMasterList(chartMasterId: string, dropdownName: string, status: number): Observable<any> {
    this._UtilityService.showSpinner();
    return this._UserService.GetChartDropDownMasterList(chartMasterId, dropdownName, status).pipe(
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
  completeForm() {
    this.Save();
  }

  SaveAsPDF() { }

  Save() {
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.ActivitiesChartFormData.userId = this.userId;
      this.ActivitiesChartFormData.StartedBy = this.loginId;
      this.ActivitiesChartFormData.LastEnteredBy = this.loginId;
      const objectBody: any = {
        StatementType: this.StatementType,
        activitiesChartData: this.ActivitiesChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._ActivityChartServices
        .AddInsertUpdateActivityChartForm(
          objectBody
        )
        .subscribe({
          next: (data) => {
            this._UtilityService.hideSpinner();
            if (data.actionResult.success == true) {
              this.EmitUpdateForm.emit(true);
              this.ResetModel();
              this._UtilityService.showSuccessAlert(
                data.actionResult.errMsg
              );
            }
            else
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
        'Activities Chart'
      );
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.ActivitiesChartFormData = <any>{};
    this.StatementType = 'Insert';
  }
}
