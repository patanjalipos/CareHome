import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-acute-care-plan-infection-prevention-and-control',
  templateUrl: './acute-care-plan-infection-prevention-and-control.component.html',
  styleUrls: ['./acute-care-plan-infection-prevention-and-control.component.scss']
})
export class AcuteCarePlanInfectionPreventionAndControlComponent extends AppComponentBase implements OnInit {
  customDateFormat = CustomDateFormat;
  AcuteCarePlanInfectionFormsData: any = <any>{};
   //Form which is selected to edit or view

  isEditable: boolean; //Need to be passed from form Dashboard
  StatementType: string = null;

  //Patient Details
  userId: any;
  residentAdmissionInfoId: any;
  //CreatedBy or ModifiedBy
  loginId: any;
  lstAcuteInfection:any[]=[];
  lstActuteStratagy:any[]=[];
  lstActuteOutCome:any[]=[];
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private _DataService: DataService
  ) {
    super();
        this._ConstantServices.ActiveMenuName = 'Acute Care Plan Infection Prevention and Control Form';

        this.loginId = '6368fd74757dbcfdbbb1ce4c'; //localStorage.getItem('userId');

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
      this.AcuteCarePlanInfectionFormsData = <any>{};
      this.GetAcuteCarePlanFormByid(
          this.preSelectedFormData.selectedFormID
      );

      this.StatementType = 'Update';
  } else {
      this.ResetModel();
  }
  }
  ngOnInit(): void {
    this.GetActuteInfectionMaster();
    this.GetActuteStrategiesMaster();
    this.GetActuteOutcomeTreatmentMaster();

//     this._DataService.data$.subscribe((data) => {
//       this.preSelectedFormData = data;
//   });

  this.isEditable = this.preSelectedFormData.isEditable;

  if (this.preSelectedFormData.selectedFormID != null) {
      this.AcuteCarePlanInfectionFormsData = <any>{};
      this.GetAcuteCarePlanFormByid(
          this.preSelectedFormData.selectedFormID
      );

      this.StatementType = 'Update';
  } else {
      this.ResetModel();
  }
  }
  ResetModel() {
    this.preSelectedFormData=<any>{};
    this.isEditable = true;
    this.AcuteCarePlanInfectionFormsData = <any>{};
    this.StatementType = 'Insert';
}
GetAcuteCarePlanFormByid(formId: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices
      .GetAcuteCarePlanFormByid(formId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.AcuteCarePlanInfectionFormsData = tdata;
                  //console.log(this.PreAdmissionAssessmentFormsData);
              } else {
                  this.AcuteCarePlanInfectionFormsData = {};
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetActuteStrategiesMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices
      .GetActuteStrategiesMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstActuteStratagy = tdata;
                  //console.log(this.PreAdmissionAssessmentFormsData);
              } else {
                  this.lstActuteStratagy = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetActuteOutcomeTreatmentMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices
      .GetActuteOutcomeTreatmentMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstActuteOutCome = tdata;
                  //console.log(this.PreAdmissionAssessmentFormsData);
              } else {
                  this.lstActuteOutCome = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
GetActuteInfectionMaster() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices
      .GetActuteInfectionMaster(0)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.lstAcuteInfection = tdata;
                  //console.log(this.PreAdmissionAssessmentFormsData);
              } else {
                  this.lstAcuteInfection = [];
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
  this.AcuteCarePlanInfectionFormsData.isFormCompleted = false;
  this.Save();
}
Save() {
  if (this.userId != null && this.residentAdmissionInfoId != null) {
      this.AcuteCarePlanInfectionFormsData.userId = this.userId;
      this.AcuteCarePlanInfectionFormsData.StartedBy=localStorage.getItem('userId');
      this.AcuteCarePlanInfectionFormsData.LastEnteredBy=localStorage.getItem('userId');
      this.AcuteCarePlanInfectionFormsData.residentAdmissionInfoId = this.residentAdmissionInfoId;

      const objectBody: any = {
          StatementType: this.StatementType,
          AcuteCareForm: this.AcuteCarePlanInfectionFormsData,
      };
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices
          .InsertUpdateAcuteCarePlanForm(objectBody)
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
    this.AcuteCarePlanInfectionFormsData.isFormCompleted = true;
    this.Save();
}
}
