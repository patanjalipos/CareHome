import { Component, ElementRef, Injectable, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConstantsService, UserTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';


@Component({
  selector: 'app-menu-item-master',
  templateUrl: './menu-item-master.component.html',
  styleUrls: ['./menu-item-master.component.scss'],
   
})
export class MenuItemMasterComponent extends AppComponentBase implements OnInit{  
 @ViewChild('myForm') public myForm: NgForm;
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  userTypes = UserTypes;
  s_userTypeId: any = localStorage.getItem('userTypeId');
  mode: string = null;
  MenuItemMasterByModule:any=[];
  public lstMenuItemMaster: any[]=[];
  public lstParentMenuItemMaster: any[]=[];
  public lstUserTypeMaster: any[]=[];
  public MenuItemMaster: any = <any>{};
  selectedUserType: any[]=[];
  filteredValuesLength:number=0;
  stlststatus: any[]=[];
  stlstsubmenu: any[]=[];
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,    
  ) 
  { 
    super();
    this._ConstantServices.ActiveMenuName = "Menu Master"; 
    this.stlststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];
    this.stlstsubmenu = [
      { name: 'Yes', code: 'Y' },
      { name: 'No', code: 'N' }
    ];
  } 
  ngOnInit(): void {
   this.LoadMenuItemList();
    this.LoadUserTypeMasterList();    
  }
  LoadMenuItemList() {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetMenuItemMaster (this.s_userTypeId==this.userTypes.SuperAdmin?"":this.s_userTypeId,false)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstMenuItemMaster = tdata;
            this.lstParentMenuItemMaster=tdata;
            if (this.filtr !== undefined) {
              this.filtr.nativeElement.value = "";
              this.dataTable.reset();
              this.filteredValuesLength = this.lstMenuItemMaster?.length;
              }            
          //  console.log(this.lstMenuItemMaster);
          }
          else {
            this.lstMenuItemMaster = [];
            this.lstParentMenuItemMaster=[]
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  LoadUserTypeMasterList() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserTypeMaster(this.s_userTypeId)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();
          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstUserTypeMaster = tdata;            
          }
          else {
            this.lstUserTypeMaster = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }  
  LoadMenuItemMasterById(MenuItemId) {
    this._UtilityService.showSpinner();
    this.mode = "Edit";
    this.selectedUserType=[];   
    this.unsubscribe.add = this._MasterServices.GetMenuItemMasterById(MenuItemId)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.MenuItemMaster = tdata;
            if(data.actionResult.result2!=null && data.actionResult.result2!=undefined && data.actionResult.result2?.length>0)
            {
              var tdata2 = JSON.parse(data.actionResult.result2);
              tdata2 = tdata2 ? tdata2 : [];
              var checkedItemArray: any[] = [];
              for (var i = 0; i < tdata2?.length; i++) {
                checkedItemArray.push(tdata2[i]?.UserTypeId);
              } 
              this.selectedUserType=checkedItemArray;                                      
            }
            this.lstParentMenuItemMaster=JSON.parse(JSON.stringify(this.lstMenuItemMaster.filter(f=>f.MenuItemId!=MenuItemId)));
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  Save() {
    if (this.MenuItemMaster?.SubMenu == "Y" && (this.MenuItemMaster?.ParentMenuId == null || this.MenuItemMaster?.ParentMenuId == undefined  || this.MenuItemMaster?.ParentMenuId == '')) {
      this._UtilityService.showWarningAlert("Please select parent menu");
      return;
    }
    var checkedItemArray: any[] = [];
    for (var i = 0; i < this.selectedUserType?.length; i++) {
      checkedItemArray.push({
        "id": this.selectedUserType[i]
      });      
    }
    this.MenuItemMaster.lstUserTypeId = checkedItemArray;
    if (this.mode == "Add")
      this.MenuItemMaster.statementtype = "Insert";
    else
      this.MenuItemMaster.statementtype = "Update";
      if (this.MenuItemMaster.SubMenu == 'N')
      this.MenuItemMaster.ParentMenuId = null;
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.AddUpdateMenuItemMaster(this.MenuItemMaster)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.LoadMenuItemList();
            this.mode = null;
          }
          else {
            this._UtilityService.showWarningAlert(data.actionResult.errMsg);
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  AddNewMenuItemType() {
    this.ResetModel();
    this.mode = "Add";    
    this.myForm?.resetForm();
  }
  ResetModel() {
    this.selectedUserType=[];
    this.MenuItemMaster = <any>{};
    this.MenuItemMaster.Status = 1;
    this.lstParentMenuItemMaster=JSON.parse(JSON.stringify(this.lstMenuItemMaster));
  }
  CloseModal() {
    this.mode = null;
  }
  exportToItemExcel() {
    let importData: any = <any>{};
    importData.reportname = "MenuItem";
    importData.filename = "MenuItem";
    importData.createdBy=this.s_userTypeId==this.userTypes.SuperAdmin?"":this.s_userTypeId;
    this._MasterServices.downloadReport(importData);
  } 
  //Filter
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
