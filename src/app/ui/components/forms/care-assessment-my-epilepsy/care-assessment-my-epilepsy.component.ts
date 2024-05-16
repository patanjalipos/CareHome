import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareAssessmentMyEpilepsyService } from './care-assessment-my-epilepsy.service';

@Component({
  selector: 'app-care-assessment-my-epilepsy',
  templateUrl: './care-assessment-my-epilepsy.component.html',
  styleUrls: ['./care-assessment-my-epilepsy.component.scss']
})
export class CareAssessmentMyEpilepsyComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  EpilepsySupportFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstEpilepsyType  : any[] = [];
  lstSeizures: any[] = [];
  lstTonicClonicSeizures: any[] = [];
  lstFocalSeizuresCheck: any[] = [];
  lstTestCheck: any[] = [];
  lstEpilepsyTreatment: any[] = [];
  lstEmergencyMedication: any[] = [];
  lstSeizuresAffect: any[] = [];

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _MasterServices: MasterService,private _Epilepsy: CareAssessmentMyEpilepsyService) {

    super();

    this._ConstantServices.ActiveMenuName = "Care Assessment Epilepsy Support Plan Form";
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
      this.EpilepsySupportFormsData = <any>{};
        this.GetEpilepsySupportDetails(
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
      'EpilepsyType',
      'Seizures',
      'TonicClonicSeizures',
      'FocalSeizuresCheck',
      'TestCheck',
      'EpilepsyTreatment',
      'EmergencyMedication',
      'SeizuresAffect'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.CareAssessmentMyEpilepsySupport,collectionName,1))).subscribe((responses: any[]) => {
    this.lstEpilepsyType = responses[0];
    this.lstSeizures = responses[1];
    this.lstTonicClonicSeizures = responses[2];
    this.lstFocalSeizuresCheck = responses[3];
    this.lstTestCheck = responses[4];
    this.lstEpilepsyTreatment = responses[5];
    this.lstEmergencyMedication = responses[6];
    this.lstSeizuresAffect = responses[7];
});

this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.EpilepsySupportFormsData = <any>{};
        this.GetEpilepsySupportDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  }

  SaveAsPDF() {}

  GetEpilepsySupportDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._Epilepsy
        .GetEpilepsySupportDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    console.log(tdata)
                    this.EpilepsySupportFormsData = tdata;
                } else {
                    this.EpilepsySupportFormsData = {};
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

  this.EpilepsySupportFormsData.isFormCompleted = false;
  this.Save();
}

completeForm() {
  this.EpilepsySupportFormsData.isFormCompleted = true;
  this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.EpilepsySupportFormsData.userId = this.userId;
    this.EpilepsySupportFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.EpilepsySupportFormsData.StartedBy = this.loginId;
    this.EpilepsySupportFormsData.LastEnteredBy = this.loginId;
    
        const objectBody: any = {
          StatementType: this.StatementType,
          careAssEpilepsySupportForm: this.EpilepsySupportFormsData
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._Epilepsy
        .InsertUpdateEpilepsySupportForm(
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
        'Care Assessment Epilepsy Support Plan details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.EpilepsySupportFormsData = <any>{};
  this.StatementType = 'Insert';
}

}
