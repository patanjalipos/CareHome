import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdmissionStatus, ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { ViewportScroller } from '@angular/common';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { EncryptDecryptService } from 'src/app/ui/service/encrypt-decrypt.service';

@Component({
  selector: 'app-resident-master',
  templateUrl: './resident-master.component.html',
  styleUrls: ['./resident-master.component.scss']
})

export class ResidentMasterComponent extends AppComponentBase implements OnInit {  
  @ViewChild('myForm') public myForm: NgForm;  
  UserTypes = UserTypes;
  admissionStatus = AdmissionStatus;
  customDateFormat = CustomDateFormat;
  s_userTypeId: any = localStorage.getItem('userTypeId');
  todayDate = new Date();
  mode: string = null;
  healthcareMode:string="view";
  selecteduserid:any=null;
  selectedadmissionid:any=null;
  
  lstHomeMaster: any[]=[];
  lstCountryMaster: any[]=[];
  lstDependencyMaster: any[]=[];
  lstRoomMaster: any[]=[];  
  lstResidentIndicator: any[]=[];
  public ResidentMaster: any = <any>{};
  
  stlsttitle: any[];
  stlstgender: any[];
  stlstmyself: any[];
  stlstmaritalstatus: any[];
  stlstadmissionstatus: any[];
  stlststatus: any[]=[];
  SelectedFile:any[]=[];
  profileSrc = null;  
  //funding
  stlstfunding: any[];
  constructor(
    private route: ActivatedRoute,
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,   
    private viewportScroller: ViewportScroller,
    private _EncryptDecryptService:EncryptDecryptService    
  ) 
  {
    super();
    this._ConstantServices.ActiveMenuName="Resident";
    this.stlstadmissionstatus = [
      { name: this.admissionStatus[this.admissionStatus.Active], code: this.admissionStatus.Active },
      { name: this.admissionStatus[this.admissionStatus.Deceased], code: this.admissionStatus.Deceased },
      { name: this.admissionStatus[this.admissionStatus.Discharged], code: this.admissionStatus.Discharged },
      { name: this.admissionStatus[this.admissionStatus.Transferred], code: this.admissionStatus.Transferred },
      { name: this.admissionStatus[this.admissionStatus.WaitListed], code: this.admissionStatus.WaitListed },
      { name: this.admissionStatus[this.admissionStatus.Suspended], code: this.admissionStatus.Suspended },
      { name: this.admissionStatus[this.admissionStatus.Unallocated], code: this.admissionStatus.Unallocated }
    ];
    this.stlsttitle = [
      { name: 'Mr', code: 'Mr' },
      { name: 'Mrs', code: 'Mrs' },
      { name: 'Ms', code: 'Ms' },
      { name: 'Miss', code: 'Miss' },
      { name: 'Other', code: 'Other' }
    ];
    this.stlstgender = [
      { name: 'Male', code: 'Male' },
      { name: 'Female', code: 'Female' },
      { name: 'Intersex or indeterminate', code: 'Intersex or indeterminate' },
      { name: 'Not stated / inadequately described', code: 'Not stated / inadequately described' }
    ];
    this.stlstmyself = [
      { name: 'Male', code: 'Male' },
      { name: 'Female', code: 'Female' },
      { name: 'Lesbian', code: 'Lesbian' },
      { name: 'Gay', code: 'Gay' },
      { name: 'Bi-sexual', code: 'Bi-sexual' },
      { name: 'Transgender', code: 'Transgender' },
      { name: 'Intersex', code: 'Intersex' },
      { name: 'Other', code: 'Other' }
    ];
    this.stlstmaritalstatus = [
      { name: 'Unknown', code: 'Unknown' },
      { name: 'Single', code: 'Single' },
      { name: 'Married', code: 'Married' },
      { name: 'Widowed', code: 'Widowed' },
      { name: 'Divoreced', code: 'Divoreced' },
      { name: 'Separated', code: 'Separated' },
    ]
    this.stlststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];
    this.lstDependencyMaster = [
      { name: 'Residenttial indenpendent', code: 'Residenttial indenpendent' },
      { name: 'Residenttial some assistance', code: 'Residenttial some assistance' },
      { name: 'Residenttial full assistance', code: 'Residenttial full assistance' },
      { name: 'Dementia', code: 'Dementia' },
      { name: 'Nursing', code: 'Nursing' },
      { name: 'End of life', code: 'End of life' }
    ];
    this.lstRoomMaster = [
      { name: '101', code: '101' },
      { name: '102', code: '102' },
      { name: '103', code: '103' },
      { name: '104', code: '104' },
      { name: '105', code: '105' },
      { name: '201', code: '201' },
      { name: '202', code: '202' },
      { name: '203', code: '203' },
      { name: '204', code: '204' },
      { name: '205', code: '205' },
      { name: '301', code: '301' },
      { name: '302', code: '302' },
      { name: '303', code: '303' },
      { name: '304', code: '304' },
      { name: '305', code: '305' },
    ];
    this.stlstfunding = [
      { name: 'Continuing NHS', code: 'Continuing NHS' },
      { name: 'Private', code: 'Private' },
      { name: 'Responsible Local Authority', code: 'Responsible Local Authority' },
      { name: 'Private/Responsible Local Authority', code: 'Private/Responsible Local Authority' }
    ];    
    this.profileSrc = environment.BaseURIFileServer + 'ProfileImage/';
    this.unsubscribe.add = this.route.queryParams.subscribe(params => {
      var ParamsArray=this._ConstantServices.GetParmasVal(params['q']);
      if(ParamsArray?.length>0)
      {
        //console.log('ParamsArray',ParamsArray);
        this.mode = ParamsArray.find(e=>e.FieldStr=='mode')?.FieldVal || 'view';
        this.selecteduserid = ParamsArray.find(e=>e.FieldStr=='id')?.FieldVal || null;
        this.selectedadmissionid = ParamsArray.find(e=>e.FieldStr=='admissionid')?.FieldVal || null;
      }      
    });
   }

  ngOnInit(): void {
    if (UserTypes.SuperAdmin === this.s_userTypeId) {
      this.LoadHomeMaster();
    }
    this.LoadCountryList(); 
    if(this.mode=="add")
    this.AddResident();
    else
    {
      this.LoadResidentDetails(this.selecteduserid);
    }

  }  
  
  public onClick(elementId: string): void { this.viewportScroller.scrollToAnchor(elementId); }
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
  AddResident()
  {
    this.selecteduserid = null;
    this.selectedadmissionid = null;
    this.SelectedFile = [];
    this.ResidentMaster = <any>{};    
    this.ResidentMaster.admissionstatus = this.admissionStatus.Unallocated;   
    this.ResidentMaster.Status = 1;  
    if (UserTypes.SuperAdmin !== this.s_userTypeId) {
      this.ResidentMaster.homemasterid = localStorage.getItem('HomeMasterId');
    } 
  }
  LoadResidentDetails(id)
  {
    this.selecteduserid=id;
    this.SelectedFile = [];
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetResidentMasterById(id)
      .subscribe
      ({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) 
          {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.ResidentMaster = tdata;
            //console.log('this.ResidentMaster', this.ResidentMaster)
            if(this.ResidentMaster?.DateOfBirth!=null && this.ResidentMaster?.DateOfBirth!=undefined)
            {
              this.ResidentMaster.DateOfBirth = new Date(this.ResidentMaster.DateOfBirth);
            }
            this.mode = "edit";   
            this.healthcareMode="view";         
          }

        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  fileUploader(event) {
    this.SelectedFile = [];
    for (let file of event.files) {
      this.SelectedFile.push(file);
    }
}
fileUploaderReset()
{
  this.SelectedFile = [];
}
RemoveProfileImage(){
  this.ResidentMaster.profileimage=null;
  this.SelectedFile = [];
}

  edit()
  {
    this.mode='edit';
  }
  
  Submit()
  {
    if (this.ResidentMaster.Password != null && this.ResidentMaster.Password != undefined && this.ResidentMaster.Password != '') {
      this.ResidentMaster.Password = this._EncryptDecryptService.encryptUsingAES256(this.ResidentMaster.Password);
    }
    this.ResidentMaster.UserId=this.selecteduserid;
    this.ResidentMaster.ResidentAdmissionInfoId=this.selectedadmissionid;          
    this.ResidentMaster.UserTypeId=this.UserTypes.Resident;
    this.ResidentMaster.ModifiedBy = localStorage.getItem('userId');  
    this.ResidentMaster.PayerTelephone = this.ResidentMaster.PayerTelephone?.toString() || null;
    
    //console.log('ResidentMaster',this.ResidentMaster);
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.ResidentMaster));
    if(this.SelectedFile?.length > 0){
      for (let file of this.SelectedFile) {
        formData.append('files[]', file);
      }
    }
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.AddInsertUpdateResidentMaster(formData)
        .subscribe
        ({
          next:(data) => {
            this._UtilityService.hideSpinner();
            //this.LoadResidentList();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.selecteduserid = data.actionResult.userId;
            this.selectedadmissionid = data.actionResult.stringVal;           
                       
          },
          error: (e) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(e.message);
          },
        });
  }
  
  close()
  {
    this.mode='view';
  }
  
}


