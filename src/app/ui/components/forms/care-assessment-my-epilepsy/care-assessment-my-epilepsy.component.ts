import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareAssessmentMyEpilepsyService } from './care-assessment-my-epilepsy.service';
import { UserService } from 'src/app/ui/service/user.service';

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
  statementType: string = null;

  lstEpilepsyType  : any[] = [];
  lstSeizures: any[] = [];
  lstTonicClonicSeizures: any[] = [];
  lstFocalSeizuresCheck: any[] = [];
  lstTestCheck: any[] = [];
  lstEpilepsyTreatment: any[] = [];
  lstEmergencyMedication: any[] = [];
  lstSeizuresAffect: any[] = [];

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _UserServices: UserService,private _Epilepsy: CareAssessmentMyEpilepsyService) {

    super();

    this._ConstantServices.ActiveMenuName = "Care Assessment Epilepsy Support Plan Form";
    this.loginId = localStorage.getItem('userId');
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    
    if (this.preSelectedFormData.selectedFormID != null) {
      this.EpilepsySupportFormsData = <any>{};
        this.GetEpilepsySupportDetails(
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
        this.statementType = 'Update';
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
                  var tdata = data.actionResult.result;
                    tdata = tdata ? tdata : {};
                   
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
  return this._UserServices.GetDropDownMasterList(formMasterId,dropdownName, status).pipe(
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
    this.EpilepsySupportFormsData.startedBy = this.loginId;
    this.EpilepsySupportFormsData.lastEnteredBy = this.loginId;
    
        const objectBody: any = {
          statementType: this.statementType,
          careAssEpilepsySupportForm: this.EpilepsySupportFormsData
      };
      
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
  this.statementType = 'Insert';
}

}
