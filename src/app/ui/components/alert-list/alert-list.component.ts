import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertHeadlines, AlertTypes, AlertUnit, ConstantsService, CustomDateFormat } from '../../service/constants.service';
import { MasterService } from '../../service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UserService } from '../../service/user.service';
import { Table } from 'primeng/table';
import { log } from 'console';

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
  alertCount: any;
  ResidentMaster: any;

  alertHeadline: string = '';
  alertUnit: string = '';
  alertTypes = AlertTypes;

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
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserServices
      .GetAllAlert(importData, null)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.AlertList = tdata;
            console.log("asfdsfsfd");

            console.log(this.AlertList);

            this.AlertList.forEach(chart => {
              if (chart.ProfileImage) {
                const imageFormat = this._UtilityService.getFileExtension(chart.ProfileImage);
                chart.ProfileImage = `data:image/${imageFormat};base64,${chart.ProfileImage}`;
              }
            });
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
    this.LoadResidentDetails(alert.userId, alert.residentAdmissionInfoId);
    setTimeout(() => this.insertData(alertId, alert), 900);

  }



  insertData(alertId, alert) {
    this.ActionTakenData = {
      dailyVitalsAlertId: alertId,
      actionRemarks: alert.actionRemarks,
      actionBy: this.loginId,
      isActionTaken: false,
      residentAdmissionInfoId: alert.residentAdmissionInfoId,
      residentDetails: this.ResidentMaster,
      alertData: alert
    };
    this.isShowActionTakenPopup = true;
  }


  LoadResidentDetails(userid, admissionid) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserServices.GetResidentDetailsById(userid, admissionid)
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {

            this.alertCount = data.actionResult.value;
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.ResidentMaster = tdata;
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
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

  counter: number = 0;
  GetHeadline(alertMasterId: any): any {
    if (alertMasterId === AlertTypes.BloodPressureAlert) {
      this.alertHeadline = AlertHeadlines.BloodPressureHeadline;
      return this.alertHeadline;

    } else if (alertMasterId === AlertTypes.WeightAlert) {

      this.alertHeadline = AlertHeadlines.WeightHeadline;
      return this.alertHeadline;

    } else if (alertMasterId === AlertTypes.BloodGlucoseAlert) {

      this.alertHeadline = AlertHeadlines.BloodGlucoseHeadline;
      return this.alertHeadline;

    } else if (alertMasterId === AlertTypes.NEWS2Alert) {

      if (this.AlertList[this.counter].isOxygenNewsAlert === true) {

        this.alertHeadline = AlertHeadlines.NewsOxygenAlertHeadline;
        this.counter++;
        return this.alertHeadline;
      } else if (this.AlertList[this.counter].isPulseNewsAlert === true) {

        this.alertHeadline = AlertHeadlines.NewsPulseAlertHeadline;
        this.counter++;
        return this.alertHeadline;
      }


    } else {
      this.alertUnit = '';
      this.alertHeadline = '';
      return '';
    }

  }

  GetUnit(alertMasterId: any):any {
    if (alertMasterId == AlertTypes.BloodPressureAlert) {
      this.alertUnit = AlertUnit.BPUnit;
      return AlertUnit.BPUnit;
    }
    else if (alertMasterId == AlertTypes.WeightAlert) {
      this.alertUnit = AlertUnit.WeightUnit;
      return AlertUnit.WeightUnit;
    }
    else if (alertMasterId == AlertTypes.BloodGlucoseAlert) {
      this.alertUnit = AlertUnit.BGUnit;
      return AlertUnit.BGUnit;
    }
    else if (alertMasterId === AlertTypes.NEWS2Alert) {

      if (this.AlertList[this.counter].isOxygenNewsAlert === true) {

        this.alertUnit = AlertUnit.OxygenUnit;
        return this.alertUnit;
     
      } else if (this.AlertList[this.counter].isPulseNewsAlert === true) {

        this.alertUnit = AlertUnit.PulseUnit;
        this.counter++;
        return this.alertUnit;
      }
   
    }
    else {
      this.alertUnit = '';
      return '';
    }
  }


}
