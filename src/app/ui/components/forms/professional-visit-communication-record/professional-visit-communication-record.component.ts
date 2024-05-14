import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { ProfessionalVisitCommunicationRecordService } from './professional-visit-communication-record.service';

@Component({
  selector: 'app-professional-visit-communication-record',
  templateUrl: './professional-visit-communication-record.component.html',
  styleUrls: ['./professional-visit-communication-record.component.scss']
})
export class ProfessionalVisitCommunicationRecordComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  ProfVisitFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstCommRelay: any[] = [];
  lstHealthcareType: any[] = [];

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _MasterServices: MasterService,private datePipte: DatePipe,private _ProfVisit: ProfessionalVisitCommunicationRecordService) {

    super();

    this._ConstantServices.ActiveMenuName = "Professional Visit Communication Record Form";
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
      this.ProfVisitFormsData = <any>{};
        this.GetProfessionalVisitDetails(
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
      'CommRelay',
      'HealthcareType'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.ProfessionalVisitCommunicationRecord,collectionName,1))).subscribe((responses: any[]) => {
    this.lstCommRelay = responses[0];
    this.lstHealthcareType = responses[1];
});

this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.ProfVisitFormsData = <any>{};
        this.GetProfessionalVisitDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  }

  SaveAsPDF() {}

  GetProfessionalVisitDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._ProfVisit
        .GetProfessionalVisitDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    console.log(tdata)
                    this.ProfVisitFormsData = tdata;
                    this.ProfVisitFormsData.HealthcareVisitDate = this.datePipte.transform(this.ProfVisitFormsData.HealthcareVisitDate,'MM/dd/yyyy');
                    // console.log(this.CareAssessmentHearingFormsData.HearingDiagnosisCheck);
                    
                } else {
                    this.ProfVisitFormsData = {};
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

  this.ProfVisitFormsData.isFormCompleted = false;
  this.Save();
}

completeForm() {
  this.ProfVisitFormsData.isFormCompleted = true;
  this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.ProfVisitFormsData.userId = this.userId;
    this.ProfVisitFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.ProfVisitFormsData.StartedBy = this.loginId;
    this.ProfVisitFormsData.LastEnteredBy = this.loginId;
    this.ProfVisitFormsData.HealthcareVisitDate = this.datePipte.transform(this.ProfVisitFormsData.HealthcareVisitDate,'yyyy-MM-dd');
    
        const objectBody: any = {
          StatementType: this.StatementType,
          professionalVisitForm: this.ProfVisitFormsData
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._ProfVisit
        .InsertUpdateProfessionalVisitForm(
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
        'Professional Visit Communication Record details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.ProfVisitFormsData = <any>{};
  this.StatementType = 'Insert';
}

}
