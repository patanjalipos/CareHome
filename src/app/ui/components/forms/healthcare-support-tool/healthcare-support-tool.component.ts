import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { HealthcareSupportToolService } from './healthcare-support-tool.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-healthcare-support-tool',
  templateUrl: './healthcare-support-tool.component.html',
  styleUrls: ['./healthcare-support-tool.component.scss']
})
export class HealthcareSupportToolComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  HealthcareSupportFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstContactReason: any[] = [];
  lstHealthSign: any[] = [];
  lstPersonCheck: any[] = [];

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _UserServices : UserService, private _Healthcare: HealthcareSupportToolService) {

    super();
    this._ConstantServices.ActiveMenuName = "Healthcare Support Tool Form";
    this.loginId = localStorage.getItem('userId');
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    
    if (this.preSelectedFormData.selectedFormID != null) {
      this.HealthcareSupportFormsData = <any>{};
        this.GetHealthcareSupportDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  ngOnInit(): void {

    this.userId = this.preSelectedFormData.userId;
    this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

    const collectionNames = [
      'ContactReason',
      'HealthSign',
      'PersonCheck'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.HealthCareSupport,collectionName,1))).subscribe((responses: any[]) => {
      this.lstContactReason = responses[0];
      this.lstHealthSign = responses[1];
      this.lstPersonCheck = responses[2];
  });

    this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.HealthcareSupportFormsData = <any>{};
        this.GetHealthcareSupportDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  }

  SaveAsPDF() {}

  GetHealthcareSupportDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._Healthcare
        .GetHealthcareSupportDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    console.log(tdata)
                    this.HealthcareSupportFormsData = tdata;
                    
                } else {
                    this.HealthcareSupportFormsData = {};
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
          alert(error.message);
          return of([]); // Returning empty array in case of error
      })
  );
}



saveAsUnfinished() {

this.HealthcareSupportFormsData.isFormCompleted = false;
this.Save();
}

completeForm() {
this.HealthcareSupportFormsData.isFormCompleted = true;
this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.HealthcareSupportFormsData.userId = this.userId;
    this.HealthcareSupportFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.HealthcareSupportFormsData.StartedBy = this.loginId;
    this.HealthcareSupportFormsData.LastEnteredBy = this.loginId;
    
        const objectBody: any = {
          StatementType: this.StatementType,
          healthcareSupportForm: this.HealthcareSupportFormsData,
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._Healthcare
        .InsertUpdateHealthcareSupportForm(
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
        'Healthcare Support Tool details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.HealthcareSupportFormsData = <any>{};
  this.StatementType = 'Insert';
}

}
