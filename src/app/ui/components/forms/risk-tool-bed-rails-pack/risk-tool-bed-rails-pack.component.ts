import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { RiskToolBedRailsPackService } from './risk-tool-bed-rails-pack.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-risk-tool-bed-rails-pack',
  templateUrl: './risk-tool-bed-rails-pack.component.html',
  styleUrls: ['./risk-tool-bed-rails-pack.component.scss']
})
export class RiskToolBedRailsPackComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  RiskToolFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  uniqueReferenceId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstBedRailsNotUseRisk: any[] = [];
  lstBedRailsUseRisk: any[] = [];
  lstBedRailUseExceedsBedRailNotUse: any[] = [];
  lstCapacityReason: any[] = [];
  lstMindImpairment: any[] = [];
  lstDecisionLackDueToDisturb: any[] = [];
  lstBedRailsUseDecision: any[] = [];
  lstConsideration: any[] = [];
  lstConsultedStatus: any[] = [];
  lstBedRailsFitRisk: any[] = [];

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _DataService: DataService,private _UserServices: UserService,private _UtilityService: UtilityService, private datePipte: DatePipe,private _RiskTool: RiskToolBedRailsPackService) {

    super();
    this._ConstantServices.ActiveMenuName = "Risk Tool Bed Rails Pack Form";
    this.loginId = localStorage.getItem('userId');
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    
    if (this.preSelectedFormData.selectedFormID != null) {
      this.RiskToolFormsData = <any>{};
        this.GetRiskToolDetails(
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
      'BedRailsNotUseRisk',
      'BedRailsUseRisk',
      'BedRailUseExceedsBedRailNotUse',
      'CapacityReason',
      'MindImpairment',
      'DecisionLackDueToDisturb',
      'BedRailsUseDecision',
      'Consideration',
      'ConsultedStatus',
      'BedRailsFitRisk',
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.RiskToolBedRails,collectionName,1))).subscribe((responses: any[]) => {
    this.lstBedRailsNotUseRisk = responses[0];
    this.lstBedRailsUseRisk = responses[1];
    this.lstBedRailUseExceedsBedRailNotUse = responses[2];
    this.lstCapacityReason = responses[3];
    this.lstMindImpairment = responses[4];
    this.lstDecisionLackDueToDisturb = responses[5];
    this.lstBedRailsUseDecision = responses[6];
    this.lstConsideration = responses[7];
    this.lstConsultedStatus = responses[8];
    this.lstBedRailsFitRisk = responses[9];
});

this.isEditable = this.preSelectedFormData.isEditable;
  
      if (this.preSelectedFormData.selectedFormID != null) {
        this.RiskToolFormsData = <any>{};
          this.GetRiskToolDetails(
              this.preSelectedFormData.selectedFormID
          );
          this.StatementType = 'Update';
      }
      else {
        this.ResetModel();
      }
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

SaveAsPDF() {}

GetRiskToolDetails(formId: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._RiskTool
      .GetRiskToolBedRailsDetails(formId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  this.RiskToolFormsData = tdata;
                  this.RiskToolFormsData.ReviewDate = this.datePipte.transform(this.RiskToolFormsData.ReviewDate,'MM/dd/yyyy')
              } else {
                  this.RiskToolFormsData = {};
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}
saveAsUnfinished() {

this.RiskToolFormsData.isFormCompleted = false;
this.Save();
}

completeForm() {
this.RiskToolFormsData.isFormCompleted = true;
this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.RiskToolFormsData.userId = this.userId;
    this.RiskToolFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.RiskToolFormsData.StartedBy = this.loginId;
    this.RiskToolFormsData.LastEnteredBy = this.loginId;
    this.RiskToolFormsData.ReviewDate = this.datePipte.transform(this.RiskToolFormsData.ReviewDate,'yyyy-MM-dd');
        const objectBody: any = {
          StatementType: this.StatementType,
          riskToolBedRailsForm: this.RiskToolFormsData,
      };
    

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._RiskTool
        .InsertUpdateRiskToolBedRailsForm(
            objectBody
        )
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true){
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
        'Risk Tool Bed Rails Pack details are missing.'
    );
}
}

ResetModel() {
this.isEditable = true;
this.RiskToolFormsData = <any>{};
this.StatementType = 'Insert';
}


}
