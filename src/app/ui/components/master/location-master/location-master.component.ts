import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-location-master',
  templateUrl: './location-master.component.html',
  styleUrls: ['./location-master.component.scss']
})
export class LocationMasterComponent extends AppComponentBase implements OnInit {
  @ViewChild('myForm') public myForm: NgForm;
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  mode: string = null;
  lstHomeMaster: any[]=[];
  public lstMaster: any[]=[];
  public master: any = <any>{};
  filteredValuesLength:number=0;
  stlststatus: any[]=[];
  
  ComponentName: string = 'LocationMaster';
  isLocationMaster:Boolean=false;
  isHomeMaster:Boolean=false;
  filteritems:any[]=[];

  constructor(private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,    
  ) 
  { 
    super();
    this._ConstantServices.ActiveMenuName = "Location Master"; 
    this.stlststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];    
  } 
  ngOnInit(): void {
   this.LoadHomeMaster();
   this.GetLocationMaster();        
  }
  LoadHomeMaster() {
    let importData: any = <any>{};
    if(this.isHomeMaster==true && this.filteritems !=null && this.filteritems !=undefined)
      {       
        importData.SearchList=this.filteritems;
      } 
      importData.StatusType=true;
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetHomeMaster(importData)
      .subscribe
      ({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
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
  GetLocationMaster() {
    let importData: any = <any>{};
    if(this.isLocationMaster==true && this.filteritems !=null && this.filteritems !=undefined)
      {       
        importData.SearchList=this.filteritems;
      }   
      importData.StatusType=false;  
      importData.isExcel=false;  
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetLocationMaster(importData)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
            tdata = tdata ? tdata : [];
            this.lstMaster = tdata;
            if (this.filtr !== undefined) {
              this.filtr.nativeElement.value = "";
              this.dataTable.reset();
              this.filteredValuesLength = this.lstMaster?.length;
              }            
       
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
  GetLocationMasterById(id) {
    this._UtilityService.showSpinner();
    this.ResetModel();
    this.mode = "Edit";
    this.unsubscribe.add = this._MasterServices.GetLocationMasterById(id)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
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
    this.unsubscribe.add = this._MasterServices.AddInsertUpdateLocationMaster(this.master)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.GetLocationMaster();
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
    importData.reportname = "Location";
    importData.filename = "Location";
    this._MasterServices.downloadReport(importData);
  } 
  //Filter
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  ShowFilters() {
    this.isLocationMaster =!this.isLocationMaster;
  }
  GetLocationMasterFilterData($event) {
    this.filteritems=$event;   
     this.GetLocationMaster(); 
   }
}
