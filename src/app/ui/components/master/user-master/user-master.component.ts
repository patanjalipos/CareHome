import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ActionItem, ConstantsService, CustomDateFormat, OtherActionAccess, UserTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { EncryptDecryptService } from 'src/app/ui/service/encrypt-decrypt.service';
import { TreeNode } from 'primeng/api';
import * as cloneDeep from 'lodash/cloneDeep';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
declare var $: any;
@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent extends AppComponentBase implements OnInit {
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  updateMode: Boolean = false;
  @ViewChild('fileInput') fileInput: FileUpload; 
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  s_HomeMasterId: string = localStorage.getItem('HomeMasterId');
  s_userTypeId: any = localStorage.getItem('userTypeId');
  mode: string = null;
  filteredValuesLength: number = 0;
  todayDate = new Date();
  yesterday = new Date();
  lstUserMaster: any[] = [];

  stlsttitle: any[];
  stlstbloodgrp: any[];
  stlstgender: any[];
  stlststatus: any[];
  lstHomeMaster: any[] = [];
  lstUserType: any[] = [];
  public RegistrationMainModel: any = <any>{};
  public FacilityAndResidentAssignmentModel: any = <any>{};
  selectedHome: any[] = [];
  lstFacilityResident: any[] = [];
  lstResidentfacility: any[] = [];
  slectedHomeMasterId: string = null;
  selectedNodes2: TreeNode[] = [];
  public lstActionItemAccess: TreeNode[] = [];
  ActionList = ActionItem;
  OtherActionList = OtherActionAccess;
  lstIAccess: any[] = [];
  lstIAccessStr: string[] = [];
  lstAction: string[] = [];
  public MenuitemMaster: TreeNode[] = [];
  colsActionITable: any[] = [];
  
  fileUploadFormAWB: FormGroup;
  fileInputLabelAWB: string;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  }); 
  imageSrc: any;


  constructor(
    private _ConstantServices: ConstantsService,

    private formBuilder: FormBuilder,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,
    private _EncryptDecryptService: EncryptDecryptService,
  ) {
    super();
    this._ConstantServices.ActiveMenuName = "User Master";
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

    this.stlststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];

    this.colsActionITable = [
      { field: 'MenuItemName', header: 'MenuItemName' },
    ];
    var KeyVal = this.transform(this.ActionList);
    if (KeyVal?.length > 0) {
      for (var i = 0; i < KeyVal?.length; i++) {
        this.colsActionITable.push({ field: KeyVal[i][1], header: KeyVal[i][1] });
      }
    }
    this.lstAction = [
      this.ActionList[ActionItem.ReadWrite], this.ActionList[ActionItem.Delete], this.ActionList[ActionItem.Download], this.ActionList[ActionItem.Print], this.ActionList[ActionItem.Cancel]
    ];

  }

  ngOnInit(): void {
    this.fileUploadFormAWB = this.formBuilder.group({
      myfileAWB: ['']
    });
    this.LoadHomeMaster();
    this.LoadUserList();
    this.LoadUserTypeList();
    this.yesterday.setFullYear(this.yesterday.getFullYear() - 130);
    this.todayDate.setDate(this.todayDate.getDate() - 7);
  }

  LoadUserTypeList() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserTypeMaster()
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstUserType = tdata;

            if (this.lstUserType?.length > 0) {
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
        next: (data) => {
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
  AddUserDetails() {
    this.mode = "add";
    this.RegistrationMainModel = <any>{};
    this.RegistrationMainModel.statementtype = "Insert";
    this.RegistrationMainModel.DateOfBirth = new Date("01/01/2001 00:00:00");
    if (UserTypes.SuperAdmin !== this.s_userTypeId) {
      this.RegistrationMainModel.HomeMasterId = localStorage.getItem('HomeMasterId');
    }
    this.RegistrationMainModel.Status = 1;
  }
  LoadUserDetails(userId) {
    this.lstFacilityResident = [];
    this.RegistrationMainModel = <any>{};
    this.FacilityAndResidentAssignmentModel = <any>{};
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserMasterById(userId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.RegistrationMainModel = tdata;
            //console.log("ragistration data", this.RegistrationMainModel);

            if (this.RegistrationMainModel?.DateOfBirth != null && this.RegistrationMainModel?.DateOfBirth != undefined) {
              var newDate = new Date(this.RegistrationMainModel.DateOfBirth);
              this.RegistrationMainModel.DateOfBirth = newDate;
            }
            this.RegistrationMainModel.DateOfBirth = new Date(this.RegistrationMainModel.DateOfBirth); 
            if(this.RegistrationMainModel?.ProfileImage!=null && this.RegistrationMainModel?.ProfileImage!=undefined)
              {
               // const imageFormat = this.RegistrationMainModel.ProfileImage.endsWith(".jpg") || this.RegistrationMainModel.ProfileImage.endsWith(".jpeg") ? "jpeg" : "png";
               var imageFormat=this._UtilityService.getFileExtension(this.RegistrationMainModel.ProfileImage);
               this.imageSrc = "data:image/" + imageFormat + ";base64," + this.RegistrationMainModel.ProfileImage;               
                //console.log(this.imageSrc);
              }          
            this.mode = "update"; 
            this.onChangeUserType();
            this.LoadMenuItemAccessforActionItem();
            this.RegistrationMainModel.Password = this._EncryptDecryptService.decryptUsingAES256(this.RegistrationMainModel.Password);
            // var encrypt=this._EncryptDecryptService.encryptUsingAES256('12345');
            // console.log('encrypt', encrypt);
            // var decrypt=this._EncryptDecryptService.decryptUsingAES256(encrypt);
            // console.log('decrypt', decrypt);
            //console.log(this.RegistrationMainModel.password);
            if (this.RegistrationMainModel?.UserFacilityResident != null && this.RegistrationMainModel?.UserFacilityResident != undefined) {
              if (this.RegistrationMainModel?.UserFacilityResident?.length > 0) {
                var UserFacilityResident = this.RegistrationMainModel?.UserFacilityResident;
                //console.log('UserFacilityResident',UserFacilityResident);
                UserFacilityResident.forEach(x => {
                  var index= this.lstHomeMaster.findIndex(f=>f.HomeMasterId==x.HomeMasterId);
                  this.lstHomeMaster[index].IsEnableFacility=x.IsEnableFacility;
                  this.lstHomeMaster[index].IsResidentAutoAssignment = x.IsResidentAutoAssignment;
                  if (x.IsResidentAutoAssignment == false) {
                    this.ShowResidentDetails(x.HomeMasterId, index, x.lstResident);
                  }
                  // this.lstHomeMaster[]
                  // if(x.HomeMasterId)

                })
              }
            }
            this.RegistrationMainModel.statementtype = "Update";

            if (data.actionResult.result2?.length > 0) {
              var tdata1 = JSON.parse(data.actionResult.result2);
              tdata1 = tdata1 ? tdata1 : [];
              if (tdata1?.length > 0)
                this.lstFacilityResident = tdata1;
              else
                this.lstFacilityResident = [];
            }
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });      
  }

//Profile Image

  onFileSelectAWB(event) {
    let af = ['.jpg', '.png', '.jpeg']
    if (event.target.files?.length > 0) {
      const file = event.target.files[0];
      //console.log(file.size);
      if (!af.includes('.' + file.type.split('/')[1])) {
        $('#customFileAWB').val("");
        this._UtilityService.showWarningAlert("Only jpg and png Allowed!");
      }
      else if (file.size > 204800) {
        $('#customFileAWB').val("");
        this._UtilityService.showWarningAlert("Maximum upload size is 200KB. Please compress and upload it again.");
      }
      else {
        this.fileInputLabelAWB = file.name;
        this.fileUploadFormAWB.get('myfileAWB').setValue(file);
      }
      const reader = new FileReader();
      if (event.target.files && event.target.files?.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.myForm.patchValue({
            fileSource: reader.result as string
          });
        };
        var selectedFile = [];
        for (let file of event.target.files) {
          selectedFile.push(file);
        }
      }
    }
  }

  ClearProfile()
  {
   this.imageSrc=null;
   this.RegistrationMainModel.ProfileImage=null;
  }
  
  Submit()
  {
    //////Preapre User Authorization Action Item////////
    var UserAuthorizationIAccess: any[] = [];
    if (this.lstActionItemAccess?.length > 0) {
      this.lstActionItemAccess.map(e => {
        if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.data.MenuItemId) == undefined) {
          var ActionIAccess = [];
          if (e.data.Read == true) {
            ActionIAccess.push({ "ActionId": this.ActionList.Read });
          }
          if (e.data.ReadWrite == true) {
            ActionIAccess.push({ "ActionId": this.ActionList.ReadWrite });
          }
          if (e.data.Print == true) {
            ActionIAccess.push({ "ActionId": this.ActionList.Print });
          }
          if (e.data.Delete == true) {
            ActionIAccess.push({ "ActionId": this.ActionList.Delete });
          }
          if (e.data.Cancel == true) {
            ActionIAccess.push({ "ActionId": this.ActionList.Cancel });
          }
          if (e.data.Download == true) {
            ActionIAccess.push({ "ActionId": this.ActionList.Download });
          }
          UserAuthorizationIAccess.push({ "MenuItemId": e.data.MenuItemId, "ActionIAccess": ActionIAccess });

          if (e.children?.length > 0) {
            for (let n = 0; n < e.children?.length; n++) {
              var ActionIAccess = [];
              if (e.children[n].data.Read == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.Read });
              }
              if (e.children[n].data.ReadWrite == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.ReadWrite });
              }
              if (e.children[n].data.Print == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.Print });
              }
              if (e.children[n].data.Delete == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.Delete });
              }
              if (e.children[n].data.Cancel == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.Cancel });
              }
              if (e.children[n].data.Download == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.Download });
              }
              UserAuthorizationIAccess.push({ "MenuItemId": e.children[n].data.MenuItemId, "ActionIAccess": ActionIAccess });
            }
          }
        }
        if (e.parent != null && e.parent != undefined) {
          if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.data.MenuItemId) == undefined) {
            var ActionIAccess = [];
            if (e.parent.data.Read == true) {
              ActionIAccess.push({ "ActionId": this.ActionList.Read });
            }
            if (e.parent.data.ReadWrite == true) {
              ActionIAccess.push({ "ActionId": this.ActionList.ReadWrite });
            }
            if (e.parent.data.Print == true) {
              ActionIAccess.push({ "ActionId": this.ActionList.Print });
            }
            if (e.parent.data.Delete == true) {
              ActionIAccess.push({ "ActionId": this.ActionList.Delete });
            }
            UserAuthorizationIAccess.push({ "MenuItemId": e.parent.data.MenuItemId, "ActionIAccess": ActionIAccess });
          }
          if (e.parent.parent != null && e.parent.parent != undefined) {
            if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.data.MenuItemId) == undefined) {
              var ActionIAccess = [];
              if (e.parent.parent.data.Read == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.Read });
              }
              if (e.parent.parent.data.ReadWrite == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.ReadWrite });
              }
              if (e.parent.parent.data.Print == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.Print });
              }
              if (e.parent.parent.data.Delete == true) {
                ActionIAccess.push({ "ActionId": this.ActionList.Delete });
              }
              UserAuthorizationIAccess.push({ "MenuItemId": e.parent.parent.data.MenuItemId, "ActionIAccess": ActionIAccess });
            }
            if (e.parent.parent.parent != null && e.parent.parent.parent != undefined) {
              if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.parent.data.MenuItemId) == null) {
                var ActionIAccess = [];
                if (e.parent.parent.parent.data.Read == true) {
                  ActionIAccess.push({ "ActionId": this.ActionList.Read });
                }
                if (e.parent.parent.parent.data.ReadWrite == true) {
                  ActionIAccess.push({ "ActionId": this.ActionList.ReadWrite });
                }
                if (e.parent.parent.parent.data.Print == true) {
                  ActionIAccess.push({ "ActionId": this.ActionList.Print });
                }
                if (e.parent.parent.parent.data.Delete == true) {
                  ActionIAccess.push({ "ActionId": this.ActionList.Delete });
                }
                UserAuthorizationIAccess.push({ "MenuItemId": e.parent.parent.parent.data.MenuItemId, "ActionIAccess": ActionIAccess });
              }
            }
          }
        }
      });
    }
    //////Preapre User Authorization Start////////
    if (this.selectedNodes2?.length > 0) {
      var UserAuthorizationss: any[] = [];
      this.selectedNodes2.map(e => {
        if (UserAuthorizationss.find(x => x.MenuItemId === e.data) == null || UserAuthorizationss.find(x => x.MenuItemId === e.data) == undefined) {
          var ActionIAccess = [];
          if (UserAuthorizationIAccess?.length > 0 && UserAuthorizationIAccess.filter(f => f.MenuItemId == e.data)?.length > 0) {
            ActionIAccess = UserAuthorizationIAccess.filter(f => f.MenuItemId == e.data)[0].ActionIAccess;
          }
          UserAuthorizationss.push({ "MenuItemId": e.data, "ActionIAccess": ActionIAccess });
        }
        if (e.parent != null && e.parent != undefined) {
          if (UserAuthorizationss.find(x => x.MenuItemId === e.parent.data) == null || UserAuthorizationss.find(x => x.MenuItemId === e.parent.data) == undefined) {
            var ActionIAccess = [];
            if (UserAuthorizationIAccess?.length > 0 && UserAuthorizationIAccess.filter(f => f.MenuItemId == e.parent.data)?.length > 0) {
              ActionIAccess = UserAuthorizationIAccess.filter(f => f.MenuItemId == e.parent.data)[0].ActionIAccess;
            }
            UserAuthorizationss.push({ "MenuItemId": e.parent.data, "ActionIAccess": ActionIAccess });
          }
          if (e.parent.parent != null && e.parent.parent != undefined) {
            if (UserAuthorizationss.find(x => x.MenuItemId === e.parent.parent.data) == null || UserAuthorizationss.find(x => x.MenuItemId === e.parent.parent.data) == undefined) {
              var ActionIAccess = [];
              if (UserAuthorizationIAccess?.length > 0 && UserAuthorizationIAccess.filter(f => f.MenuItemId == e.parent.parent.data)?.length > 0) {
                ActionIAccess = UserAuthorizationIAccess.filter(f => f.MenuItemId == e.parent.parent.data)[0].ActionIAccess;
              }
              UserAuthorizationss.push({ "MenuItemId": e.parent.parent.data, "ActionIAccess": ActionIAccess });
            }
            if (e.parent.parent.parent != null && e.parent.parent.parent != undefined) {
              if (UserAuthorizationss.find(x => x.MenuItemId === e.parent.parent.parent.data) == null) {
                var ActionIAccess = [];
                if (UserAuthorizationIAccess?.length > 0 && UserAuthorizationIAccess.filter(f => f.MenuItemId == e.parent.parent.parent.data)?.length > 0) {
                  ActionIAccess = UserAuthorizationIAccess.filter(f => f.MenuItemId == e.parent.parent.parent.data)[0].ActionIAccess;
                }
                UserAuthorizationss.push({ "MenuItemId": e.parent.parent.parent.data });
              }
            }
          }
        }
      });
      this.RegistrationMainModel.UserAuthorization = [];
      this.RegistrationMainModel.UserAuthorization = UserAuthorizationss;
    }

    //////Preapre User Facility Resident////////
    var UserFacilityResident: any[] = [];   
    var lstSelectedFacilty=this.lstHomeMaster.filter(f=>f.IsEnableFacility==true);
    //console.log('lstSelectedFacilty',lstSelectedFacilty);
    if (lstSelectedFacilty?.length > 0) {
      lstSelectedFacilty.forEach(x => {
        var jsonObject = {
          "HomeMasterId": x.HomeMasterId,
          "IsEnableFacility": x.IsEnableFacility,
          "IsResidentAutoAssignment": x.IsResidentAutoAssignment,
          "lstResident": x.SelectedResidentList
        }
        UserFacilityResident.push(jsonObject);      
    });
    }
    this.RegistrationMainModel.UserFacilityResident = UserFacilityResident;
    this.RegistrationMainModel.CreatedBy = localStorage.getItem('userId');  
    this.RegistrationMainModel.ModifiedBy = localStorage.getItem('userId');  
    this.RegistrationMainModel.lstFacilityMapping=this.lstFacilityResident;
    this.RegistrationMainModel.ProfileImage=this.imageSrc;
    if(this.RegistrationMainModel.Password!=null && this.RegistrationMainModel.Password!=undefined && this.RegistrationMainModel.Password!="")
    this.RegistrationMainModel.Password = this._EncryptDecryptService.encryptUsingAES256(this.RegistrationMainModel.Password);
    this.RegistrationMainModel.Fax = this.RegistrationMainModel.Fax?.toString() || null;
    this.RegistrationMainModel.EmergencyContactTelephone = this.RegistrationMainModel.EmergencyContactTelephone?.toString() || null;
    this.RegistrationMainModel.EmergencyContactMobile = this.RegistrationMainModel.EmergencyContactMobile?.toString() || null;
    //console.log('this.RegistrationMainModel',this.RegistrationMainModel);
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.AddInsertUpdateUserMaster(this.RegistrationMainModel)
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            this.mode = null;
            this.LoadUserList();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
          }
          else {
            this._UtilityService.showWarningAlert(data.actionResult.errMsg);
          }

        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      }
      );
    
    
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
  exportToItemExcel() {
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

  // Facility
  SetFacility() {
    if (this.RegistrationMainModel.Homes?.length > 0) {
      this.RegistrationMainModel.Homes.map(e => {
        if (this.lstFacilityResident.filter(f => f.HomeMasterId == e)?.length == 0) {
          this.lstFacilityResident.push({ "FacilityName": this.lstHomeMaster.find(f => f.HomeMasterId == e).HomeName, "HomeMasterId": e, "EnableFacility": false, "AutoAssignResident": false, "ResidentList": [] });
        }
      });

      this.lstFacilityResident.map(e => {
        if (this.RegistrationMainModel.Homes.filter(f => f == e.HomeMasterId)?.length == 0) {
          if (this.lstFacilityResident?.length == 1)
            this.lstFacilityResident = [];
          else
            this.lstFacilityResident = this.lstFacilityResident.filter(f => f.HomeMasterId !== e.HomeMasterId);
        }
      });
    }
    else {
      this.lstFacilityResident = [];
    }
  }

  LoadHomeMaster() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetHomeMaster(true)
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstHomeMaster = tdata;
            this.lstHomeMaster.map(m => {
              m.IsEnableFacility = false;
              m.IsResidentAutoAssignment= false;
              m.ResidentList = [];
              m.SelectedResidentList = [];
            });
            //console.log('this.lstHomeMaster', this.lstHomeMaster);

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
  ShowResidentDetails(HomeMasterId, i, selectedResident=null) {
    this.lstHomeMaster[i].ResidentList=[];
    this.lstHomeMaster[i].SelectedResidentList=[];
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetResidentMaster(HomeMasterId,null,1)
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstHomeMaster[i].ResidentList = tdata; 
            if (selectedResident != null && selectedResident != undefined) {
              this.lstHomeMaster[i].SelectedResidentList = selectedResident;
            } 
          }

        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });

  }
  
  checkUncheckEnableFacility(event, i) {
    this.lstHomeMaster[i].ResidentList=[];
    this.lstHomeMaster[i].SelectedResidentList=[];
    if (event.checked == true) {
      this.ShowResidentDetails(this.lstHomeMaster[i].HomeMasterId,i);
    }    
  }
  checkUncheckAutoAssignment(event, i) {
    if (event.checked == true) {
      this.lstHomeMaster[i].SelectedResidentList=[];
    }    
  }
  
  //

  onNodeSelectMenuAccess(event) {
    //console.log("NodeSelect Menu Access I Access", this.lstActionItemAccess);
    // var OldData=JSON.parse(JSON.stringify(this.lstActionItemAccess));
    var OldData = JSON.parse(JSON.stringify(this.lstActionItemAccess));

    //////Preapre User Authorization Action Item////////
    var UserAuthorizationIAccess: any[] = [];
    if (this.lstActionItemAccess?.length > 0) {
      this.lstActionItemAccess.map(e => {
        if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.data.MenuItemId) == undefined) {
          UserAuthorizationIAccess.push({ "MenuItemId": e.data.MenuItemId });
        }
        if (e.parent != null && e.parent != undefined) {
          if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.data.MenuItemId) == undefined) {
            UserAuthorizationIAccess.push({ "MenuItemId": e.parent.data.MenuItemId });
          }
          if (e.parent.parent != null && e.parent.parent != undefined) {
            if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.data.MenuItemId) == undefined) {
              UserAuthorizationIAccess.push({ "MenuItemId": e.parent.parent.data.MenuItemId });
            }
            if (e.parent.parent.parent != null && e.parent.parent.parent != undefined) {
              if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.parent.data.MenuItemId) == null) {
                UserAuthorizationIAccess.push({ "MenuItemId": e.parent.parent.parent.data.MenuItemId });
              }
            }
          }
        }
      });
    }

    if (event?.node?.parent == null || event?.node?.parent == undefined && UserAuthorizationIAccess.filter(f => f.MenuItemId == event?.node?.parent?.data)?.length == 0) {
      var KeyVal = this.transform(this.ActionList);
      var IAccessDetails;
      IAccessDetails = { "data": { "MenuItemId": event?.node?.data, "MenuItemName": event.node.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "dataval": { "MenuItemId": event.node.data, "MenuItemName": event.node.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "children": [], "parent": [] };
      var IAccessChildren;
      if (event.node.children?.length > 0) {

        for (let i = 0; i < event?.node?.children?.length; i++) {
          var IAccessDetailsR;
          IAccessDetailsR = { "data": { "MenuItemId": event.node.children[i].data, "MenuItemName": event.node.children[i].label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "dataval": { "MenuItemId": event.node.children[i].data, "MenuItemName": event.node.children[i].label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "children": [], "parent": [] };
          if (i == 0)
            IAccessChildren = [IAccessDetailsR];
          else
            IAccessChildren.push(IAccessDetailsR);
        }
        IAccessDetails.children = JSON.parse(JSON.stringify(IAccessChildren));
        //IAccessDetails.children=[IAccessDetailsN];
      }

      OldData.push(JSON.parse(JSON.stringify(IAccessDetails)));
      this.lstActionItemAccess = [];
      this.lstActionItemAccess = JSON.parse(JSON.stringify(OldData));
    }
    else {
      let bl: Boolean = false;
      for (var a = 0; a < OldData?.length; a++) {
        if (OldData[a]?.children != null && OldData[a]?.children?.length > 0 && OldData[a]?.data?.MenuItemId === event?.node?.parent?.data) {
          var IAccessDetails;
          IAccessDetails = { "data": { "MenuItemId": event.node.data, "MenuItemName": event.node.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "dataval": { "MenuItemId": event.node.data, "MenuItemName": event.node.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "children": [], "parent": [] };
          OldData[a].children.push(JSON.parse(JSON.stringify(IAccessDetails)));
          this.lstActionItemAccess = [];
          this.lstActionItemAccess = JSON.parse(JSON.stringify(OldData));
          bl = true;
        }
        if (OldData[a]?.children != null && OldData[a]?.children?.length > 0 && OldData[a]?.data?.MenuItemId != event?.node?.parent?.data) {
          for (var x = 0; x < OldData[a]?.children?.length; x++) {
            if (OldData[a]?.children[x]?.children != null && OldData[a]?.children[x]?.children?.length > 0 && OldData[a]?.children[x]?.data?.MenuItemId === event?.node?.parent?.data) {
              var IAccessDetails;
              IAccessDetails = { "data": { "MenuItemId": event.node.data, "MenuItemName": event.node.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "dataval": { "MenuItemId": event.node.data, "MenuItemName": event.node.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "children": [], "parent": [] };
              OldData[a].children[x].children.push(JSON.parse(JSON.stringify(IAccessDetails)));
              this.lstActionItemAccess = [];
              this.lstActionItemAccess = JSON.parse(JSON.stringify(OldData));
              bl = true;
            }
          }
        }
      }
      if (bl == false) {
        if (event?.node?.parent != null && event?.node?.parent != undefined && UserAuthorizationIAccess.filter(f => f.MenuItemId == event.node.parent.data)?.length == 0) {
          var IAccessDetails;
          IAccessDetails = { "data": { "MenuItemId": event.node.parent.data, "MenuItemName": event.node.parent.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "dataval": { "MenuItemId": event.node.parent.data, "MenuItemName": event.node.parent.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "children": [], "parent": [] };

          var IAccessDetailsN;
          IAccessDetailsN = { "data": { "MenuItemId": event.node.data, "MenuItemName": event.node.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "dataval": { "MenuItemId": event.node.data, "MenuItemName": event.node.label, "Read": true, "ReadWrite": false, "Print": false, "Delete": false, "Download": false, "Cancel": false }, "children": [], "parent": [] };
          IAccessDetails.children = [IAccessDetailsN];
          OldData.push(JSON.parse(JSON.stringify(IAccessDetails)));

          this.lstActionItemAccess = [];
          this.lstActionItemAccess = JSON.parse(JSON.stringify(OldData));
        }
      }
    }
  }
  onNodeUnselectMenuAccess(event) {
    // var OldData=JSON.parse(JSON.stringify(this.lstActionItemAccess));
    //var OldData= JSON.parse(JSON.stringify(this.lstActionItemAccess));
    var OldData = cloneDeep(this.lstActionItemAccess);
    //////Preapre User Authorization Action Item////////
    var UserAuthorizationIAccess: any[] = [];
    if (this.lstActionItemAccess?.length > 0) {
      this.lstActionItemAccess.map(e => {
        if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.data.MenuItemId) == undefined) {
          UserAuthorizationIAccess.push({ "MenuItemId": e.data.MenuItemId });
        }
        if (e.parent != null && e.parent != undefined) {
          if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.data.MenuItemId) == undefined) {
            UserAuthorizationIAccess.push({ "MenuItemId": e.parent.data.MenuItemId });
          }
          if (e.parent.parent != null && e.parent.parent != undefined) {
            if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.data.MenuItemId) == null || UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.data.MenuItemId) == undefined) {
              UserAuthorizationIAccess.push({ "MenuItemId": e.parent.parent.data.MenuItemId });
            }
            if (e.parent.parent.parent != null && e.parent.parent.parent != undefined) {
              if (UserAuthorizationIAccess.find(x => x.MenuItemId === e.parent.parent.parent.data.MenuItemId) == null) {
                UserAuthorizationIAccess.push({ "MenuItemId": e.parent.parent.parent.data.MenuItemId });
              }
            }
          }
        }
      });
    }
    for (var a = 0; a < OldData.length; a++) {
      if ((OldData[a]?.children == undefined && OldData[a]?.children == null || OldData[a]?.children?.length == 0) && OldData[a]?.data?.MenuItemId === event.node.data) {
        OldData = OldData.filter(f => f.data.MenuItemId !== event.node.data);
        this.lstActionItemAccess = [];
        this.lstActionItemAccess = cloneDeep(OldData)/*JSON.parse(JSON.stringify(OldData))*/;
      }
      else if (OldData[a]?.children != undefined && OldData[a]?.children != null && OldData[a]?.children?.length > 0 && OldData[a]?.data.MenuItemId === event.node.data) {
        OldData = OldData.filter(f => f.data.MenuItemId !== event.node.data);

        this.lstActionItemAccess = [];
        this.lstActionItemAccess = cloneDeep(OldData)/*JSON.parse(JSON.stringify(OldData))*/;
      }
      else if (OldData[a]?.children != undefined && OldData[a]?.children != null && OldData[a]?.children?.length > 0 && OldData[a]?.data?.MenuItemId != event.node.data) {
        for (var x = 0; x < OldData[a]?.children?.length; x++) {
          if (OldData[a]?.children[x]?.data.MenuItemId === event.node.data) {
            OldData[a].children = OldData[a].children?.length > 1 ? OldData[a].children.filter(y => y.data.MenuItemId !== event.node.data) : [];
            if (OldData[a]?.children?.length == 0) {
              OldData = OldData.filter(f => f.data.MenuItemId !== OldData[a].data.MenuItemId);
            }
            this.lstActionItemAccess = [];
            this.lstActionItemAccess = cloneDeep(OldData) /*JSON.parse(JSON.stringify(OldData))*/;
          }
        }
      }
    }
  }
  LoadMenuItemMasterByUserType() {
    this.selectedNodes2 = [];
    this.MenuitemMaster = [];
    this._UtilityService.showSpinner();
    this._MasterServices.GetUserMenuItemAccessByModuleId(this.RegistrationMainModel.UserTypeId, this.RegistrationMainModel.UserId)
      .subscribe
      (
        data => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.MenuitemMaster = tdata;
            this.CheckTreeSelectedValue();
          }
          else {
            this.MenuitemMaster = [];
          }
        },
        error => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(error.message);
        }
      );
  }
  CheckTreeSelectedValue() {
    if (this.RegistrationMainModel.UserAuthorization?.length > 0) {
      let dataArray: any[] = [];
      var SelectedListTree = this.RegistrationMainModel.UserAuthorization;
      SelectedListTree.map(e => {
        dataArray.push(e.MenuItemId);
      });
      this.checkNode(this.MenuitemMaster, dataArray);
      //console.log("Selected Tree Value ",this.selectedNodes2);
      var UserAuthorizationss: any[] = [];
      this.selectedNodes2.map(e => {
        UserAuthorizationss.push({ "MenuItemId": e.data });
        if (e.parent != null) {
          UserAuthorizationss.push({ "MenuItemId": e.parent.data });
          if (e.parent.parent != null) {
            UserAuthorizationss.push({ "MenuItemId": e.parent.parent.data });
            if (e.parent.parent.parent != null) {
              UserAuthorizationss.push({ "MenuItemId": e.parent.parent.parent.data });
            }
          }
        }
      });
      //this.selectedNodes2=this.TempNodeVal;
      //console.log("Selected Tree Value Converted ",JSON.stringify(UserAuthorizationss));
    }
  }
  checkNode(nodes: TreeNode[], str: string[]) {
    nodes.forEach(node => {
      //check parent      
      if (str.includes(node.data)) {
        this.selectedNodes2.push(node);
      }
      if (node.children != undefined) {
        node.children.forEach(child => {
          //check child if the parent is not selected
          if (str.includes(child.label) && !str.includes(node.label)) {
            node.partialSelected = true;
            child.parent = node;
          }

          //check the child if the parent is selected
          //push the parent in str to new iteration and mark all the childs
          if (str.includes(node.label)) {
            child.parent = node;
            str.push(child.label);
          }
        });
      } else {
        return;
      }
      this.checkNode(node.children, str);
      node.children.forEach(child => {
        if (child.partialSelected) {
          node.partialSelected = true;
        }
      });
    });
  }
  onChangeUserType() {
    // if (this.RegistrationMainModel.UserTypeId == UserTypes.SuperAdmin) {
    //   this.LoadClinicMaster();
    // }
    this.LoadMenuItemMasterByUserType();
    //this.LoadItemCatgMasterForAccess();
  }
  CheckUnCheck(event, actType, MenuItemId) {
    this.CheckChildComponent(event, actType, MenuItemId);
  }
  CheckChildComponent(event, actType, MenuItemId) {
    for (var a = 0; a < this.lstActionItemAccess.length; a++) {
      if (this.lstActionItemAccess[a].children != null && this.lstActionItemAccess[a].children?.length > 0 && this.lstActionItemAccess[a].data.MenuItemId === MenuItemId) {
        for (var x = 0; x < this.lstActionItemAccess[a].children?.length; x++) {
          this.lstActionItemAccess[a].children[x].data[actType] = (event.checked == true) ? true : false;
          if (this.lstActionItemAccess[a].children[x].children != null && this.lstActionItemAccess[a].children[x].children?.length > 0) {
            for (var y = 0; y < this.lstActionItemAccess[a].children[x].children?.length; y++) {
              this.lstActionItemAccess[a].children[x].children[y].data[actType] = (event.checked == true) ? true : false;
            }
          }
        }
      }

    }
  }
  LoadMenuItemAccessforActionItem() {
    this.lstActionItemAccess = [];
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserMenuItemAccessByModuleIdTreeTable(this.RegistrationMainModel.UserTypeId, this.RegistrationMainModel.UserId)
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstActionItemAccess = tdata;
            //console.log("Action Details",this.lstActionItemAccess);
          }
          else {
            this.lstActionItemAccess = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.Message);
        },
      });
  }
  // returns keys of enum
  transform(value: any): [number, string][] {
    return Object.keys(value).filter(t => isNaN(+t)).map(t => [value[t], t]);
  }

}
