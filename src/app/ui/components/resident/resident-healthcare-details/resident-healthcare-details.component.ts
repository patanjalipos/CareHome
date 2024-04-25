import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';

@Component({
  selector: 'app-resident-healthcare-details',
  templateUrl: './resident-healthcare-details.component.html',
  styleUrls: ['./resident-healthcare-details.component.scss']
})
export class ResidentHealthcareDetailsComponent extends AppComponentBase implements OnInit {
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  s_userTypeId: any = localStorage.getItem('userTypeId');
  @Input() mode:string='view';
  @Input() userid:any=null;
  @Input() admissionid:any=null;
  @Output() GetShowAdmissionDetailsModal:EventEmitter<boolean>=new EventEmitter<boolean>();
  public ResidentMaster: any = <any>{};
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,   
   
  ) {
    super();
   }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {  
    if (this.userid != null && this.admissionid != null) {
       this.GetResidentHealthCareById(this.admissionid);
    }    
  }

  edit()
  {    
    if (this.userid != null && this.admissionid != null) {
      this.mode='edit';
      this.GetResidentHealthCareById(this.admissionid);  
      console.log(this.userid, this.admissionid);    
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
      this.mode='view';
    }
  }
  GetResidentHealthCareById(admissionid) {
    this.ResidentMaster.StatementType = "Insert";
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetResidentHealthCareById(admissionid)  
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
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateResidentHealthCare(this.ResidentMaster)
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
