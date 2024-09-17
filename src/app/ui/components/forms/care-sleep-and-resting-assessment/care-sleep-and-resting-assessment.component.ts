import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareSleepAndRestingAssessmentService } from './care-sleep-and-resting-assessment.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-care-sleep-and-resting-assessment',
  templateUrl: './care-sleep-and-resting-assessment.component.html',
  styleUrls: ['./care-sleep-and-resting-assessment.component.scss']
})

export class CareSleepAndRestingAssessmentComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  CareAssessmentSleepAndRestFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  statementType: string = null;

  lstCapacity: any[] = [];
  lstTroubleSleeping: any[] = [];
  lstSleepAssistance: any[] = [];
  lstSleepBackAssistance: any[] = [];
  lstNightAssistance: any[] = [];
  lstGoalsToAchieve: any[] = [];
  lstStrategyToManageCheck: any[] = [];

  constructor(private _ConstantServices: ConstantsService, private route: ActivatedRoute, private _UtilityService: UtilityService, private _UserServices: UserService, private _CareSleepAndRest: CareSleepAndRestingAssessmentService, private datePipe: DatePipe) {

    super();

    this._ConstantServices.ActiveMenuName = "Care Assessment Sleep And Rest Form";
    this.loginId = localStorage.getItem('userId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentSleepAndRestFormsData = <any>{};
      this.GetCareAssessmentSleepAndRestDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  ngOnInit(): void {

    this.userId = this.preSelectedFormData.userId;
    this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

    const collectionNames = [
      'Capacity',
      'TroubleSleeping',
      'SleepAssistance',
      'SleepBackAssistance',
      'NightAssistance',
      'GoalsToAchieve',
      'StrategyToManageCheck'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.CareAssessmentSleep, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstCapacity = responses[0];
      this.lstTroubleSleeping = responses[1];
      this.lstSleepAssistance = responses[2];
      this.lstSleepBackAssistance = responses[3];
      this.lstNightAssistance = responses[4];
      this.lstGoalsToAchieve = responses[5];
      this.lstStrategyToManageCheck = responses[6];
    });

    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentSleepAndRestFormsData = <any>{};
      this.GetCareAssessmentSleepAndRestDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  SaveAsPDF() { }

  GetCareAssessmentSleepAndRestDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareSleepAndRest
      .GetCareAssessmentSleepAndRestDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};

            this.CareAssessmentSleepAndRestFormsData = tdata;

            this.CareAssessmentSleepAndRestFormsData.reviewDate = this.datePipe.transform(this.CareAssessmentSleepAndRestFormsData.reviewDate, 'MM/dd/yyyy');


          } else {
            this.CareAssessmentSleepAndRestFormsData = {};
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }

  getDropdownMasterLists(formMasterId: string, dropdownName: string, status: number): Observable<any> {
    this._UtilityService.showSpinner();
    return this._UserServices.GetDropDownMasterList(formMasterId, dropdownName, status).pipe(
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

  saveAsUnfinished() {

    this.CareAssessmentSleepAndRestFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.CareAssessmentSleepAndRestFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    debugger
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.CareAssessmentSleepAndRestFormsData.userId = this.userId;
      this.CareAssessmentSleepAndRestFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.CareAssessmentSleepAndRestFormsData.startedBy = this.loginId;
      this.CareAssessmentSleepAndRestFormsData.lastEnteredBy = this.loginId;
      this.CareAssessmentSleepAndRestFormsData.reviewDate = this.datePipe.transform(this.CareAssessmentSleepAndRestFormsData.reviewDate, 'yyyy-MM-dd');

      const objectBody: any = {
        statementType: this.statementType,
        careAssessmentSleepAndRestForm: this.CareAssessmentSleepAndRestFormsData
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._CareSleepAndRest
        .AddInsertUpdateCareAssessmentSleepAndRestForm(
          objectBody
        )
        .subscribe({
          next: (data) => {
            this._UtilityService.hideSpinner();
            if (data.actionResult.success == true) {
              this.EmitUpdateForm.emit(true);
              //   this.ResetModel();
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
        'Care Assessment Sleep and Rest details are missing.'
      );
    }
  }


  ResetModel() {
    this.isEditable = true;
    this.CareAssessmentSleepAndRestFormsData = <any>{};
    this.statementType = 'Insert';
  }

}
