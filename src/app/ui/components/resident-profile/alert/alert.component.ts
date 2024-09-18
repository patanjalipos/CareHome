import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { AlertHeadlines, AlertTypes, AlertUnit, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { Calendar } from 'primeng/calendar';
import { UserService } from 'src/app/ui/service/user.service';
import { ResidentProfileService } from '../resident-profile.service';
import { log } from 'console';
import { Router } from '@angular/router';

interface BodyPart {
    name: string;
    top: number;
    left: number;
  }
  
@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends AppComponentBase implements OnInit {
    @Input() mode: string = 'view';
    @Input() userid: any = null;
    @Input() admissionid: any = null;
    @Input() residentadmissiondetails: any = <any>{};
    @Output() EmitUpdateAlert: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    selectedAlertMasterId: string = null;
    selectedStatusId: number = null;
    public lstAlertMaster: any[] = [];
    public stlstStatus: any[] = [];
    public AlertList: any[] = [];
    rangeDates: Date[] = [];
    SearchList1: any[] = [];

    ActionTakenData: any = <any>{};
    isShowActionTakenPopup: boolean = false;
    loginId: any;

    alertHeadline: string = '';
    alertUnit: string = '';
    alertTypes = AlertTypes;

    reloadInterval: any;

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private _UserServices: UserService,
        private sharedStateService: ResidentProfileService,
        private datepipe: DatePipe,
        private router: Router) {
        super();

        this.stlstStatus = [{ name: 'Active', code: 1 },
        { name: 'Inactive', code: 0 }
        ]
        // this.rangeDates = [new Date(), new Date()];

        this.loginId = localStorage.getItem('userId');
    }

    ngOnInit(): void {
        this.GetAlertMaster();
        this.GetAllAlert();
        this.startAutoReload();
    }

    override ngOnDestroy(): void {
        if (this.reloadInterval) {
          clearInterval(this.reloadInterval);
        }
      }

    dateRangeChange(calendar: Calendar) {
        this.sharedStateService.tranferValu(true);
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            calendar.overlayVisible = false;
            //this.GetDailyVitalAlertLog();
        }

    }

    //For reloading of component within specific time interval, i.e, in this case it is executing every 1 minute

    // startAutoReload(): void {
    //     this.reloadInterval = setInterval(() => {
    //       this.reloadComponent();
    //     }, 1 * 60 * 1000); // 1 minutes in milliseconds
    //   }

    // startAutoReload(): void {
    //     const now = new Date();
    //     const nextMidnight = new Date();
      
    //     // Set the time to midnight
    //     nextMidnight.setHours(24, 0, 0, 0);
      
    //     // Calculate the time difference in milliseconds
    //     const timeUntilMidnight = nextMidnight.getTime() - now.getTime();
      
    //     // Set a timeout to reload the component at midnight
    //     setTimeout(() => {
    //       this.reloadComponent();
      
    //       // Set an interval to reload the component every 24 hours thereafter
    //       this.reloadInterval = setInterval(() => {
    //         this.reloadComponent();
    //       }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
    //     }, timeUntilMidnight);
    //   }

    //For reloading of component within specific time interval, i.e, in this case it is executing every midnight(00:30:00)

    startAutoReload(): void {
        const now = new Date();
        const nextReload = new Date();
    
        // Set the time to 00:30:00
        nextReload.setHours(0, 30, 0, 0);
    
        // If it's already past 00:30:00, schedule it for the next day
        if (now.getTime() > nextReload.getTime()) {
            nextReload.setDate(nextReload.getDate() + 1);
        }
    
        // Calculate the time difference in milliseconds
        const timeUntilReload = nextReload.getTime() - now.getTime();
    
        // Set a timeout to reload the component at the specified time
        setTimeout(() => {
            this.reloadComponent();
    
            // Set an interval to reload the component every 24 hours thereafter
            this.reloadInterval = setInterval(() => {
                this.reloadComponent();
            }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
        }, timeUntilReload);
    }
    
      

      reloadComponent(): void {
        this.router.navigateByUrl('/resident-list', { skipLocationChange: true }).then(() => {
            this.router.navigate([this.router.url]);
          });
      }

    changeValue() {
        this.sharedStateService.tranferValu(true);
    }

    GetAlertMaster() {
        let importData: any = <any>{};
        importData.StatusType = true;
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices
            .GetAlertMaster(importData)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        //console.log(tdata);
                        tdata = tdata ? tdata : [];
                        this.lstAlertMaster = tdata;
                    } else {
                        this.lstAlertMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    GetDailyVitalAlertLog() {
        var dFrom = null;
        var dTo = null;
        if (this.rangeDates != null) {
            if (this.rangeDates[0] != null) {
                dFrom = this.datepipe.transform(this.rangeDates[0], "yyyy-MM-dd");
            }
            if (this.rangeDates[1] != null) {
                dTo = this.datepipe.transform(this.rangeDates[1], "yyyy-MM-dd");
            }
        }
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._UserServices
            .GetDailyVitalAlertLog(this.userid, dFrom, dTo, this.selectedAlertMasterId, this.selectedStatusId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : [];
                        this.AlertList = tdata;
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




    GetAllAlert() {
        let importData: any = <any>{};
        let dFrom = null;
        var dTo = null;
        this.SearchList1 = [];
        var residentAdmissionInfoId = this.admissionid
        if (this.rangeDates != null) {
            if (this.rangeDates[0] != null) {
                dFrom = this.datepipe.transform(this.rangeDates[0], "yyyy-MM-dd");
                importData.dFrom = dFrom;
            }
            if (this.rangeDates[1] != null) {
                dTo = this.datepipe.transform(this.rangeDates[1], "yyyy-MM-dd");
                importData.dTo = dTo;
            }
        }
        if (this.selectedAlertMasterId != null && this.selectedAlertMasterId != '') {
            this.SearchList1.push({ 'SearchBy': 'AlertType', 'SearchVal': this.selectedAlertMasterId });
        }
        if (this.selectedStatusId != null) {
            this.SearchList1.push({ 'SearchBy': 'Status', 'SearchVal': this.selectedStatusId.toString() });
        }
        importData.SearchList = this.SearchList1;


        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._UserServices
            .GetAllAlert(importData, residentAdmissionInfoId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : [];
                        this.AlertList = tdata;
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

    showPopup(alertId, alert) {
        this.ActionTakenData = {
            dailyVitalsAlertId: alertId,
            actionRemarks: alert.actionRemarks,
            actionBy: this.loginId,
            isActionTaken: false,
            residentAdmissionInfoId: this.admissionid,
            residentDetails: this.residentadmissiondetails,
            alertData: alert,
            alertUnit: this.alertUnit,
            alertHeadline: this.alertHeadline
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
