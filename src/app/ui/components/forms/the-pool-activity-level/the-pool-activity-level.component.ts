import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { ThePoolActivityLevelService } from './the-pool-activity-level.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-the-pool-activity-level',
  templateUrl: './the-pool-activity-level.component.html',
  styleUrls: ['./the-pool-activity-level.component.scss']
})
export class ThePoolActivityLevelComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  PoolActivityFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  statementType: string = null;

  lstBathingAndWashing  : any[] = [];
  lstDressed: any[] = [];
  lstEating: any[] = [];
  lstContact: any[] = [];
  lstGroupworkSkills: any[] = [];
  lstCommSkills: any[] = [];
  lstPracticalActivities: any[] = [];
  lstObjectUse: any[] = [];
  lstNewspaperCheck: any[] = [];
  lstActivityLevel: any[] = [];
  lstPlannedActivityLevel: any[] = [];
  lstExploratoryActivityLevel: any[] = [];
  lstSensoryActivityLevel: any[] = [];
  lstReflexActivityLevel: any[] = [];

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _UserServices: UserService,private _PoolActivity: ThePoolActivityLevelService) {

    super();

    this._ConstantServices.ActiveMenuName = "Pool Activity Level Form";
    this.loginId = localStorage.getItem('userId');
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    
    if (this.preSelectedFormData.selectedFormID != null) {
      this.PoolActivityFormsData = <any>{};
        this.GetPoolActivityDetails(
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
      'BathingAndWashing',
      'Dressed',
      'Eating',
      'Contact',
      'GroupworkSkills',
      'CommSkills',
      'PracticalActivities',
      'ObjectUse',
      'NewspaperCheck',
      'ActivityLevel',
      'PlannedActivityLevel',
      'ExploratoryActivityLevel',
      'SensoryActivityLevel',
      'ReflexActivityLevel'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.ThePoolActivityLevel,collectionName,1))).subscribe((responses: any[]) => {
    this.lstBathingAndWashing = responses[0];
    this.lstDressed = responses[1];
    this.lstEating = responses[2];
    this.lstContact = responses[3];
    this.lstGroupworkSkills = responses[4];
    this.lstCommSkills = responses[5];
    this.lstPracticalActivities = responses[6];
    this.lstObjectUse = responses[7];
    this.lstNewspaperCheck = responses[8];
    this.lstActivityLevel = responses[9];
    this.lstPlannedActivityLevel = responses[10];
    this.lstExploratoryActivityLevel = responses[11];
    this.lstSensoryActivityLevel = responses[12];
    this.lstReflexActivityLevel = responses[13];
});

this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.PoolActivityFormsData = <any>{};
        this.GetPoolActivityDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.statementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  }

  SaveAsPDF() {}

  GetPoolActivityDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._PoolActivity
        .GetPoolActivityDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                  var tdata = data.actionResult.result;
                    tdata = tdata ? tdata : {};
                    this.PoolActivityFormsData = tdata;
                } else {
                    this.PoolActivityFormsData = {};
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
              return response.actionResult.result;
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

  this.PoolActivityFormsData.isFormCompleted = false;
  this.Save();
}

completeForm() {
  this.PoolActivityFormsData.isFormCompleted = true;
  this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.PoolActivityFormsData.userId = this.userId;
    this.PoolActivityFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.PoolActivityFormsData.startedBy = this.loginId;
    this.PoolActivityFormsData.lastEnteredBy = this.loginId;
    
        const objectBody: any = {
          statementType: this.statementType,
          poolActivityForm: this.PoolActivityFormsData
      };

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._PoolActivity
        .InsertUpdatePoolActivityForm(
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
        'Pool Activity Level details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.PoolActivityFormsData = <any>{};
  this.statementType = 'Insert';
}


}
