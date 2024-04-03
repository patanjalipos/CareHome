import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { EncryptDecryptService } from 'src/app/ui/service/encrypt-decrypt.service';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent extends AppComponentBase implements OnInit {  
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  s_HomeMasterId: string = localStorage.getItem('HomeMasterId');
  s_userTypeId:any = localStorage.getItem('userTypeId');
  mode:string=null;
  filteredValuesLength:number=0;
  todayDate = new Date();
  yesterday = new Date();
  lstUserMaster:any[]=[];
 
  stlsttitle: any[];
  stlstbloodgrp: any[];
  stlstgender: any[];
  stlststatus: any[];
  lstHomeMaster: any[]=[];
  lstUserType: any[]=[];
  public RegistrationMainModel: any = <any>{};
  selectedHome:any[]=[];
  lstFacilityResident:any[]=[];
  lstResidentfacility:any[]=[];
  ShowResidentFacilityModel:Boolean=false;
  slectedHomeMasterId:string=null;

  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,
    private _EncryptDecryptService: EncryptDecryptService,
    ) 
    { 
      super();
      this._ConstantServices.ActiveMenuName="User Master";
      this.stlsttitle = [
        { name: 'Mr.', code: 'Mr.' },
        { name: 'Mrs.', code: 'Mrs.' },
        { name: 'Ms.', code: 'Ms.' },
        { name: 'Master', code: 'Master' }
      ];
      this.stlstbloodgrp = [
        { name: 'A+ve', code: 'A+ve' },
        { name: 'A-ve', code: 'A-ve' },
        { name: 'B+ve', code: 'B+ve' },
        { name: 'B-ve', code: 'B-ve' },
        { name: 'AB+ve', code: 'AB+ve' },
        { name: 'AB-ve', code: 'AB-ve' },
        { name: 'O+ve', code: 'O+ve' },
        { name: 'O-ve', code: 'O-ve' }
      ];
      this.stlstgender = [
        { name: 'Male', code: 'Male' },
        { name: 'Female', code: 'Female' },
        { name: 'Other', code: 'Other' }
      ];
      this.stlststatus = [
        { name: 'Active', code: 1 },
        { name: 'Inactive', code: 0 }
      ];
    }

  ngOnInit(): void {
    this.LoadHomeMaster();
    this.LoadUserList();
    this.LoadUserTypeList();
    this.yesterday.setFullYear(this.yesterday.getFullYear() - 130);
    this.todayDate.setDate(this.todayDate.getDate() - 7);
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
  LoadUserTypeList() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserTypeMaster()
      .subscribe
      ({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstUserType = tdata;
            if(this.lstUserType?.length>0)
            {
              //this.lstUserType=this.lstUserType.filter(f=>f.UserTypeId!=='6075474600f6f4c43c5d54a1');
            }
          }
          else {
            this.lstUserType = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  LoadUserList() {   
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserMaster(this.s_HomeMasterId)
      .subscribe
      ({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstUserMaster = tdata;            
            if (this.filtr !== undefined) {
              this.filtr.nativeElement.value = "";
              this.dataTable.reset();
              this.filteredValuesLength = this.lstUserMaster?.length;
              }            
          }
          else {
            this.lstUserMaster = [];            
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  AddUserDetails()
  {
    this.mode = "add";
    this.RegistrationMainModel = <any>{};
    this.RegistrationMainModel.statementtype ="Insert";
    this.RegistrationMainModel.DateOfBirth = new Date("01/01/2001 00:00:00");
    if (UserTypes.SuperAdmin !== this.s_userTypeId) {
      this.RegistrationMainModel.HomeMasterId = localStorage.getItem('HomeMasterId');
    }
    this.RegistrationMainModel.Status = 1;    
  }
  LoadUserDetails(userId)
  {
    this.lstFacilityResident=[];
    this.RegistrationMainModel=<any>{};
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserMasterById(userId)
    .subscribe({
      next:(data) => {
        this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) 
          {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.RegistrationMainModel = tdata;
            if(this.RegistrationMainModel?.DateOfBirth!=null && this.RegistrationMainModel?.DateOfBirth!=undefined)
            {
              var newDate=new Date(this.RegistrationMainModel.DateOfBirth);           
              this.RegistrationMainModel.DateOfBirth=newDate;
            }
            this.RegistrationMainModel.DateOfBirth = new Date(this.RegistrationMainModel.DateOfBirth);           
            this.mode = "update"; 
            this.RegistrationMainModel.Password = this._EncryptDecryptService.decryptUsingAES256(this.RegistrationMainModel.Password);
            // var encrypt=this._EncryptDecryptService.encryptUsingAES256('12345');
            // console.log('encrypt', encrypt);
            // var decrypt=this._EncryptDecryptService.decryptUsingAES256(encrypt);
            // console.log('decrypt', decrypt);
            //console.log(this.RegistrationMainModel.password);
            this.RegistrationMainModel.statementtype ="Update";   
            
            if(data.actionResult.result2?.length>0)
            {
              var tdata1 = JSON.parse(data.actionResult.result2);
              tdata1 = tdata1 ? tdata1 : [];
              if(tdata1?.length>0)
                this.lstFacilityResident=tdata1;
              else
                this.lstFacilityResident=[];
            }
          }
      },
      error: (e) => {
        this._UtilityService.hideSpinner();
        this._UtilityService.showErrorAlert(e.message);
      },
    });      
  }
  Submit()
  {
    this.RegistrationMainModel.lstFacilityMapping=this.lstFacilityResident;
    if(this.RegistrationMainModel.Password!=null && this.RegistrationMainModel.Password!=undefined && this.RegistrationMainModel.Password!="")
    this.RegistrationMainModel.Password = this._EncryptDecryptService.encryptUsingAES256(this.RegistrationMainModel.Password);
    this.RegistrationMainModel.Fax = this.RegistrationMainModel.Fax?.toString() || null;
    this.RegistrationMainModel.EmergencyContactTelephone = this.RegistrationMainModel.EmergencyContactTelephone?.toString() || null;
    this.RegistrationMainModel.EmergencyContactMobile = this.RegistrationMainModel.EmergencyContactMobile?.toString() || null;
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.AddInsertUpdateUserMaster(this.RegistrationMainModel)
      .subscribe
      ({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) 
          {
            this.mode=null;
            this.LoadUserList();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);  
          }
          else
          {
            this._UtilityService.showWarningAlert(data.actionResult.errMsg);  
          }

        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  
  CloseModal() {
    this.mode = null;      
  }
  //Filter
  onFilter(event, dt) {
    this.filteredValuesLength = event.filteredValue.length; // count of displayed rows     
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  // Export
  exportToItemExcel()
  {
    var NewHomeMasterId = "";
    if (this.s_userTypeId != UserTypes.SuperAdmin) {
      NewHomeMasterId = localStorage.getItem('HomeMasterId');
    }
    let importData: any = <any>{};
    importData.reportname = "userlist";
    importData.filename = "userlist";
    importData.HomeMasterId = NewHomeMasterId;
    this._MasterServices.downloadReport(importData);
  }
  // Functions   
  SetFacility()
  {
      if(this.RegistrationMainModel.Homes?.length>0)
      {
        this.RegistrationMainModel.Homes.map(e=>
          {
              if(this.lstFacilityResident.filter(f=>f.HomeMasterId==e)?.length==0)
              {
                this.lstFacilityResident.push({"FacilityName":this.lstHomeMaster.find(f=>f.HomeMasterId==e).HomeName,"HomeMasterId":e,"EnableFacility":false,"AutoAssignResident":false,"ResidentList":[]});
              }
          });

          this.lstFacilityResident.map(e=>
            {
              if(this.RegistrationMainModel.Homes.filter(f=>f==e.HomeMasterId)?.length==0)
              {
                if(this.lstFacilityResident?.length==1)
                this.lstFacilityResident=[];
                else
                this.lstFacilityResident=this.lstFacilityResident.filter(f=>f.HomeMasterId!==e.HomeMasterId);
              }
            });
      }
      else
      {
        this.lstFacilityResident=[];
      }
  }
  ShowResidentDetails(HomeMasterId)
  {
    this.slectedHomeMasterId=HomeMasterId;
    this.lstResidentfacility=[];
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetResidentMaster(HomeMasterId,true)
      .subscribe
      ({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) 
          {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstResidentfacility = tdata;

            if(this.lstFacilityResident.filter(f=>f.HomeMasterId==this.slectedHomeMasterId)[0]?.ResidentList?.length>0)
            {
              for(let a=0;a<this.lstResidentfacility?.length;a++)
              {
                if(this.lstFacilityResident.filter(f=>f.HomeMasterId==this.slectedHomeMasterId)[0]?.ResidentList.filter(f=>f.ResidentId==this.lstResidentfacility[a].UserId)?.length>0)
                {
                  this.lstResidentfacility[a].Checked=true;
                }
              }
            }
            this.ShowResidentFacilityModel=true;
          }
          else
          {
            this.ShowResidentFacilityModel=false;
          }

        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
      
  }
  CheckUncheckResidentFacility(event,UserId)
  {
      if(event.checked==true)
      {
        this.lstFacilityResident.filter(f=>f.HomeMasterId==this.slectedHomeMasterId)[0].ResidentList.push({"ResidentId":UserId});
      }
      else
      {
        this.lstFacilityResident.filter(f=>f.HomeMasterId==this.slectedHomeMasterId)[0].ResidentList=this.lstFacilityResident?.filter(f=>f.HomeMasterId==this.slectedHomeMasterId)[0]?.ResidentList?.filter(w=>w.ResidentId!=UserId);
      }
  }
  
}
