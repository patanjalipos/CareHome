import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { MasterService } from 'src/app/ui/service/master.service';



@Component({
  selector: 'app-missed',
  templateUrl: './missed.component.html',
  styleUrls: ['./missed.component.scss']
})
export class MissedComponent implements OnInit {

  isAction: boolean;
  filteritems: any;
  ComponentName: string = 'Action';
  importData: any;

  constructor(
    private _MasterServices: MasterService,
  ) { }

  ngOnInit(): void {
  }

  ShowFilters() {
    this.isAction = !this.isAction;
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
    this.importData.isExcel = true;
    console.log("last data");

    console.log(this.importData);

    this._MasterServices.downloadReport(this.importData);
  }


  //Filter
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
