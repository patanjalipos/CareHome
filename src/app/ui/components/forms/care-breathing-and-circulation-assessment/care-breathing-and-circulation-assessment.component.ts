import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CareBreathingCirculationService } from './care-breathing-circulation.service';
import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/utility/utility.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-care-breathing-and-circulation-assessment',
  templateUrl: './care-breathing-and-circulation-assessment.component.html',
  styleUrls: ['./care-breathing-and-circulation-assessment.component.scss']
})
export class CareBreathingAndCirculationAssessmentComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  CareBreathAssFormsData: any = <any>{};
   //Form which is selected to edit or view

  isEditable: boolean; //Need to be passed from form Dashboard
  StatementType: string = null;

  //Patient Details
  userId: any;
  residentAdmissionInfoId: any;
  //CreatedBy or ModifiedBy
  loginId: any;
  lstBreathDecisionMaster:any[]=[];
  lstCareAssBreathDificultMaster:any[]=[];
  lstCareAssBreathSmokingHabitMaster:any[]=[];
  lstCareAssBreathSmokingActionPlan:any[]=[];
  lstCareAssBreathCoughTypeMaster:any[]=[];
  lstCareAssBreathTracheostomyMaster:any[]=[];
  lstCareAssBreathMachineTypeUsed:any[]=[];
  lstCareAssBreathInHealerTypeMaster:any[]=[];
  lstCareAssBreathCreticalTreatmentMaster:any[]=[];
  lstCareAssBreathGoalsWishesMaster:any[]=[];
  lstCareAssBreathStrategiesMaster:any[]=[];

  constructor(
    private _care_breath:CareBreathingCirculationService,
    private datepipe: DatePipe,
    private _ConstantServices: ConstantsService,
    private route: ActivatedRoute,
    private _UtilityService: UtilityService,
    private _DataService: DataService

  ) { 
    super();
    this._ConstantServices.ActiveMenuName = 'Care Breathing and Curculation Assesment Form';

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

  
  ngOnInit(): void {
    this.GetBreathDecisionMaster();
    this.GetCareAssBreathDificultMaster();
    this.GetCareAssBreathSmokingHabitMaster();
    this.GetCareAssBreathSmokingActionPlan();
    this.GetCareAssBreathCoughTypeMaster();
    this.GetCareAssBreathMachineTypeUsed();
    this.GetCareAssBreathInHealerTypeMaster();
    this.GetCareAssBreathCreticalTreatmentMaster();
    this.GetCareAssBreathGoalsWishesMaster();
    this.GetCareAssBreathStrategiesMaster();
   
    this.isEditable = this.preSelectedFormData.isEditable;

  if (this.preSelectedFormData.selectedFormID != null) {
      this.CareBreathAssFormsData = <any>{};
      this.GetCareBreathCirculationByid(
          this.preSelectedFormData.selectedFormID
      );

      this.StatementType = 'Update';
  } else {
      this.ResetModel();
  }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

  if (this.preSelectedFormData.selectedFormID != null) {
      this.CareBreathAssFormsData = <any>{};
      this.GetCareBreathCirculationByid(
          this.preSelectedFormData.selectedFormID
      );

      this.StatementType = 'Update';
  } else {
      this.ResetModel();
  }
  }
  GetCareBreathCirculationByid(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._care_breath
        .GetCareBreathingCirculationFormById(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    this.CareBreathAssFormsData = tdata;
                    this.CareBreathAssFormsData.NextReviewDate=new Date(this.CareBreathAssFormsData.NextReviewDate);
                    //console.log(this.PreAdmissionAssessmentFormsData);
                } else {
                    this.CareBreathAssFormsData = {};
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
  }
  ResetModel() {
    this.preSelectedFormData=<any>{};
    this.isEditable = true;
    this.CareBreathAssFormsData = <any>{};
    this.StatementType = 'Insert';
}
GetBreathDecisionMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetBreathDecisionMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstBreathDecisionMaster = tdata;
                  //console.log(this.PreAdmissionAssessmentFormsData);
              } else {
                  this.lstBreathDecisionMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathDificultMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathDificultMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathDificultMaster = tdata;
              } else {
                  this.lstCareAssBreathDificultMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathSmokingHabitMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathSmokingHabitMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathSmokingHabitMaster = tdata;
              } else {
                  this.lstCareAssBreathSmokingHabitMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathSmokingActionPlan() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathSmokingActionPlan(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathSmokingActionPlan = tdata;
              } else {
                  this.lstCareAssBreathSmokingActionPlan = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathCoughTypeMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathCoughTypeMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathCoughTypeMaster = tdata;
              } else {
                  this.lstCareAssBreathCoughTypeMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathTracheostomyMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathTracheostomyMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathTracheostomyMaster = tdata;
              } else {
                  this.lstCareAssBreathTracheostomyMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathMachineTypeUsed() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathMachineTypeUsed(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathMachineTypeUsed = tdata;
              } else {
                  this.lstCareAssBreathMachineTypeUsed = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathInHealerTypeMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathInHealerTypeMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathInHealerTypeMaster = tdata;
              } else {
                  this.lstCareAssBreathInHealerTypeMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathCreticalTreatmentMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathCreticalTreatmentMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathCreticalTreatmentMaster = tdata;
              } else {
                  this.lstCareAssBreathCreticalTreatmentMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathGoalsWishesMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathGoalsWishesMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathGoalsWishesMaster = tdata;
              } else {
                  this.lstCareAssBreathGoalsWishesMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetCareAssBreathStrategiesMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._care_breath
      .GetCareAssBreathStrategiesMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstCareAssBreathStrategiesMaster = tdata;
              } else {
                  this.lstCareAssBreathStrategiesMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
saveAsUnfinished()
{
  this.CareBreathAssFormsData.isFormCompleted = false;
  this.Save();
}
Save() {
  if (this.userId != null && this.residentAdmissionInfoId != null) {
      this.CareBreathAssFormsData.userId = this.userId;
      this.CareBreathAssFormsData.StartedBy=localStorage.getItem('userId');
      this.CareBreathAssFormsData.LastEnteredBy=localStorage.getItem('userId');
      this.CareBreathAssFormsData.residentAdmissionInfoId = this.residentAdmissionInfoId;
      this.CareBreathAssFormsData.NextReviewDate=new Date(this.datepipe.transform(this.CareBreathAssFormsData.NextReviewDate,'yyyy-MM-dd'));
      const objectBody: any = {
          StatementType: this.StatementType,
          CareAssBrthCirc: this.CareBreathAssFormsData,
      };
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._care_breath
          .InsertUpdateCareAssBreathCirculationForm(objectBody)
          .subscribe({
              next: (data) => {
                  this._UtilityService.hideSpinner();
                  if (data.actionResult.success == true)
                    {
                      this.EmitUpdateForm.emit(true);
                      this.ResetModel();
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
          'Resident admission details are missing.'
      );
  }
}
completeForm() {
    this.CareBreathAssFormsData.isFormCompleted = true;
    this.Save();
}

}
