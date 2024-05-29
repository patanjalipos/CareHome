import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { AppComponentBase } from 'src/app/app-component-base';
import { AppComponent } from 'src/app/app.component';
import {
  ChartTypes,
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent extends AppComponentBase implements OnInit {
    @Input() mode: string = 'view';
    @Input() userid: any = null;
    @Input() admissionid: any = null;
    @Input() residentadmissiondetails: any = <any>{};
    customDateFormat = CustomDateFormat;

    public lstMaster: any[] = [];
    public chartDashboardList: any[] = [];

    selectedChartMasterId: string;
    selectedChartData: any;
    selectedChartId: string;

    residentAdmissionInfoId: string;
    rangeDates: Date[] | undefined;
    ChartTypes = ChartTypes;
    ShowChildComponent: boolean = false;

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private route: ActivatedRoute,
        private datepipe: DatePipe
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Chart';

        this.unsubscribe.add = this.route.queryParams.subscribe((params) => {
            var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);

            if (ParamsArray?.length > 0) {
                //console.log('ParamsArray',ParamsArray);
                this.residentAdmissionInfoId =
                    ParamsArray.find((e) => e.FieldStr == 'admissionid')
                        ?.FieldVal || null;
            }
        });
    }

    ngOnInit(): void {
        this.GetChartMaster();
    }

    SearchChart() {
        this.ShowChildComponent = false;
        this._UtilityService.showSpinner();
        const residentAdmissionInfoId = this.residentAdmissionInfoId;
        const formMasterId = this.selectedChartMasterId;

        //Date conversions
        var dFrom = null;
        var dTo = null;
        if (this.rangeDates != null) {
            if (this.rangeDates[0] != null) {
                dFrom = this.datepipe.transform(
                    this.rangeDates[0],
                    'yyyy-MM-dd'
                );
            }
            if (this.rangeDates[1] != null) {
                dTo = this.datepipe.transform(this.rangeDates[1], 'yyyy-MM-dd');
            }
        }

    }

    dateRangeChange(calendar: Calendar) {
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            calendar.overlayVisible = false;
            //this.GetDailyVitalAlertLog();
        }
    }

    OpenChart(
        selectedChartMasterId: string,
        selectedChartdata: any = <any>{},
        isEditable = true
    ) {
        this.selectedChartMasterId = selectedChartMasterId;
        this.selectedChartData = {
            formMasterId: selectedChartMasterId,
            selectedFormID: selectedChartdata.FormId,
            isEditable: isEditable,
            IsCompleted: selectedChartdata.IsCompleted,
            StartedBy: selectedChartdata.StartedBy,
            StartedByDesignation: selectedChartdata.StartedByDesignation,
            StartedOn: selectedChartdata.StartedOn,
            ModifiedBy: selectedChartdata.ModifiedBy,
            ModifiedByDesignation: selectedChartdata.ModifiedByDesignation,
            ModifiedOn: selectedChartdata.ModifiedOn,
        };
        this.ShowModel();
    }

    ShowModel() {
      this.ShowChildComponent = true;
  }

    GetChartMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices
            .GetChartMaster(true)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : [];
                        this.lstMaster = tdata;
                    } else {
                        this.lstMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    ResetModel() {
      this.chartDashboardList = null;
      this.rangeDates = undefined;
      this.selectedChartMasterId = null;
      this.selectedChartId = null;
      this.selectedChartData = null;
  }
  EmitUpdateForm(event) {
      this.SearchChart();
  }
}
