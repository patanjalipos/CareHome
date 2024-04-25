import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { MasterService } from '../../service/master.service';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent extends AppComponentBase implements OnInit {
  @ViewChild('myForm') public myForm: NgForm;
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  s_userTypeId: any = localStorage.getItem('userTypeId');
  today:Date=new Date();
  mode: string = null;
  lstHomeMaster: any[]=[];
  public lstMaster: any[]=[];
  public master: any = <any>{};
  filteredValuesLength:number=0;
  stlststatus: any[]=[];  
  results: any[]=[];
  disabled:boolean=false;
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,    
  ) 
  { 
    super();
    this._ConstantServices.ActiveMenuName = "Activity"; 
    this.stlststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];   
  } 
  ngOnInit(): void { 
    if (UserTypes.SuperAdmin === this.s_userTypeId) {
      this.LoadHomeMaster();
    }  
   this.GetActivity();        
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

  GetActivity() {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetActivity()
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstMaster = tdata;
            if (this.filtr !== undefined) {
              this.filtr.nativeElement.value = "";
              this.dataTable.reset();
              this.filteredValuesLength = this.lstMaster?.length;
              }            
          //  console.log(this.lstmaster);
          }
          else {
            this.lstMaster = [];            
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }   
  GetActivityById(id) {
    this._UtilityService.showSpinner();
    this.ResetModel();
    this.mode = "Edit";
    this.unsubscribe.add = this._MasterServices.GetActivityById(id)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.master = tdata;
            if(this.master?.ActivityTime!=null && this.master?.ActivityTime!=undefined)
            {
              this.master.ActivityTime = new Date(this.master.ActivityTime);
            }            
            }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  Save() {   
    if (this.mode == "Add")
      this.master.statementtype = "Insert";
    else
      this.master.statementtype = "Update";
    
    this.master.ModifiedBy = localStorage.getItem('userId');;  
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.AddInsertUpdateActivity(this.master)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.GetActivity();
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
  AddNewItem() {
    this.ResetModel();
    this.mode = "Add";    
    this.myForm?.resetForm();
  }
  ResetModel() {
    this.master = <any>{};
    if (UserTypes.SuperAdmin !== this.s_userTypeId) {
      this.master.HomeMasterId = localStorage.getItem('HomeMasterId');
    } 
    this.master.Status = 1;    
  }
  Close() {
    this.mode = null;
  }

  DeleteActivity(id) {
    this.master.StatementType = "Delete";
    this.master.ActivityId = id;
    this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateActivity(this.master)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.GetActivity();
            this.Close();
          },
          error: (e) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(e.message);
          },
        });    
  }
  
  //Filter
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}