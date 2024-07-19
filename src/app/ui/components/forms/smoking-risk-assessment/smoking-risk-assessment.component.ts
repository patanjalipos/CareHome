import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { SmokingRiskAssessmentService } from './smoking-risk-assessment.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-smoking-risk-assessment',
  templateUrl: './smoking-risk-assessment.component.html',
  styleUrls: ['./smoking-risk-assessment.component.scss']
})
export class SmokingRiskAssessmentComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  SmokingRiskAssessmentFormData: any = <any>{};

  lstSmokeIndependently: any[] = [];
  lstInformationSources: any[] = [];
  lstStopSmoking: any[] = [];
  lstSmokingPractices: any[] = [];
  lstMaterialsUnsafely: any[] = [];
  lstHistoryOfFalling: any[] = [];
  lstResidentIncontinent: any[] = [];
  lstSmokingRoom: any[] = [];
  lstCigarettesAndLighter: any[] = [];
  lstAccessAnAshtray: any[] = [];
  lstLightACigarette: any[] = [];
  lstCigaretteSecurely: any[] = [];
  lstAshesInAshtray: any[] = [];
  lstPutOutCigarette: any[] = [];
  lstEmergencyAssistance: any[] = [];



  constructor(private _ConstantServices: ConstantsService,
    private route: ActivatedRoute,
    private _UtilityService: UtilityService,
    private _UserServices: UserService,
    private _SmokingRiskServices: SmokingRiskAssessmentService,
    private datePipe: DatePipe
  ) {

    super();

    this._ConstantServices.ActiveMenuName = "Smoking Risk Assessment";
    this.loginId = localStorage.getItem('userId');
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.SmokingRiskAssessmentFormData = <any>{};
      this.GetSmokingRiskAssessmentDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }


  ngOnInit(): void {

    this.userId = this.preSelectedFormData.userId;
    this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

    const collectionNames = [
      'SmokeIndependently',
      'InformationSources',
      'StopSmoking',
      'SmokingPractices',
      'MaterialsUnsafely',
      'HistoryOfFalling',
      'ResidentIncontinent',
      'SmokingRoom',
      'CigarettesAndLighter',
      'AccessAnAshtray',
      'LightACigarette',
      'CigaretteSecurely',
      'AshesInAshtray',
      'PutOutCigarette',
      'EmergencyAssistance'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.smokingRiskAssessment, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstSmokeIndependently = responses[0];
      this.lstInformationSources = responses[1];
      this.lstStopSmoking = responses[2];
      this.lstSmokingPractices = responses[3];
      this.lstMaterialsUnsafely = responses[4];
      this.lstHistoryOfFalling = responses[5];
      this.lstResidentIncontinent = responses[6];
      this.lstSmokingRoom = responses[7];
      this.lstCigarettesAndLighter = responses[8];
      this.lstAccessAnAshtray = responses[9];
      this.lstLightACigarette = responses[10];
      this.lstCigaretteSecurely = responses[11];
      this.lstAshesInAshtray = responses[12];
      this.lstPutOutCigarette = responses[13];
      this.lstEmergencyAssistance = responses[14];
    });

    this.isEditable = this.preSelectedFormData.isEditable;
    if (this.preSelectedFormData.selectedFormID != null) {
      this.SmokingRiskAssessmentFormData = <any>{};
      this.GetSmokingRiskAssessmentDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
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


  GetSmokingRiskAssessmentDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._SmokingRiskServices
      .GetSmokingRiskAssessmentDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};

          
            this.SmokingRiskAssessmentFormData = tdata;
            this.SmokingRiskAssessmentFormData.ReviewDate = this.datePipe.transform(this.SmokingRiskAssessmentFormData.ReviewDate, 'MM/dd/yyyy')

          } else {
            this.SmokingRiskAssessmentFormData = {};

          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }


  saveAsUnfinished() {

    this.SmokingRiskAssessmentFormData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.SmokingRiskAssessmentFormData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.SmokingRiskAssessmentFormData.userId = this.userId;
      this.SmokingRiskAssessmentFormData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.SmokingRiskAssessmentFormData.StartedBy = this.loginId;
      this.SmokingRiskAssessmentFormData.LastEnteredBy = this.loginId;
      this.SmokingRiskAssessmentFormData.ReviewDate = this.datePipe.transform(this.SmokingRiskAssessmentFormData.ReviewDate, 'yyyy-MM-dd');

      const objectBody: any = {
        StatementType: this.StatementType,
        smokingRiskAssessmentForm: this.SmokingRiskAssessmentFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._SmokingRiskServices
        .AddInsertUpdateSmokingRiskAssessmentForm(objectBody)
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
        'Smoking Risk Assessment'
      );
    }
  }



  ResetModel() {
    this.isEditable = true;
    this.SmokingRiskAssessmentFormData = <any>{};
    this.StatementType = 'Insert';
  }

  SaveAsPDF() { }

}

