import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() EmitUpdateAlert: EventEmitter<any> = new EventEmitter<any>();
  
  customDateFormat = CustomDateFormat;
  public AlertList: any[] = [];
  filteredValuesLength: number = 0;
  isAlertList: Boolean = false;
  ComponentName: string = 'AlertList';
  s_userTypeId: any = localStorage.getItem('userTypeId');
  filteritems: any[] = [];

  ActionTakenData: any = <any>{};
  isShowActionTakenPopup: boolean = false;
  loginId: any;

  constructor(
    private _ConstantServices: ConstantsService,
    private _UserServices: UserService,
    private _MasterServices: MasterService,
    private _UtilityService: UtilityService,) {
    super();
    this._ConstantServices.ActiveMenuName = "Alert List";
  }


  ngOnInit(): void {
    this.GetAllAlert();
  }


  GetAllAlert() {
    let importData: any = <any>{};

    if (this.filteritems != null && this.filteritems.length != 0) {
      importData.SearchList = this.filteritems;

      this.filteritems.forEach(item => {
        if (item.SearchBy == 'DFrom') {
          importData.dFrom = item.SearchVal;
        }
        if (item.SearchBy == 'DTo') {
          importData.dTo = item.SearchVal;
        }
      });
    }
    console.log(importData);
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserServices
      .GetAllAlert(importData,null)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.AlertList = tdata;
            this.AlertList.forEach(chart => {
              if (chart.ProfileImage) {
                const imageFormat = this._UtilityService.getFileExtension(chart.ProfileImage);
                chart.ProfileImage = `data:image/${imageFormat};base64,${chart.ProfileImage}`;
              }
            });
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

  ShowFilters() {
    this.isAlertList = !this.isAlertList;
  }
  GetAlertListFilterData($event) {
    this.filteritems = $event;
    this.GetAllAlert();
    console.log(this.filteritems);
  }

  showPopup(alertId, alert) {
    this.ActionTakenData = {
      dailyVitalsAlertId: alertId,
      actionRemarks: alert.actionRemarks,
      actionBy: this.loginId,
      isActionTaken: false,
      // residentAdmissionInfoId: this.admissionid
    };
    this.isShowActionTakenPopup = true;
  }


  Changes(value: boolean) {
    this.isShowActionTakenPopup = value;
    this.alertOnChange();
  }

  alertOnChange() {
      this.GetAllAlert();
  }

  AlertChanges(value: number) {
    this.EmitUpdateAlert.emit(value);
    this.GetAllAlert();
  }


  calculateAge(birthday): number {
    if (birthday != undefined) {
      var curdate = new Date();
      var dob = new Date(birthday);
      var ageyear = curdate.getFullYear() - dob.getFullYear();
      var agemonth = curdate.getMonth() - dob.getMonth();
      var ageday = curdate.getDate() - dob.getDate();
      if (agemonth <= 0) {
        ageyear--;
        agemonth = (12 + agemonth);
      }
      if (curdate.getDate() < dob.getDate()) {
        agemonth--;
        ageday = 30 + ageday;
      } if (agemonth == 12) {
        ageyear = ageyear + 1;
        agemonth = 0;
      }
      return ageyear;
    }
    else
      return 0;
  }

}
