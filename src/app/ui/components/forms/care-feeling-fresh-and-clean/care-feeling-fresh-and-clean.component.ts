import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareFeelingFreshAndCleanService } from './care-feeling-fresh-and-clean.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-care-feeling-fresh-and-clean',
  templateUrl: './care-feeling-fresh-and-clean.component.html',
  styleUrls: ['./care-feeling-fresh-and-clean.component.scss']
})
export class CareFeelingFreshAndCleanComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  CareAssessmentFreshAndCleanFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  statementType: string = null;

  lstAppearance: any[] = [];
  lstCapacity: any[] = [];
  lstHygienePreference: any[] = []
  lstDressingPreference: any[] = []
  lstDressingAndUndressing: any[] = []
  lstGrooming: any[] = []
  lstGroomingAssistance: any[] = []
  lstHairRoutine: any[] = []
  lstEyeCare: any[] = []
  lstNailCare: any[] = []
  lstMakeup: any[] = []
  lstJewellery: any[] = []
  lstFragrance: any[] = []
  lstFaceAndBodyCreams: any[] = []
  lstGoalsToAchieveFreshAndClean: any[] = []
  lstStrategyToManageHygiene: any[] = []
  lstActionToManageAdditionalRisk: any[] = []

  constructor(private _ConstantServices: ConstantsService, private route: ActivatedRoute, private _UtilityService: UtilityService, private _CareFreshAndClean: CareFeelingFreshAndCleanService, private _UserServices: UserService, private datePipe: DatePipe) {

    super();
    this._ConstantServices.ActiveMenuName = "Care Assessment Fresh And Clean Form";
    this.loginId = localStorage.getItem('userId');

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentFreshAndCleanFormsData = <any>{};
      this.GetCareAssessmentFreshAndCleanDetails(
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
      'Appearance',
      'Capacity',
      'HygienePreference',
      'DressingPreference',
      'DressingAndUndressing',
      'Grooming',
      'HairRoutine',
      'EyeCare',
      'NailCare',
      'Makeup',
      'Jewellery',
      'Fragrance',
      'FaceAndBodyCreams',
      'GoalsToAchieveFreshAndClean',
      'StrategyToManageHygiene'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.CareAssessmentFeeling, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstAppearance = responses[0];
      this.lstCapacity = responses[1];
      this.lstHygienePreference = responses[2];
      this.lstDressingPreference = responses[3];
      this.lstDressingAndUndressing = responses[4];
      this.lstGrooming = responses[5];
      this.lstHairRoutine = responses[6];
      this.lstEyeCare = responses[7];
      this.lstNailCare = responses[8];
      this.lstMakeup = responses[9];
      this.lstJewellery = responses[10];
      this.lstFragrance = responses[11];
      this.lstFaceAndBodyCreams = responses[12];
      this.lstGoalsToAchieveFreshAndClean = responses[13];
      this.lstStrategyToManageHygiene = responses[14];
    });

    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentFreshAndCleanFormsData = <any>{};
      this.GetCareAssessmentFreshAndCleanDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }


  }

  GetCareAssessmentFreshAndCleanDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareFreshAndClean
      .GetCareAssessmentFreshAndCleanDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
            tdata = tdata ? tdata : {};
            this.CareAssessmentFreshAndCleanFormsData = tdata;
            this.CareAssessmentFreshAndCleanFormsData.nextReviewDate = new Date(this.CareAssessmentFreshAndCleanFormsData.nextReviewDate);
          } else {
            this.CareAssessmentFreshAndCleanFormsData = {};
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

  SaveAsPDF() { }



  saveAsUnfinished() {

    this.CareAssessmentFreshAndCleanFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.CareAssessmentFreshAndCleanFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.CareAssessmentFreshAndCleanFormsData.userId = this.userId;
      this.CareAssessmentFreshAndCleanFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.CareAssessmentFreshAndCleanFormsData.startedBy = this.loginId;
      this.CareAssessmentFreshAndCleanFormsData.lastEnteredBy = this.loginId;

      this.CareAssessmentFreshAndCleanFormsData.nextReviewDate = new Date(this.datePipe.transform(this.CareAssessmentFreshAndCleanFormsData.nextReviewDate, 'yyyy-MM-dd'));

      const objectBody: any = {
        statementType: this.statementType,
        careAssessmentFreshAndCleanForm: this.CareAssessmentFreshAndCleanFormsData,
      };




      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._CareFreshAndClean
        .AddInsertUpdateCareAssessmentFreshAndCleanForm(
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
        'Care Assessment Fresh and Clean details are missing.'
      );
    }
  }


  ResetModel() {
    this.isEditable = true;
    this.CareAssessmentFreshAndCleanFormsData = <any>{};
    this.statementType = 'Insert';
  }

}
