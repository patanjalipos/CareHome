import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { OralHealthRiskAndOralPlanService } from './oral-health-risk-and-oral-plan.service';

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
  OralHealthRiskFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

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
  
  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _MasterServices: MasterService, private _OralHealth: OralHealthRiskAndOralPlanService) {

    super();

    this._ConstantServices.ActiveMenuName = "Oral Health Risk And Oral Plan Form";
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
    this.isEditable = this.preSelectedFormData.isEditable;
    
    if (this.preSelectedFormData.selectedFormID != null) {
      this.OralHealthRiskFormsData = <any>{};
        this.GetOralHealthRiskDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  ngOnInit(): void {

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

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.OralHealthRiskAssessment,collectionName,1))).subscribe((responses: any[]) => {
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
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  }

  SaveAsPDF() {}

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
                    console.log(tdata)
                    this.OralHealthRiskFormsData = tdata;
                    console.log(this.OralHealthRiskFormsData.CareAssessmentHearingFormId)
                    // console.log(this.CareAssessmentHearingFormsData.HearingDiagnosisCheck);
                    
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

getDropdownMasterLists(formMasterId: string, dropdownName: string,status:number): Observable<any> {
  this._UtilityService.showSpinner();
  return this._MasterServices.GetDropDownMasterList(formMasterId,dropdownName, status).pipe(
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
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.OralHealthRiskFormsData.userId = this.userId;
    this.OralHealthRiskFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.OralHealthRiskFormsData.StartedBy = this.loginId;
    this.OralHealthRiskFormsData.LastEnteredBy = this.loginId;
    
        const objectBody: any = {
          StatementType: this.StatementType,
          oralHealthRiskForm: this.OralHealthRiskFormsData
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._OralHealth
        .InsertUpdateOralHealthRiskForm(
            objectBody
        )
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true){
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
  this.StatementType = 'Insert';
}

}
