import { Component, OnInit } from '@angular/core';
import { ConstantsService, CustomDateFormat } from '../../service/constants.service';
import { MasterService } from '../../service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UserService } from '../../service/user.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent extends AppComponentBase implements OnInit {

  customDateFormat = CustomDateFormat;
  public AlertList: any[] = [];
  filteredValuesLength: number = 0;
  s_userTypeId: any = localStorage.getItem('userTypeId');

  constructor(
    private _ConstantServices: ConstantsService,
    private _UserServices: UserService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,) {
    super();
    this._ConstantServices.ActiveMenuName = "Alert List";
  }


  ngOnInit(): void {
    this.GetAllAlert();
    console.log(this.s_userTypeId);

  }


  GetAllAlert() {
    let importData: any = <any>{};
    let dFrom = null;
    var dTo = null;
    //this.SearchList1 = [];
    var residentAdmissionInfoId = "845745dfhd567"
    // if (this.rangeDates != null) {
    //     if (this.rangeDates[0] != null) {
    //         dFrom = this.datepipe.transform(this.rangeDates[0], "yyyy-MM-dd");
    //         importData.dFrom = dFrom;
    //     }
    //     if (this.rangeDates[1] != null) {
    //         dTo = this.datepipe.transform(this.rangeDates[1], "yyyy-MM-dd");
    //         importData.dTo = dTo;
    //     }
    // }
    // if (this.selectedAlertMasterId != null && this.selectedAlertMasterId != '') {
    //     this.SearchList1.push({ 'SearchBy': 'AlertType', 'SearchVal': this.selectedAlertMasterId });
    // }
    // if (this.selectedStatusId != null) {
    //     this.SearchList1.push({ 'SearchBy': 'Status', 'SearchVal': this.selectedStatusId.toString() });
    // }
    // importData.SearchList = this.SearchList1;


    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserServices
      .GetAllAlert(importData, residentAdmissionInfoId)
      .subscribe({
        next: (data) => {
          console.log(residentAdmissionInfoId);
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.AlertList = tdata;
            console.log(this.AlertList);

          }
          else {
            this.AlertList = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
    importData = {};

  }

  //Export
  exportToItemExcel() {
    let importData: any = <any>{};
    importData.reportname = "alertList";
    importData.filename = "alertList";
    this._MasterServices.downloadReport(importData);
  }

   //Filter
 onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}

}
