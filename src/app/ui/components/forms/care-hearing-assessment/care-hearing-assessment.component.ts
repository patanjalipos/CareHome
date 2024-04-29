import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareHearingAssessmentService } from './care-hearing-assessment.service';

@Component({
  selector: 'app-care-hearing-assessment',
  templateUrl: './care-hearing-assessment.component.html',
  styleUrls: ['./care-hearing-assessment.component.scss']
})
export class CareHearingAssessmentComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  CareAssessmentHearingFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstHearingDiagnosisCheck:any[] = []
  lstCurrentHearingDiagnosis:any[] = []
  lstHearingInterventions:any[] = []
  lstHearingAids:any[] = []
  lstAidsAssistance:any[] = []
  lstGoalsToHearing:any[] = []

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _CareHearing:CareHearingAssessmentService) {

    super(); 

    this._ConstantServices.ActiveMenuName = "Care Assessment Hearing Form";
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
      this.CareAssessmentHearingFormsData = <any>{};
        this.GetCareAssessmentHearingDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }


  ngOnInit(): void {

    this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentHearingFormsData = <any>{};
        this.GetCareAssessmentHearingDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  this.GetAidsAssistance()
  this.GetCurrentHearingDiagnosis()
  this.GetGoalsToHearing()
  this.GetHearingAids()
  this.GetHearingDiagnosisCheck()
  this.GetHearingInterventions()
  }

  GetCareAssessmentHearingDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareHearing
        .GetCareAssessmentHearingDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    console.log(tdata)
                    this.CareAssessmentHearingFormsData = tdata;
                    console.log(this.CareAssessmentHearingFormsData.CareAssessmentHearingFormId)
                    // console.log(this.CareAssessmentHearingFormsData.HearingDiagnosisCheck);
                    
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

GetHearingDiagnosisCheck() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareHearing
      .GetHearingDiagnosisCheck(1)
      .subscribe({
          next: (data) => {
            // console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstHearingDiagnosisCheck = tdata;
                  // console.log(this.lstHearingDiagnosisCheck)
              } else {
                  this.lstHearingDiagnosisCheck = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetCurrentHearingDiagnosis() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareHearing
      .GetCurrentHearingDiagnosis(1)
      .subscribe({
          next: (data) => {
            // console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstCurrentHearingDiagnosis = tdata;
                  // console.log(this.lstHearingDiagnosisCheck)
              } else {
                  this.lstCurrentHearingDiagnosis = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetHearingInterventions() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareHearing
      .GetHearingInterventions(1)
      .subscribe({
          next: (data) => {
            // console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstHearingInterventions = tdata;
                  // console.log(this.lstHearingDiagnosisCheck)
              } else {
                  this.lstHearingInterventions = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetHearingAids() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareHearing
      .GetHearingAids(1)
      .subscribe({
          next: (data) => {
            // console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstHearingAids = tdata;
                  // console.log(this.lstHearingDiagnosisCheck)
              } else {
                  this.lstHearingAids = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetAidsAssistance() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareHearing
      .GetAidsAssistance(1)
      .subscribe({
          next: (data) => {
            // console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstAidsAssistance = tdata;
                  // console.log(this.lstHearingDiagnosisCheck)
              } else {
                  this.lstAidsAssistance = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetGoalsToHearing() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareHearing
      .GetGoalsToHearing(1)
      .subscribe({
          next: (data) => {
            // console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstGoalsToHearing = tdata;
                  // console.log(this.lstHearingDiagnosisCheck)
              } else {
                  this.lstGoalsToHearing = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
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
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.CareAssessmentHearingFormsData.userId = this.userId;
    this.CareAssessmentHearingFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.CareAssessmentHearingFormsData.StartedBy = this.loginId;
    this.CareAssessmentHearingFormsData.LastEnteredBy = this.loginId;
    
        const objectBody: any = {
          StatementType: this.StatementType,
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
        'Care Assessment Hearing details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.CareAssessmentHearingFormsData = <any>{};
  this.StatementType = 'Insert';
}

}
