import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MasterService } from 'src/app/ui/service/master.service';

@Component({
  selector: 'app-manage-action-schedules',
  templateUrl: './manage-action-schedules.component.html',
  styleUrls: ['./manage-action-schedules.component.scss']
})
export class ManageActionSchedulesComponent implements OnInit {
 
  isAlertList: boolean;
  filteritems: any;
  ComponentName: string = 'AlertList';
  importData: any;

  constructor(
    private _MasterServices: MasterService
  ) { }

  ngOnInit(): void {
  }


  ShowFilters() {
    this.isAlertList = !this.isAlertList;
  }

  GetAlertListFilterData($event) {
    this.filteritems = $event;
    // this.GetAllAlert();
    console.log(this.filteritems);
  }

    //Export
    exportToItemExcel() {
      this.importData.reportname = "alertList";
      this.importData.filename = "alertList";
      this.importData.isExcel=true;
      console.log("last data");
      
      console.log(this.importData);
      
      this._MasterServices.downloadReport(this.importData);
    }

    
  //Filter
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
