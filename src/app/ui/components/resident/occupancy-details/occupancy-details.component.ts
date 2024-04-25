import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AdmissionStatus, ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';

@Component({
  selector: 'app-occupancy-details',
  templateUrl: './occupancy-details.component.html',
  styleUrls: ['./occupancy-details.component.scss']
})
export class OccupancyDetailsComponent extends AppComponentBase implements OnInit {
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  admissionStatus = AdmissionStatus;
  s_userTypeId: any = localStorage.getItem('userTypeId');
  @Input() mode:string='view';
  @Input() userid:any=null;
  @Input() admissionid:any=null;
  @Output() GetShowAdmissionDetailsModal:EventEmitter<boolean>=new EventEmitter<boolean>();
  today:Date=new Date();
  public ResidentMaster: any = <any>{};
  lstHomeMaster: any[]=[];
  lstLocationMaster: any[]=[];
  stlstadmissionstatus: any[]=[];
  stlstresidency: any[]=[];
  stlstmedication: any[]=[];
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,   
   
  ) {
    super();
    this.stlstadmissionstatus = [
      { name: this.admissionStatus[this.admissionStatus.Active], code: this.admissionStatus.Active },
      { name: this.admissionStatus[this.admissionStatus.Deceased], code: this.admissionStatus.Deceased },
      { name: this.admissionStatus[this.admissionStatus.Discharged], code: this.admissionStatus.Discharged },
      { name: this.admissionStatus[this.admissionStatus.Transferred], code: this.admissionStatus.Transferred },
      { name: this.admissionStatus[this.admissionStatus.WaitListed], code: this.admissionStatus.WaitListed },
      { name: this.admissionStatus[this.admissionStatus.Suspended], code: this.admissionStatus.Suspended },
      { name: this.admissionStatus[this.admissionStatus.Unallocated], code: this.admissionStatus.Unallocated }
    ];
    // this.stlstadmissionstatus = [
    //   { name: this.admissionStatus[this.admissionStatus.Active], code: this.admissionStatus.Active },
    //   { name: this.admissionStatus[this.admissionStatus.WaitListed], code: this.admissionStatus.WaitListed },
    //  ];
     this.stlstresidency = [
      { name: 'Short stay', code: 'Short stay' },
      { name: 'Long stay', code: 'Long stay' },
      { name: 'Day centre', code: 'Day centre' },
      { name: 'Meals on wheels', code: 'Meals on wheels' },
      { name: 'Bathing', code: 'Bathing' },
      { name: 'Laundry', code: 'Laundry' }    
     ];
   }

  ngOnInit(): void {
    this.LoadHomeMaster();
  }
  ngOnChanges(changes: SimpleChanges): void {  
    if (this.userid != null && this.admissionid != null) {
      this.GetResidentOccupancyById(this.admissionid); 
    }    
  }

  LoadHomeMaster() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetHomeMaster(true)
      .subscribe
      ({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstHomeMaster = tdata;  
            console.log('lstHomeMaster',this.lstHomeMaster)          
          }
          else {
            this.lstHomeMaster = [];            
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  onChangeFacility(){
    if(this.ResidentMaster.HomeMasterId!=null && this.ResidentMaster.HomeMasterId!=undefined)
    {
      this.GetLocationMasterByHomeId(this.ResidentMaster.HomeMasterId);
    }
    else
    {
      this.lstLocationMaster=[];
    }
  }  

  GetLocationMasterByHomeId(homemasterid)
  {

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetLocationMasterByHomeId(homemasterid)
      .subscribe
      ({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstLocationMaster = tdata;  
            //console.log('lstLocationMaster',this.lstLocationMaster)          
          }
          else {
            this.lstLocationMaster = [];            
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
      this.GetResidentOccupancyById(this.admissionid);  
      console.log(this.userid, this.admissionid);    
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
      this.mode='view';
    }
  }
  GetResidentOccupancyById(admissionid) {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetResidentOccupancyById(admissionid)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.ResidentMaster = tdata; 
            if(this.ResidentMaster?.LastAdmissionDate!=null && this.ResidentMaster?.LastAdmissionDate!=undefined)
            {
              this.ResidentMaster.LastAdmissionDate = new Date(this.ResidentMaster.LastAdmissionDate);
            }
            this.onChangeFacility();
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
      this.ResidentMaster.UserId = this.userid;
      this.ResidentMaster.ResidentAdmissionInfoId = this.admissionid;
      this.ResidentMaster.ModifiedBy = localStorage.getItem('userId');
      this.ResidentMaster.statementtype = "Update";
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddUpdateResidentOccupancyData(this.ResidentMaster)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.mode = 'view';
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
