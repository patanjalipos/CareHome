import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { OralHealthRiskAndOralPlanService } from './oral-health-risk-and-oral-plan.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-oral-health-risk-and-oral-plan',
  templateUrl: './oral-health-risk-and-oral-plan.component.html',
  styleUrls: ['./oral-health-risk-and-oral-plan.component.scss']
})
export class OralHealthRiskAndOralPlanComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  OralHealthRiskFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  statementType: string = null;

  lstOralCareSupport: any[] = [];
  lstTeethCheck: any[] = [];
  lstDenturesCheck: any[] = [];
  lstDenturesLabelCheck: any[] = [];
  lstTeethHelp: any[] = [];
  lstHealthCheck: any[] = [];
  lstDentalTreatment: any[] = [];
  lstMedicationCheck: any[] = [];
  lstDryMouthCheck: any[] = [];
  lstDryMouthAction: any[] = [];
  lstSmokeCheck: any[] = [];
  lstDentistReferCheck: any[] = [];
  lstOralHygieneMeasures: any[] = [];
  lstOralCareOutcomes: any[] = [];

  constructor(private _ConstantServices: ConstantsService, private route: ActivatedRoute, private _UtilityService: UtilityService, private _UserServices: UserService, private _OralHealth: OralHealthRiskAndOralPlanService) {

    super();

    this._ConstantServices.ActiveMenuName = "Oral Health Risk And Oral Plan Form";
    this.loginId = localStorage.getItem('userId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.OralHealthRiskFormsData = <any>{};
      this.GetOralHealthRiskDetails(
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
      'OralCareSupport',
      'TeethCheck',
      'DenturesCheck',
      'DenturesLabelCheck',
      'TeethHelp',
      'HealthCheck',
      'DentalTreatment',
      'MedicationCheck',
      'DryMouthCheck',
      'DryMouthAction',
      'SmokeCheck',
      'DentistReferCheck',
      'OralHygieneMeasures',
      'OralCareOutcomes'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.OralHealthRiskAssessment, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstOralCareSupport = responses[0];
      this.lstTeethCheck = responses[1];
      this.lstDenturesCheck = responses[2];
      this.lstDenturesLabelCheck = responses[3];
      this.lstTeethHelp = responses[4];
      this.lstHealthCheck = responses[5];
      this.lstDentalTreatment = responses[6];
      this.lstMedicationCheck = responses[7];
      this.lstDryMouthCheck = responses[8];
      this.lstDryMouthAction = responses[9];
      this.lstSmokeCheck = responses[10];
      this.lstDentistReferCheck = responses[11];
      this.lstOralHygieneMeasures = responses[12];
      this.lstOralCareOutcomes = responses[13];
    });

    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.OralHealthRiskFormsData = <any>{};
      this.GetOralHealthRiskDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  SaveAsPDF() { }

  GetOralHealthRiskDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._OralHealth
      .GetOralHealthRiskDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};

            this.OralHealthRiskFormsData = tdata;

          } else {
            this.OralHealthRiskFormsData = {};
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

    this.OralHealthRiskFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.OralHealthRiskFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    debugger
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.OralHealthRiskFormsData.userId = this.userId;
      this.OralHealthRiskFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.OralHealthRiskFormsData.startedBy = this.loginId;
      this.OralHealthRiskFormsData.lastEnteredBy = this.loginId;

      const objectBody: any = {
        statementType: this.statementType,
        oralHealthRiskForm: this.OralHealthRiskFormsData
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._OralHealth
        .InsertUpdateOralHealthRiskForm(
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
        'Oral Health Risk And Oral Plan details are missing.'
      );
    }
  }


  ResetModel() {
    this.isEditable = true;
    this.OralHealthRiskFormsData = <any>{};
    this.statementType = 'Insert';
  }

}
