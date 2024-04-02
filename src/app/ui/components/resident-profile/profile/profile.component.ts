import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  @Input() residentadmissiondetails: any = <any>{};
  loginId: any = localStorage.getItem('userId');
  lstResidentIndicators:any[]=[];
  rowGroupMetadata: any;
  public ResidentMaster: any = <any>{};
  isEditable:boolean=true;
  likemode: string = 'view';
  activitymode: string = 'view';
  appointmentmode: string = 'view';
  constructor(private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService) { 
      super();
    }

    ngOnInit(): void {      
      if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
        this.isEditable = false;
      }
    }
  
    ngOnChanges(changes: SimpleChanges): void {        
      if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
        this.GetClinicalIndicatorById(this.admissionid);
      if(this.residentadmissiondetails){
        this.ResidentMaster.Likes=this.residentadmissiondetails?.Likes;
        this.ResidentMaster.Dislikes=this.residentadmissiondetails?.Dislikes;
        this.ResidentMaster.Hobbies=this.residentadmissiondetails?.Hobbies;
        this.ResidentMaster.Activity=this.residentadmissiondetails?.Activity;
        this.ResidentMaster.Appointment=this.residentadmissiondetails?.Appointment;
      }

      }
    }

    GetClinicalIndicatorById(admissionid) {
      this._UtilityService.showSpinner();   
      this.unsubscribe.add = this._MasterServices.GetClinicalIndicatorById(admissionid,true)  
        .subscribe({
          next:(data) => {
            this._UtilityService.hideSpinner();          
            if (data.actionResult.success == true) {
              var tdata = JSON.parse(data.actionResult.result);
              tdata = tdata ? tdata : [];
              this.lstResidentIndicators = tdata; 
              this.updateRowGroupMetaData();          
            }
          },
          error: (e) => {
            this.rowGroupMetadata = {};
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(e.message);
          },
        });
    } 
    
    updateRowGroupMetaData() {
      this.rowGroupMetadata = {};
      if (this.lstResidentIndicators) {
        for (let i = 0; i < this.lstResidentIndicators.length; i++) {
          let rowData = this.lstResidentIndicators[i];
          let GroupName = rowData.GroupName;
          if (i == 0) {
            this.rowGroupMetadata[GroupName] = { index: 0, size: 1 };
          }
          else {
            let previousRowData = this.lstResidentIndicators[i - 1];
            let previousRowGroup = previousRowData.GroupName;
            if (GroupName === previousRowGroup)
              this.rowGroupMetadata[GroupName].size++;
            else
              this.rowGroupMetadata[GroupName] = { index: i, size: 1 };
          }
        }
        //console.log("data---", this.rowGroupMetadata)      
      }    
    }
  likeedit() {
    this.likemode = 'edit';
  }
  likeclose() {
    this.likemode = 'view';
  }
  activityedit() {
    this.activitymode = 'edit';
  }
  activityclose() {
    this.activitymode = 'view';
  }
  appointmentedit() {
    this.appointmentmode = 'edit';
  }
  appointmentclose() {
    this.appointmentmode = 'view';
  }
  updateResident() {
    if (this.userid != null && this.admissionid != null) {      
      this.ResidentMaster.UserId = this.userid;
      this.ResidentMaster.ResidentAdmissionInfoId = this.admissionid;
      this.ResidentMaster.ModifiedBy = localStorage.getItem('userId');
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.UpdateResidentAdmissionProfile(this.ResidentMaster)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.activitymode = 'view';
            this.likemode = 'view';
            this.appointmentmode = 'view';
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
 
}
