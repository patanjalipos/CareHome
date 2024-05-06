import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { RiskOnTheMoveService } from './risk-on-the-move.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-risk-on-the-move',
  templateUrl: './risk-on-the-move.component.html',
  styleUrls: ['./risk-on-the-move.component.scss']
})

export class RiskOnTheMoveComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  RiskAssOnTheMoveFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstBearWeight: any[] = [];
  lstPain: any[] = [];
  lstPhysicalConstraints: any[] = [];
  lstPersonFeelings: any[] = [];
  lstManoeuvre: any[] = [];
  lstStand: any[] = [];
  lstPersonalCare: any[] = [];
  lstRiskScore: any[] = [];
  lstWalkCheck: any[] = [];
  lstFeetCheck: any[] = [];
  lstStandCheck: any[] = [];
  lstTransfer: any[] = [];
  lstDressing: any[] = [];
  lstMovingCheck: any[] = [];
  lstSitbackCheck: any[] = [];
  lstBathHelp: any[] = [];
  lstShowerCheck: any[] = [];
  lstVehicleCheck: any[] = [];
  lstStairsManage: any[] = [];
  lstFloorCheck: any[] = [];
  lstEquipment: any[] = [];
  lstAssessPain: any[] = [];
  
  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService,private _MasterServices: MasterService, private _RiskAssOnMove: RiskOnTheMoveService, private datePipte: DatePipe) {
    super();

    this._ConstantServices.ActiveMenuName = "Risk Assessment On The Move Form";
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
      this.RiskAssOnTheMoveFormsData = <any>{};
        this.GetRiskAssOnTheMoveDetails(
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
      'BearWeight',
      'Pain',
      'PhysicalConstraints',
      'PersonFeelings',
      'Manoeuvre',
      'Stand',
      'PersonalCare',
      'RiskScore',
      'WalkCheck',
      'FeetCheck',
      'StandCheck',
      'Transfer',
      'Dressing',
      'MovingCheck',
      'SitbackCheck',
      'BathHelp',
      'ShowerCheck',
      'VehicleCheck',
      'StairsManage',
      'FloorCheck',
      'Equipment',
      'AssessPain'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.RiskAssessmentOntheMove,collectionName,1))).subscribe((responses: any[]) => {
    this.lstBearWeight = responses[0];
    this.lstPain = responses[1];
    this.lstPhysicalConstraints = responses[2];
    this.lstPersonFeelings = responses[3];
    this.lstManoeuvre = responses[4];
    this.lstStand = responses[5];
    this.lstPersonalCare = responses[6];
    this.lstRiskScore = responses[7];
    this.lstWalkCheck = responses[8];
    this.lstFeetCheck = responses[9];
    this.lstStandCheck = responses[10];
    this.lstTransfer   = responses[11];
    this.lstDressing = responses[12];
    this.lstMovingCheck = responses[13];
    this.lstSitbackCheck = responses[14];
    this.lstBathHelp = responses[15];
    this.lstShowerCheck = responses[16];
    this.lstVehicleCheck = responses[17];
    this.lstStairsManage = responses[18];
    this.lstFloorCheck = responses[19];
    this.lstEquipment = responses[20];
    this.lstAssessPain = responses[21];
});

this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.RiskAssOnTheMoveFormsData = <any>{};
        this.GetRiskAssOnTheMoveDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  }

  GetRiskAssOnTheMoveDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._RiskAssOnMove
        .GetRiskAssOnTheMoveDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    console.log(tdata)
                    this.RiskAssOnTheMoveFormsData = tdata;
                    console.log(this.RiskAssOnTheMoveFormsData.CareAssessmentHearingFormId)
                    this.RiskAssOnTheMoveFormsData.ReviewDate = this.datePipte.transform(this.RiskAssOnTheMoveFormsData.ReviewDate,'MM/dd/yyyy');
                    // console.log(this.CareAssessmentHearingFormsData.HearingDiagnosisCheck);
                    
                } else {
                    this.RiskAssOnTheMoveFormsData = {};
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

  this.RiskAssOnTheMoveFormsData.isFormCompleted = false;
  this.Save();
}

completeForm() {
  this.RiskAssOnTheMoveFormsData.isFormCompleted = true;
  this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.RiskAssOnTheMoveFormsData.userId = this.userId;
    this.RiskAssOnTheMoveFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.RiskAssOnTheMoveFormsData.StartedBy = this.loginId;
    this.RiskAssOnTheMoveFormsData.LastEnteredBy = this.loginId;
    this.RiskAssOnTheMoveFormsData.ReviewDate = this.datePipte.transform(this.RiskAssOnTheMoveFormsData.ReviewDate,'yyyy-MM-dd');
    
        const objectBody: any = {
          StatementType: this.StatementType,
          riskAssOnTheMoveForm: this.RiskAssOnTheMoveFormsData
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._RiskAssOnMove
        .InsertUpdateRiskAssOnTheMoveForm(
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
        'Risk Assessment On The Move details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.RiskAssOnTheMoveFormsData = <any>{};
  this.StatementType = 'Insert';
}

}
