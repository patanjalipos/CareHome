import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-fall-risk-assessment',
  templateUrl: './fall-risk-assessment.component.html',
  styleUrls: ['./fall-risk-assessment.component.scss']
})
export class FallRiskAssessmentComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  loginId:any=localStorage.getItem('userId');
  Clinical: any = <any>{};
  lstFallRiskAssessment:any[]=[];
  rowGroupMetadata: any;
  isEditable:boolean=true;
  isrisk:boolean=true;
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService) 
    { 
    super();    
  }

  
  ngOnInit(): void {
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.isEditable = false;
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {  
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.GetClinicalFallRiskAssessmentById(this.admissionid);
    }
  }

  
  
  edit()
  {
    this.mode='edit';
    if (this.userid != null && this.admissionid != null) {
      this.GetClinicalFallRiskAssessmentById(this.admissionid);      
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }  
  OnEnabled(id)
  {
   
    if(id!=null && id!=undefined)
    {
    var Idx = this.lstFallRiskAssessment.findIndex(f => f.ClinicalFallRiskAssessmentId == id);
    if (Idx >= 0) {
        this.lstFallRiskAssessment[Idx].ModifiedBy = this.loginId;                
      }         
    }
  }
  
  GetClinicalFallRiskAssessmentById(admissionid) {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetClinicalFallRiskAssessmentById(admissionid)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstFallRiskAssessment = tdata;                                 
          }
        },
        error: (e) => {
          this.rowGroupMetadata = {};
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }  
  
  save()
  {
    if (this.userid != null && this.admissionid != null) {      
      this.Clinical.UserId = this.userid;
      this.Clinical.ResidentAdmissionInfoId = this.admissionid;
      this.Clinical.ModifiedBy = this.loginId;
      var selectedExtraItemDetails = [];      
      var result=this.lstFallRiskAssessment.filter(f=>f.Isenable==true || f.ClinicalFallRiskAssessmentId!=null);
      console.log('lstFallRiskAssessment', this.lstFallRiskAssessment); 
      console.log('result', result); 
      result.forEach(x => {
        var jsonObject = {
          "ClinicalFallRiskAssessmentId": x.ClinicalFallRiskAssessmentId,
          "FallRiskMasterId": x.FallRiskMasterId,
          "Isenable": x.Isenable,
          "ModifiedBy": x.ModifiedBy
        }
        selectedExtraItemDetails.push(jsonObject);      
    });
    if (selectedExtraItemDetails?.length==0) {
      this._UtilityService.showWarningAlert("Please select atleast one record");
      return;
    }    
    //console.log('selectedExtraItemDetails', selectedExtraItemDetails);    
    this.Clinical.fallriskDTOs = selectedExtraItemDetails;
      //console.log('Clinical', this.Clinical);
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateFallRiskAssessment(this.Clinical)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            if (data.actionResult.success == true)
              this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            else
              this._UtilityService.showWarningAlert(data.actionResult.errMsg);
            this.mode = 'view'
          },
          error: (e) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(e.message);
          },
        });
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  close()
  {
    this.mode='view';
    this.GetClinicalFallRiskAssessmentById(this.admissionid); 
  }
}
