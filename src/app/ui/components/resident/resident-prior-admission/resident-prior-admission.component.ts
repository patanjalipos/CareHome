import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';


@Component({
  selector: 'app-resident-prior-admission',
  templateUrl: './resident-prior-admission.component.html',
  styleUrls: ['./resident-prior-admission.component.scss']
})
export class ResidentPriorAdmissionComponent extends AppComponentBase  implements OnInit {
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  s_userTypeId: any = localStorage.getItem('userTypeId');
  @Input() mode:string='view';
  @Input() userid:any=null;
  @Input() admissionid:any=null;
  lstCountryMaster: any[]=[];
  public ResidentMaster: any = <any>{};
  stlstadmitted: any[];  
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,   
   
  ) { 
    super();
    this.stlstadmitted = [
      { name: 'Private residence', code: 'Private residence' },
      { name: 'Other aged care service', code: 'Other aged care service' },
      { name: 'Hospital', code: 'Hospital' },
      { name: 'Other', code: 'Other' }
    ];
  }

  ngOnInit(): void {
    this.LoadCountryList();    
  }
  ngOnChanges(changes: SimpleChanges): void {  
    if (this.userid != null && this.admissionid != null) {
      this.GetResidentPriorAdmissionById(this.admissionid);
   }
  }

  LoadCountryList() {
    this.unsubscribe.add = this._MasterServices.GetCountryMaster().subscribe({
      next: (data) => {
        if (data.actionResult.success == true) {
          var tdata = JSON.parse(data.actionResult.result);
          tdata = tdata ? tdata : [];
          this.lstCountryMaster = tdata;
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
    if (this.userid != null && this.admissionid != null) {
      this.mode='edit';
      this.GetResidentPriorAdmissionById(this.admissionid);      
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
      this.mode='view';
    }
  }
  setSelectedAdmittedForm(event)
  {
    if(event.value!=='Other')
    this.ResidentMaster.admittedformother="";
  }
  GetResidentPriorAdmissionById(admissionid) {
    this.ResidentMaster.StatementType = "Insert";
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetResidentPriorAdmissionById(admissionid)  
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
      // if (this.ResidentMaster.email !== null && this.ResidentMaster.email == undefined) {
      //   this._UtilityService.showWarningAlert("Please enter valid email id.");
      //   return;
      // }      
      this.ResidentMaster.userid = this.userid;
      this.ResidentMaster.residentadmissioninfoid = this.admissionid;
      this.ResidentMaster.modifiedby = localStorage.getItem('userId');
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateResidentPriorAdmission(this.ResidentMaster)
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
    this.mode='view'
  }

}
