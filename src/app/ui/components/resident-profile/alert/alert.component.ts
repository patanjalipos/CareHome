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

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private _UserServices: UserService,
        private sharedStateService: ResidentProfileService,
        private datepipe: DatePipe) {
        super();

        this.stlstStatus = [{ name: 'Active', code: 1 },
        { name: 'Inactive', code: 0 }
        ]
        this.rangeDates = [new Date(), new Date()];

        this.loginId = localStorage.getItem('userId');
    }

    ngOnInit(): void {
        this.GetAlertMaster();
        this.GetAllAlert();

    }

    dateRangeChange(calendar: Calendar) {
        this.sharedStateService.tranferValu(true);
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            calendar.overlayVisible = false;
            //this.GetDailyVitalAlertLog();
        }

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
                        var tdata = JSON.parse(data.actionResult.result);
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
                        var tdata = JSON.parse(data.actionResult.result);
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
                    console.log(residentAdmissionInfoId);
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
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
        console.log('RESIDENT DETAILS', this.ActionTakenData);
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

    GetHeadline(alertMasterId: any) {
        if (alertMasterId == AlertTypes.BloodPressureAlert) {
            this.alertHeadline = AlertHeadlines.BloodPressureHeadline;
            return AlertHeadlines.BloodPressureHeadline;
        }
        else if (alertMasterId == AlertTypes.WeightAlert) {
            this.alertHeadline = AlertHeadlines.WeightHeadline;
            return AlertHeadlines.WeightHeadline;
        }
        else if (alertMasterId == AlertTypes.BloodGlucoseAlert) {
            this.alertHeadline = AlertHeadlines.BloodGlucoseHeadline;
            return AlertHeadlines.BloodGlucoseHeadline;
        }
        else {
            this.alertHeadline = '';
            return '';
        }
    }

    counter1: number = 0;
    GetAlertUnit(alertMasterId: any): any {
        if (alertMasterId == AlertTypes.BloodPressureAlert) {
            this.alertUnit = AlertUnit.BPUnit;
            this.counter1++;
            return AlertUnit.BPUnit;
        }
        else if (alertMasterId == AlertTypes.WeightAlert) {
            this.alertUnit = AlertUnit.WeightUnit;
            this.counter1++;
            return AlertUnit.WeightUnit;
        }
        else if (alertMasterId == AlertTypes.BloodGlucoseAlert) {
            this.alertUnit = AlertUnit.BGUnit;
            this.counter1++;
            return AlertUnit.BGUnit;
        }
        else if (alertMasterId == AlertTypes.NEWS2Alert) {
            if (this.AlertList[this.counter1].isOxygenNewsAlert == true) {
                this.alertUnit = AlertUnit.OxygenUnit;
                this.counter1++;
                return AlertUnit.OxygenUnit;

            } if (this.AlertList[this.counter1].isPulseNewsAlert == true) {
                this.alertUnit = AlertUnit.PulseUnit;
                this.counter1++;
                return AlertUnit.PulseUnit;
            }

        }
        else {
            this.alertUnit = '';
            this.counter1++;
            return '';
        }
    }

}
