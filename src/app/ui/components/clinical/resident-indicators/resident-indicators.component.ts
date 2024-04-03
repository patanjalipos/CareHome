import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-resident-indicators',
  templateUrl: './resident-indicators.component.html',
  styleUrls: ['./resident-indicators.component.scss']
})
export class ResidentIndicatorsComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  loginId:any=localStorage.getItem('userId');
  Clinical: any = <any>{};
  stlststatus:any[]=[];
  status:any=true;
  grouphead:any='';
  lstResidentIndicatorGroups:any[]=[];
  lstResidentIndicators:any[]=[];
  lstResidentIndicatorsFilter:any[]=[];
  isEditable:boolean=true;
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService) 
    { 
    super();
    this.stlststatus = [
      { name: 'All', code: null },
      { name: 'Enabled', code: true },
      { name: 'Disabled', code: false }
    ];
  }

  // async ngOnInit(): Promise<void> {
  //   const data$ = this.careService.getResidentIndicatorList();
  //   this.lstResidentIndicators = await lastValueFrom(data$);
  //   console.log('lstResidentIndicators', this.lstResidentIndicators);    
  // }
  ngOnInit(): void {
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.isEditable = false;
    }
    this.GetIndicatorGroupMaster();
  }

  ngOnChanges(changes: SimpleChanges): void {  
    this.GetIndicatorGroupMaster();
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.GetClinicalIndicatorById(this.admissionid);
    }
  }

  GetIndicatorGroupMaster() {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetIndicatorGroupMaster(true)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstResidentIndicatorGroups = tdata;  
            this.lstResidentIndicatorGroups.unshift({"IndicatorGroupMasterId":"","GroupName":"All"});  
          }
          else {
            this.lstResidentIndicatorGroups = [];            
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  } 
  
  edit()
  {
    this.mode='edit';
    if (this.userid != null && this.admissionid != null) {
      this.GetClinicalIndicatorById(this.admissionid);      
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  filterResidentIndicators()
  {    
    if(this.status!==null)
    {
      this.lstResidentIndicators=JSON.parse(JSON.stringify(this.lstResidentIndicatorsFilter.filter(e => e.Isenable == this.status || e.Isvisible == this.status))); 
    }
    else
    {
      this.lstResidentIndicators=JSON.parse(JSON.stringify(this.lstResidentIndicatorsFilter)); 
    }
    if(this.grouphead!=='')
    {
      this.lstResidentIndicators=JSON.parse(JSON.stringify(this.lstResidentIndicators.filter(e => e.IndicatorGroupMasterId == this.grouphead))); 
    }
  }
  OnEnabled(id)
  {
   
    if(id!=null && id!=undefined)
    {
    var Idx = this.lstResidentIndicators.findIndex(f => f.ClinicalIndicatorId == id);
    var Idx1 = this.lstResidentIndicatorsFilter.findIndex(f => f.ClinicalIndicatorId == id);    
    if (Idx >= 0) {
        this.lstResidentIndicators[Idx].modifiedby = this.loginId;                
      } 
      if (Idx >= 0) {
        this.lstResidentIndicatorsFilter[Idx].modifiedby = this.loginId;                
      }    
    }
  }
  
  GetClinicalIndicatorById(admissionid) {
    this.Clinical.statementtype = "Insert";
    this.lstResidentIndicators = [];   
    this.lstResidentIndicatorsFilter = []; 
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetClinicalIndicatorById(admissionid)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstResidentIndicators = tdata;   
            this.lstResidentIndicatorsFilter = tdata; 
            console.log('lstResidentIndicators1', this.lstResidentIndicators)   
            this.filterResidentIndicators();     
            console.log('lstResidentIndicators', this.lstResidentIndicators)   
            this.Clinical.statementtype = "Update";            
          }
        },
        error: (e) => {
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
      var result=this.lstResidentIndicators.filter(f=>f.Isenable==true || f.Isvisible==true || f.ClinicalIndicatorId!=null);
      result.forEach(x => {
        var jsonObject = {
          "ClinicalIndicatorId": x.ClinicalIndicatorId,
          "IndicatorGroupMasterId": x.IndicatorGroupMasterId,
          "IndicatorMasterId": x.IndicatorMasterId,
          "Isenable": x.Isenable,
          "Isvisible": x.Isvisible,
          "modifiedby": x.modifiedby
        }
        selectedExtraItemDetails.push(jsonObject);      
    });
    //console.log('selectedExtraItemDetails', selectedExtraItemDetails);    
    this.Clinical.indicatorDTOs = selectedExtraItemDetails;
      //console.log('Clinical', this.Clinical);
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateClinicalIndicator(this.Clinical)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
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
    this.GetClinicalIndicatorById(this.admissionid); 
  }
}
