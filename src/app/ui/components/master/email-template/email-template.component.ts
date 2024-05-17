import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import {MessageService} from 'primeng/api'; 
import { ActionItem, ConstantsService } from 'src/app/ui/service/constants.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { MasterService } from 'src/app/ui/service/master.service';

@Component({
  selector: 'app-email-template',
  templateUrl: './email-template.component.html',
  styleUrls: ['./email-template.component.scss'],
  
})
export class EmailTemplateComponent extends AppComponentBase implements OnInit {public Editor;
  config:any;
  
  @ViewChild('myForm') public myForm: NgForm;
  mode: string = null;
  public lstEmailTemplate: any[]=[];
  public commonEmailDrafting: any = <any>{};
  stlststatus: any[]=[];  
  // Action Access
  lstIAccess: any[] = [];
  lstIAccessStr: string[] = [];
  ActionList = ActionItem;
  constructor(
    private router: Router,
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService : UtilityService,
  ) 
  {
    super();
    this._ConstantServices.ActiveMenuName = "Email Template";
    var CurURL = this.router.url;
    var MenuAccess = JSON.parse(localStorage.getItem('UerRoleAccess'));
    if (MenuAccess.find(e => e.MenuItemURL === CurURL)) {
      this.lstIAccess = MenuAccess.find(e => e.MenuItemURL === CurURL)?.ActionIAccess;
      if (this.lstIAccess?.length > 0) {
        this.lstIAccess.map(e => {
          this.lstIAccessStr.push(e.ActionId.toString());
        });
      }
    }
    this.stlststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];
  }

  ngOnInit(): void {
    this.GetAllEmailDrafting();
    this.config = {
      toolbar: {
        items: [ 'bold', 'italic', '|', 'undo', 'redo', '|', 'numberedList', 'bulletedList' ],    
        shouldNotGroupWhenFull: true
      }
    };

  }
  GetAllEmailDrafting() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetAllEmailDrafting()
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstEmailTemplate = tdata;            
          }
          else {
            this.lstEmailTemplate = [];            
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.Message);
        },
      });
  }  
  LoadEmailTemplateByType(DId) {
    this.unsubscribe.add = this._MasterServices.GetEmailTemplateByType(DId)
      .subscribe({
        next:(data) => {
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.commonEmailDrafting = tdata;
            this.mode = "update";            
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.Message);
        },
      });
  }
  Save() { 
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.SaveUpdateEmailDrafting(this.commonEmailDrafting)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner(); 
          
          this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
          if (data.actionResult.success == true) {
            this.GetAllEmailDrafting();
            this.mode = null;
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.Message);
        },
      });
  }
  AddNewEmailDrafting() {
    this.ResetModel();
    this.mode = "Add";    
    this.myForm?.resetForm();
  }
  ResetModel() {
    this.commonEmailDrafting = <any>{};
    this.commonEmailDrafting.Status = 1;
  }
  CloseModal() {
    this.mode = null;
  }
  //Filter
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
