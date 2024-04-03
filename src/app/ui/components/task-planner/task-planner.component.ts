import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConstantsService, CustomDateFormat, TaskPlannerStatus, UserTypes } from 'src/app/ui/service/constants.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { MasterService } from '../../service/master.service';


@Component({
  selector: 'app-task-planner',
  templateUrl: './task-planner.component.html',
  styleUrls: ['./task-planner.component.scss']
})
export class TaskPlannerComponent extends AppComponentBase implements OnInit {
  @ViewChild('myForm') public myForm: NgForm;
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  taskPlannerStatus = TaskPlannerStatus;
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
  selectedUser: any = <any>{};
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,    
  ) 
  { 
    super();
    this._ConstantServices.ActiveMenuName = "Task Planner"; 
    this.stlststatus = [
      { name: this.taskPlannerStatus[this.taskPlannerStatus.Open], code: this.taskPlannerStatus.Open, disabled: false },
      { name: this.taskPlannerStatus[this.taskPlannerStatus.InProgress], code: this.taskPlannerStatus.InProgress,disabled: true },
      { name: this.taskPlannerStatus[this.taskPlannerStatus.Done], code: this.taskPlannerStatus.Done, disabled: true }
    ];    
  } 
  ngOnInit(): void {   
    if (UserTypes.SuperAdmin === this.s_userTypeId) {
      this.LoadHomeMaster();
    }
   this.GetTaskPlanner();        
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

  SearchUser(event) {
    let query = event.query;
    var HomeMasterId = "";
    if (this.s_userTypeId != UserTypes.SuperAdmin) {
      HomeMasterId = localStorage.getItem('HomeMasterId');
    }
    //this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetAllUserList(HomeMasterId, query)
      .subscribe(
        data => {
          //this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.results = tdata;
          }
          else {
            this.results = [];
          }
        }
      );
  }
  
  GetTaskPlanner() {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetTaskPlanner()
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
  GetTaskPlannerById(id) {
    this._UtilityService.showSpinner();
    this.ResetModel();
    this.mode = "Edit";
    this.unsubscribe.add = this._MasterServices.GetTaskPlannerById(id)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.master = tdata;
            if(this.master?.StartTime!=null && this.master?.StartTime!=undefined)
            {
              this.master.StartTime = new Date(this.master.StartTime);
            }
            if(this.master?.DueTime!=null && this.master?.DueTime!=undefined)
            {
              this.master.DueTime = new Date(this.master.DueTime);
            }
            this.stlststatus.forEach(e => {
              var exist = this.stlststatus.find(f => f.code == e.code && e.code==this.taskPlannerStatus.Open);
              if(exist || (this.master.Status==this.taskPlannerStatus.Done))
              {
                e.disabled=true;
              } 
               else
               e.disabled=false;
            }); 
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
    this.master.AssignedTo =  this.selectedUser.UserId;
    this.master.ModifiedBy = localStorage.getItem('userId');
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.AddInsertUpdateTaskPlanner(this.master)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.GetTaskPlanner();
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
    this.master.Status = this.taskPlannerStatus.Open;
    this.stlststatus.forEach(e => {
      var exist = this.stlststatus.find(f => f.code == e.code && e.code==this.taskPlannerStatus.Open);
      if(exist)
      {
        e.disabled=false;
       } 
       else
       e.disabled=true;
    }); 
  }
  Close() {
    this.mode = null;
  }

  DeleteTaskPlanner(id) {
    this.master.StatementType = "Delete";
    this.master.TaskPlannerId = id;
    this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateTaskPlanner(this.master)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.GetTaskPlanner();
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
