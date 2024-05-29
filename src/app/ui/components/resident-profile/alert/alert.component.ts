import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { Calendar } from 'primeng/calendar';

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

    customDateFormat = CustomDateFormat;
    selectedAlertMasterId: string = '';
    selectedStatusId: number = null;
    public lstAlertMaster: any[] = [];
    public stlstStatus: any[] = [];
    public AlertList: any[] = [];
    rangeDates: Date[] = [];
    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private datepipe: DatePipe) {
        super();

        this.stlstStatus = [{ name: 'Active', code: 1 },
        { name: 'Inactive', code: 0 }
        ]
        this.rangeDates=[new Date(), new Date()];
    }

    ngOnInit(): void {
        this.GetAlertMaster();
        this.GetDailyVitalAlertLog();
    }

    dateRangeChange(calendar: Calendar) {
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            calendar.overlayVisible = false;
            //this.GetDailyVitalAlertLog();
        }

    }

    GetAlertMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices
            .GetAlertMaster(true)
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
        this.unsubscribe.add = this._MasterServices
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
}
