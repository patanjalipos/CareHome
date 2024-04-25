import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-alert-preferences',
  templateUrl: './alert-preferences.component.html',
  styleUrls: ['./alert-preferences.component.scss']
})
export class AlertPreferencesComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  loginId: any = localStorage.getItem('userId');
  Clinical: any = <any>{};
  lstResidentAlert: any[] = [];
  rowGroupMetadata: any;
  isEditable: boolean = true;
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices: MasterService,
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
      this.GetClinicalAlertPreferencesById(this.admissionid);
    }
  }

  edit() {
    this.mode = 'edit';
    if (this.userid != null && this.admissionid != null) {
      this.GetClinicalAlertPreferencesById(this.admissionid);
    }
    else {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  OnEnabled(id) {

    if (id != null && id != undefined) {
      var Idx = this.lstResidentAlert.findIndex(f => f.ClinicalAlertPreferencesId == id);
      if (Idx >= 0) {
        this.lstResidentAlert[Idx].ModifiedBy = this.loginId;
      }
    }
  }

  GetClinicalAlertPreferencesById(admissionid) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetClinicalAlertPreferencesById(admissionid)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstResidentAlert = tdata;
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
    if (this.lstResidentAlert) {
      for (let i = 0; i < this.lstResidentAlert.length; i++) {
        let rowData = this.lstResidentAlert[i];
        let AlertHeadName = rowData.AlertHeadName;
        if (i == 0) {
          this.rowGroupMetadata[AlertHeadName] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.lstResidentAlert[i - 1];
          let previousRowGroup = previousRowData.AlertHeadName;
          if (AlertHeadName === previousRowGroup)
            this.rowGroupMetadata[AlertHeadName].size++;
          else
            this.rowGroupMetadata[AlertHeadName] = { index: i, size: 1 };
        }
      }
      //console.log("data---", this.rowGroupMetadata)      
    }
  }
  save() {
    if (this.userid != null && this.admissionid != null) {
      this.Clinical.UserId = this.userid;
      this.Clinical.ResidentAdmissionInfoId = this.admissionid;
      this.Clinical.ModifiedBy = this.loginId;
      var selectedExtraItemDetails = [];
      var result = this.lstResidentAlert.filter(f => f.Isenable == true || f.ClinicalAlertPreferencesId != null);
      result.forEach(x => {
        var jsonObject = {
          "ClinicalAlertPreferencesId": x.ClinicalAlertPreferencesId,
          "AlertMasterId": x.AlertMasterId,
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
      this.Clinical.alertDTOs = selectedExtraItemDetails;
      //console.log('Clinical', this.Clinical);
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateAlertPreferences(this.Clinical)
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
    else {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  close() {
    this.mode = 'view';
    this.GetClinicalAlertPreferencesById(this.admissionid);
  }
}

