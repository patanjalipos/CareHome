import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareHearingAssessmentService } from './care-hearing-assessment.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-care-hearing-assessment',
  templateUrl: './care-hearing-assessment.component.html',
  styleUrls: ['./care-hearing-assessment.component.scss']
})
export class CareHearingAssessmentComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  CareAssessmentHearingFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  statementType: string = null;

  lstHearingDiagnosisCheck: any[] = []
  lstCurrentHearingDiagnosis: any[] = []
  lstHearingInterventions: any[] = []
  lstHearingAids: any[] = []
  lstAidsAssistance: any[] = []
  lstGoalsToHearing: any[] = []

  constructor(private _ConstantServices: ConstantsService, private datePipe: DatePipe, private route: ActivatedRoute, private _UtilityService: UtilityService, private _CareHearing: CareHearingAssessmentService, private _UserServices: UserService) {

    super();

    this._ConstantServices.ActiveMenuName = "Care Assessment Hearing Form";
    this.loginId = localStorage.getItem('userId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentHearingFormsData = <any>{};
      this.GetCareAssessmentHearingDetails(
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
    this.residentAdmissionInfoId =
      this.preSelectedFormData.residentAdmissionInfoId;
    this.isEditable = this.preSelectedFormData.isEditable;

    const collectionNames = [
      'HearingDiagnosisCheck',
      'CurrentHearingDiagnosis',
      'HearingInterventions',
      'HearingAids',
      'AidsAssistance',
      'GoalsToHearing'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.CareAssessmentHearing, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstHearingDiagnosisCheck = responses[0];
      this.lstCurrentHearingDiagnosis = responses[1];
      this.lstHearingInterventions = responses[2];
      this.lstHearingAids = responses[3];
      this.lstAidsAssistance = responses[4];
      this.lstGoalsToHearing = responses[5];
    });

    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentHearingFormsData = <any>{};
      this.GetCareAssessmentHearingDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  GetCareAssessmentHearingDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareHearing
      .GetCareAssessmentHearingDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
            tdata = tdata ? tdata : {};

            this.CareAssessmentHearingFormsData = tdata;

            this.CareAssessmentHearingFormsData.nextReviewDate = this.datePipe.transform(
              this.CareAssessmentHearingFormsData.nextReviewDate,
              'MM/dd/yyyy'
            );;

          } else {
            this.CareAssessmentHearingFormsData = {};
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }

  SaveAsPDF() { }

  getDropdownMasterLists(formMasterId: string, dropdownName: string, status: number): Observable<any> {
    debugger
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
    this.CareAssessmentHearingFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.CareAssessmentHearingFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.CareAssessmentHearingFormsData.userId = this.userId;
      this.CareAssessmentHearingFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.CareAssessmentHearingFormsData.startedBy = this.loginId;
      this.CareAssessmentHearingFormsData.lastEnteredBy = this.loginId;
      this.CareAssessmentHearingFormsData.nextReviewDate = new Date(this.datePipe.transform(this.CareAssessmentHearingFormsData.nextReviewDate, 'yyyy-MM-dd'));
      const objectBody: any = {
        statementType: this.statementType,
        careAssessmentHearingForm: this.CareAssessmentHearingFormsData,
      };
console.log(objectBody);

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._CareHearing
        .AddInsertUpdateCareAssessmentHearingForm(
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
        'Care Assessment Hearing details are missing.'
      );
    }
  }


  ResetModel() {
    this.isEditable = true;
    this.CareAssessmentHearingFormsData = <any>{};
    this.statementType = 'Insert';
  }

}
