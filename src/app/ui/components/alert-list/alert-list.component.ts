import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertHeadlines, AlertTypes, AlertUnit, ConstantsService, CustomDateFormat } from '../../service/constants.service';
import { MasterService } from '../../service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UserService } from '../../service/user.service';
import { Table } from 'primeng/table';
import { log } from 'console';

interface BodyPart {
  name: string;
  top: number;
  left: number;
}

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})

export class AlertListComponent extends AppComponentBase implements OnInit {

  @Output() EmitUpdateAlert: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  public importData: any = <any>{};
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
    this.importData = {};
    if (this.filteritems != null && this.filteritems.length != 0) {
      this.importData.SearchList = this.filteritems;

      this.filteritems.forEach(item => {
        if (item.SearchBy == 'DFrom') {
          this.importData.dFrom = item.SearchVal;
        }
        if (item.SearchBy == 'DTo') {
          this.importData.dTo = item.SearchVal;
        }
      });
    }
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserServices
      .GetAllAlert(this.importData, '')
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
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
          var tdata = data.actionResult.result;
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

  GetHeadline(alertMasterId: any): any {

    if (alertMasterId == AlertTypes.BloodPressureAlert) {
      return AlertHeadlines.BloodPressureHeadline;
    } else if (alertMasterId == AlertTypes.WeightAlert) {
      return AlertHeadlines.WeightHeadline;
    } else if (alertMasterId == AlertTypes.BloodGlucoseAlert) {
      return AlertHeadlines.BloodGlucoseHeadline;
    } else if (alertMasterId == AlertTypes.NEWS2Alert) {
      return AlertHeadlines.NewsPulseAlertHeadline;
    } else if (alertMasterId == AlertTypes.HighTemperatureAlert) {
      return AlertHeadlines.TemperatureAlertHeadline;
    } else {
      return '';
    }
  }

  GetAlertUnit(alertMasterId: any): any {
    if (alertMasterId == AlertTypes.BloodPressureAlert) {
      return AlertUnit.BPUnit;
    } else if (alertMasterId == AlertTypes.WeightAlert) {
      return AlertUnit.WeightUnit;
    } else if (alertMasterId == AlertTypes.BloodGlucoseAlert) {
      return AlertUnit.BGUnit;
    } else if (alertMasterId == AlertTypes.FluidIntakeAlert) {
      return AlertUnit.FluidUnit;
    } else if (alertMasterId == AlertTypes.NEWS2Alert) {
      return AlertUnit.PulseUnit;
    } else if (alertMasterId == AlertTypes.OxygenSaturationAlert) {
      return AlertUnit.OxygenUnit;
    } else if (alertMasterId == AlertTypes.HighTemperatureAlert) {
      return AlertUnit.TemperatureUnit;
    } else {
      this.alertUnit = '';
      return '';
    }
  }


  extractBodyPainLocations(bodyParts: BodyPart[]): string {
    if (bodyParts) {
      return bodyParts.map(part => part.name).join(', ');
    }
    else return null;
  }



}
