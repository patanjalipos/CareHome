import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';

@Component({
  selector: 'app-resident-preferences',
  templateUrl: './resident-preferences.component.html',
  styleUrls: ['./resident-preferences.component.scss']
})
export class ResidentPreferencesComponent extends AppComponentBase implements OnInit {
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  s_userTypeId: any = localStorage.getItem('userTypeId');
  @Input() mode:string='view';
  @Input() userid:any=null;
  @Input() admissionid:any=null;
  public ResidentMaster: any = <any>{};
  stlstfuneralarrangement: any[];
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,   
   
  ) {
    super();
    this.stlstfuneralarrangement = [
      { name: 'Unknown', code: 'Unknown' },
      { name: 'Cremation', code: 'Cremation' },
      { name: 'Burial', code: 'Burial' },
      { name: 'Body to science', code: 'Body to science' }
    ];
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {  
    if (this.userid != null && this.admissionid != null) {
      this.GetResidentPreferencesById(this.admissionid);
   }
  }

  edit()
  {
    if (this.userid != null && this.admissionid != null) {
      this.mode='edit';
      this.GetResidentPreferencesById(this.admissionid);      
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
      this.mode='view';
    }
  }
  GetResidentPreferencesById(admissionid) {
    this.ResidentMaster.StatementType = "Insert";
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetResidentPreferencesById(admissionid)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.ResidentMaster = tdata;            
            this.ResidentMaster.StatementType = "Update";
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
      this.ResidentMaster.userid = this.userid;
      this.ResidentMaster.residentadmissioninfoid = this.admissionid;
      this.ResidentMaster.modifiedby = localStorage.getItem('userId');
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateResidentPreferences(this.ResidentMaster)
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
  }

}
