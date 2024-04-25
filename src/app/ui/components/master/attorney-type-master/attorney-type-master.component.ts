import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-attorney-type-master',
  templateUrl: './attorney-type-master.component.html',
  styleUrls: ['./attorney-type-master.component.scss']
})
export class AttorneyTypeMasterComponent extends AppComponentBase implements OnInit {
  @ViewChild('myForm') public myForm: NgForm;
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  mode: string = null;
  public lstMaster: any[]=[];
  public master: any = <any>{};
  filteredValuesLength:number=0;
  stlststatus: any[]=[];
  
  constructor(private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,    
  ) 
  { 
    super();
    this._ConstantServices.ActiveMenuName = "Attorney Type Master"; 
    this.stlststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];    
  } 
  ngOnInit(): void {
   this.GetAttorneyTypeMaster();        
  }
  GetAttorneyTypeMaster() {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetAttorneyTypeMaster(false)
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
  GetAttorneyTypeMasterById(id) {
    this._UtilityService.showSpinner();
    this.mode = "Edit";
    this.unsubscribe.add = this._MasterServices.GetAttorneyTypeMasterById(id)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.master = tdata;
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
    this.unsubscribe.add = this._MasterServices.AddInsertUpdateAttorneyType(this.master)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.GetAttorneyTypeMaster();
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
    this.master.Status = 1;
    
  }
  Close() {
    this.mode = null;
  }
  exportToItemExcel() {
    let importData: any = <any>{};
    importData.reportname = "AttorneyType";
    importData.filename = "AttorneyType";
    this._MasterServices.downloadReport(importData);
  } 
  //Filter
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

