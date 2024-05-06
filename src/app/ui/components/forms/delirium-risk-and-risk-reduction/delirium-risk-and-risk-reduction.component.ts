import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { DeliriumRiskAndRiskReductionService } from './delirium-risk-and-risk-reduction.service';

@Component({
  selector: 'app-delirium-risk-and-risk-reduction',
  templateUrl: './delirium-risk-and-risk-reduction.component.html',
  styleUrls: ['./delirium-risk-and-risk-reduction.component.scss']
})

export class DeliriumRiskAndRiskReductionComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  DeliriumRiskFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstDeliriumRiskCheck: any[] = [];
  lstDisorientationPrevention: any[] = [];
  lstDeliriumDueToHydrationPrevention: any[] = [];
  lstDeliriumDueToSurgeryPrevention: any[] = [];
  lstDeliriumDueToInfectionPrevention: any[] = [];
  lstDeliriumPreventionPlan: any[] = [];
  lstDeliriumDueToSensoryImpairmentPrevention: any[] = [];
  lstDeliriumDueToSleepDisturbancePrevention: any[] = [];
  
  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _MasterServices: MasterService, private _DeliriumRisk: DeliriumRiskAndRiskReductionService) {

    super();

    this._ConstantServices.ActiveMenuName = "Delirium Risk And Risk Reduction Form";
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
      this.DeliriumRiskFormsData = <any>{};
        this.GetDeliriumRiskDetails(
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
      'DeliriumRiskCheck',
      'DisorientationPrevention',
      'DeliriumDueToHydrationPrevention',
      'DeliriumDueToSurgeryPrevention',
      'DeliriumDueToInfectionPrevention',
      'DeliriumPreventionPlan',
      'DeliriumDueToSensoryImpairmentPrevention',
      'DeliriumDueToSleepDisturbancePrevention'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.Deliriumrisk,collectionName,1))).subscribe((responses: any[]) => {
    this.lstDeliriumRiskCheck = responses[0];
    this.lstDisorientationPrevention = responses[1];
    this.lstDeliriumDueToHydrationPrevention = responses[2];
    this.lstDeliriumDueToSurgeryPrevention = responses[3];
    this.lstDeliriumDueToInfectionPrevention = responses[4];
    this.lstDeliriumPreventionPlan = responses[5];
    this.lstDeliriumDueToSensoryImpairmentPrevention = responses[6];
    this.lstDeliriumDueToSleepDisturbancePrevention = responses[7];
});

this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.DeliriumRiskFormsData = <any>{};
        this.GetDeliriumRiskDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  }

  GetDeliriumRiskDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._DeliriumRisk
        .GetDeliriumRiskDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    console.log(tdata)
                    this.DeliriumRiskFormsData = tdata;
                    console.log(this.DeliriumRiskFormsData.CareAssessmentHearingFormId)
                    // console.log(this.CareAssessmentHearingFormsData.HearingDiagnosisCheck);
                    
                } else {
                    this.DeliriumRiskFormsData = {};
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

  this.DeliriumRiskFormsData.isFormCompleted = false;
  this.Save();
}

completeForm() {
  this.DeliriumRiskFormsData.isFormCompleted = true;
  this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.DeliriumRiskFormsData.userId = this.userId;
    this.DeliriumRiskFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.DeliriumRiskFormsData.StartedBy = this.loginId;
    this.DeliriumRiskFormsData.LastEnteredBy = this.loginId;
    
        const objectBody: any = {
          StatementType: this.StatementType,
          deliriumRiskForm: this.DeliriumRiskFormsData
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._DeliriumRisk
        .InsertUpdateDeliriumRiskForm(
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
        'Delirium Risk And Risk Reduction details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.DeliriumRiskFormsData = <any>{};
  this.StatementType = 'Insert';
}

}
