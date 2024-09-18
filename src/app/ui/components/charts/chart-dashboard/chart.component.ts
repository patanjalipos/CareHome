import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild, ElementRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ChartTypes,
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { ResidentProfileService } from '../../resident-profile/resident-profile.service';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent extends AppComponentBase implements OnInit {
    @ViewChild('Charts', { static: false }) childref: ElementRef;
    @Input() mode: string = 'view';
    @Input() userId: any = null;
    @Input() residentAdmissionInfoId: any = null;
    @Input() homeMasterId: any = null;
    @Input() isViewcharts: boolean;
    @Input() lstResidents: any[];
    @Output() EmitUpdateChart: EventEmitter<any> = new EventEmitter<any>();
    customDateFormat = CustomDateFormat;

    public lstMaster: any[] = [];
    public chartDashboardList: any[] = [];

    selectedChartMasterId: string;
    selectedChartData: any;
    selectedChartId: string;

    rangeDates: Date[] | undefined;
    ChartTypes = ChartTypes;
    ShowChildComponent: boolean = false;

    selectedOption: string;
    selectedResidentUserId: any;
    filteritems: any[] = [];

    alertCount: number = 0;
   
    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private route: ActivatedRoute,
        private datepipe: DatePipe,
        private _UserServices: UserService,
        private sharedStateService: ResidentProfileService
    ) {
        super();
       // this._ConstantServices.ActiveMenuName = 'Chart Dashboard';
    }

    ngOnInit(): void {
        if(!this.isViewcharts)
            {
              this._ConstantServices.ActiveMenuName = "Chart Dashboard";
            }
        this.ResetModel();
        this.GetChartMaster();
        this.ResetModel();
    }

    SearchChart() {
        //this.sharedStateService.setValue(true);
        this.sharedStateService.tranferValu(true);
        this.ShowChildComponent = false;
        this._UtilityService.showSpinner();
        const residentAdmissionInfoId = this.residentAdmissionInfoId;
        const chartMasterId = this.selectedChartMasterId;

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
        // this._UtilityService.hideSpinner();

        //Call the API
        this._UserServices
            .GetChartDashboardList(
                residentAdmissionInfoId,
                chartMasterId,
                dFrom,
                dTo
            )
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : [];
                        this.chartDashboardList = tdata;
                    } else {
                        this.chartDashboardList = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    dateRangeChange(calendar: Calendar) {
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            calendar.overlayVisible = false;
            this.SearchChart();
        }
    }

    OpenChart(
        selectedChartMasterId: string,
        selectedChartId: string = null,
        StartedOn: any,
        selectedChartdata: any = <any>{},
        isEditable = true
    ) {
        if (selectedChartMasterId != null) {
            this.ShowChildComponent = false;
            this.selectedChartMasterId = selectedChartMasterId;
            this.selectedChartData = {
                chartMasterId: selectedChartMasterId,
                chartId: selectedChartId,
                selectedStartedOn: StartedOn,
                selectedChartID: selectedChartdata.ChartId,
                userId: this.userId,
                residentAdmissionInfoId: this.residentAdmissionInfoId,
                homeMasterId: this.homeMasterId,
                isEditable: isEditable,
                StartedBy: selectedChartdata.StartedBy,
                StartedByDesignation: selectedChartdata.StartedByDesignation,
                StartedOn: selectedChartdata.StartedOn,
                ModifiedBy: selectedChartdata.ModifiedBy,
                ModifiedByDesignation: selectedChartdata.ModifiedByDesignation,
                ModifiedOn: selectedChartdata.ModifiedOn,
            };
            this.ShowModel();
            setTimeout(() => {
                this.childref.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }, 200);
        }
        else if (this.isViewcharts && !this.selectedResidentUserId) {
            this._UtilityService.showErrorAlert('Select Resident');
        }          
        else this._UtilityService.showErrorAlert('Select Chart Type');
    }

    ShowModel() {
        this.ShowChildComponent = true;
    }

    GetChartMaster() {
        let importData: any = <any>{};
        importData.StatusType = true;
        this._UtilityService.showSpinner();
        
        this.unsubscribe.add = this._UserServices.GetClinicalChartPreferencesById(this.residentAdmissionInfoId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : [];
                        this.lstMaster = tdata;
                        this.lstMaster = this.lstMaster.filter(e => e.Isenable == true);
                        
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
        if(this.isViewcharts==true)
        {
            this.selectedResidentUserId = '';
            this.lstMaster=null;
        }
    }
    EmitUpdateForm(event) {
        this.SearchChart();
    }

    EmitUpdateAlert(event) {
        this.alertCount = event;
        this.EmitUpdateChart.emit(this.alertCount);
    }

      onResidentChange(event: any) {
        this.selectedResidentUserId = event.value;
    
        this.filteritems = this.lstResidents.filter(
          (x) => x.UserId === this.selectedResidentUserId
        );
    
        setTimeout(() => {
            if (this.filteritems.length > 0) {
                this.residentAdmissionInfoId = this.filteritems[0].ResidentAdmissionInfoId;
                this.userId = this.filteritems[0].UserId;
                this.chartDashboardList=[];     
                this.selectedChartMasterId = null; 
                this.GetChartMaster();                          
              }
            }, 0);
          }
}
