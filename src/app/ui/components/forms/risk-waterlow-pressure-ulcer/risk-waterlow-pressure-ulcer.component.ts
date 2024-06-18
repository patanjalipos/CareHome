import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { RiskWaterlowPressureUlcerService } from './risk-waterlow-pressure-ulcer.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-risk-waterlow-pressure-ulcer',
  templateUrl: './risk-waterlow-pressure-ulcer.component.html',
  styleUrls: ['./risk-waterlow-pressure-ulcer.component.scss']
})
export class RiskWaterlowPressureUlcerComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  RiskAssessmentWaterFlowPressureFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstWeightLoss: any[] = []
  lstAppetite: any[] = []
  lstBMI: any[] = []
  lstSkinRiskAreas: any[] = []
  lstSexOrAge: any[] = []
  lstSpecialRisks: any[] = []
  lstContinence: any[] = []
  lstMobility: any[] = []
  lstNeurologicalDeficit: any[] = []
  lstMajorMedication: any[] = []
  lstUlcerRiskRating: any[] = []

  constructor(private _ConstantServices: ConstantsService, private route: ActivatedRoute, private _UtilityService: UtilityService, private _UserServices: UserService, private _RiskAssWaterlow: RiskWaterlowPressureUlcerService) {

    super();

    this._ConstantServices.ActiveMenuName = "Care Assessment Hearing Form";
    this.loginId = localStorage.getItem('userId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.RiskAssessmentWaterFlowPressureFormsData = <any>{};
      this.GetRiskAssessmentWaterFlowPressureDetails(
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
    this.residentAdmissionInfoId =
      this.preSelectedFormData.residentAdmissionInfoId;
    this.isEditable = this.preSelectedFormData.isEditable;
    const collectionNames = [
      'WeightLoss',
      'Appetite',
      'BMI',
      'SkinRiskAreas',
      'SexOrAge',
      'SpecialRisks',
      'Continence',
      'Mobility',
      'NeurologicalDeficit',
      'MajorMedication',
      'UlcerRiskRating'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.RiskAssessmentWaterlow, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstWeightLoss = responses[0];
      this.lstAppetite = responses[1];
      this.lstBMI = responses[2];
      this.lstSkinRiskAreas = responses[3];
      this.lstSexOrAge = responses[4];
      this.lstSpecialRisks = responses[5];
      this.lstContinence = responses[6];
      this.lstMobility = responses[7];
      this.lstNeurologicalDeficit = responses[8];
      this.lstMajorMedication = responses[9];
      this.lstUlcerRiskRating = responses[10];
    });

    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.RiskAssessmentWaterFlowPressureFormsData = <any>{};
      this.GetRiskAssessmentWaterFlowPressureDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  SaveAsPDF() { }

  GetRiskAssessmentWaterFlowPressureDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._RiskAssWaterlow
      .GetRiskAssessmentWaterlowPressureDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};
            this.RiskAssessmentWaterFlowPressureFormsData = tdata;

          } else {
            this.RiskAssessmentWaterFlowPressureFormsData = {};
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

    this.RiskAssessmentWaterFlowPressureFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.RiskAssessmentWaterFlowPressureFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    debugger
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.RiskAssessmentWaterFlowPressureFormsData.userId = this.userId;
      this.RiskAssessmentWaterFlowPressureFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.RiskAssessmentWaterFlowPressureFormsData.StartedBy = this.loginId;
      this.RiskAssessmentWaterFlowPressureFormsData.LastEnteredBy = this.loginId;

      const objectBody: any = {
        StatementType: this.StatementType,
        riskAssWaterlowPressureForm: this.RiskAssessmentWaterFlowPressureFormsData,
      };


      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._RiskAssWaterlow
        .AddInsertUpdateRiskAssessmentWaterlowPressureForm(
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
    this.RiskAssessmentWaterFlowPressureFormsData = <any>{};
    this.StatementType = 'Insert';
  }

}
