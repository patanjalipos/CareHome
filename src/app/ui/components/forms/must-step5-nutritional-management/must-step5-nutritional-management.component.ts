import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { MustStep5NutritionalManagementService } from './must-step5-nutritional-management.service';

@Component({
  selector: 'app-must-step5-nutritional-management',
  templateUrl: './must-step5-nutritional-management.component.html',
  styleUrls: ['./must-step5-nutritional-management.component.scss']
})
export class MustStep5NutritionalManagementComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  NutritionalManagementFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstNutritionalProblems: any[] = [];
  lstNutritionalAims: any[] = [];
  lstInterventions: any[] = [];

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _MasterServices : MasterService, private datePipe: DatePipe,private _Nutritional: MustStep5NutritionalManagementService) {

    super();
    this._ConstantServices.ActiveMenuName = "Nutritional Management Plan Form";
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
      this.NutritionalManagementFormsData = <any>{};
        this.GetNutritionalManagementDetails(
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
      'NutritionalProblems',
      'NutritionalAims',
      'Interventions'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.MUSTStep5NutritionalManagement,collectionName,1))).subscribe((responses: any[]) => {
      this.lstNutritionalProblems = responses[0];
      this.lstNutritionalAims = responses[1];
      this.lstInterventions = responses[2];
  });

    this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.NutritionalManagementFormsData = <any>{};
        this.GetNutritionalManagementDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  }

  GetNutritionalManagementDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._Nutritional
        .GetNutritionalManagementDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    console.log(tdata)
                    this.NutritionalManagementFormsData = tdata;
                    console.log(this.NutritionalManagementFormsData.CareAssessmentHearingFormId)
                    this.NutritionalManagementFormsData.ReviewDate = this.datePipe.transform(this.NutritionalManagementFormsData.ReviewDate,'MM/dd/yyyy');
                    
                    // console.log(this.CareAssessmentHearingFormsData.HearingDiagnosisCheck);
                    
                } else {
                    this.NutritionalManagementFormsData = {};
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

this.NutritionalManagementFormsData.isFormCompleted = false;
this.Save();
}

completeForm() {
this.NutritionalManagementFormsData.isFormCompleted = true;
this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.NutritionalManagementFormsData.userId = this.userId;
    this.NutritionalManagementFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.NutritionalManagementFormsData.StartedBy = this.loginId;
    this.NutritionalManagementFormsData.LastEnteredBy = this.loginId;
    this.NutritionalManagementFormsData.ReviewDate = this.datePipe.transform(this.NutritionalManagementFormsData.ReviewDate,'yyyy-MM-dd');
    
        const objectBody: any = {
          StatementType: this.StatementType,
          nutritionalManagementPlanForm: this.NutritionalManagementFormsData,
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._Nutritional
        .InsertUpdateNutritionalManagementForm(
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
        'Nutritional Management Plan details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.NutritionalManagementFormsData = <any>{};
  this.StatementType = 'Insert';
}

}
