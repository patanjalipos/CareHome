import {
    Component,
    ComponentRef,
    Input,
    OnInit,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {
    ConstantsService,
    CustomDateFormat,
    FormTypes,
} from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
    selector: 'app-forms-dashboard',
    templateUrl: './forms-dashboard.component.html',
    styleUrls: ['./forms-dashboard.component.scss'],
})
export class FormsDashboardComponent
    extends AppComponentBase
    implements OnInit
{
    @Input() residentAdmissionInfoId: string = null;
    @Input() userId: any = null;

    @ViewChild('formContainer', { read: ViewContainerRef })
    formContainer: ViewContainerRef;
    componentRef: ComponentRef<any>;
    customDateFormat = CustomDateFormat;

    public lstMaster: any[] = [];
    public formDashboardList: any[] = [];

    selectedFormMasterId: string;
    selectedFormData: any;
    selectedFormId: string;

    rangeDates: Date[] | undefined;
    FormTypes = FormTypes;
    ShowChildComponent: boolean = false;

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,  
        private _UserServices: UserService,
        private _UtilityService: UtilityService,
        private route: ActivatedRoute,
        private datepipe: DatePipe
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Form Dashboard';
    }

    ngOnInit() {
        this.GetformMaster();
    }

    dateRangeChange(calendar: Calendar) {
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            calendar.overlayVisible = false;
        }
    }

    GetformMaster() {
        let importData: any = <any>{};   
        importData.StatusType=true;
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices.GetFormMaster(importData)
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

    SearchForm() {
        this.ShowChildComponent = false;
        this._UtilityService.showSpinner();
        const residentAdmissionInfoId = this.residentAdmissionInfoId;
        const formMasterId = this.selectedFormMasterId;

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

        // Call the API
        this._UserServices
            .GetFormDasboardList(
                residentAdmissionInfoId,
                formMasterId,
                dFrom,
                dTo
            )
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : [];
                        this.formDashboardList = tdata;
                        
                    } else {
                        this.formDashboardList = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    //View/Edit Form
    OpenForm(        
        selectedFormMasterId: string,
        selectedFormdata: any = <any>{},
        isEditable = true
    ) {
        if (selectedFormMasterId != null) {
            this.selectedFormMasterId = selectedFormMasterId;
            this.selectedFormData = {
                formMasterId: selectedFormMasterId,
                selectedFormID: selectedFormdata.FormId,
                residentAdmissionInfoId: this.residentAdmissionInfoId,
                userId: this.userId,
                isEditable: isEditable,
                IsCompleted: selectedFormdata.IsCompleted,
                StartedBy: selectedFormdata.StartedBy,
                StartedByDesignation: selectedFormdata.StartedByDesignation,
                StartedOn: selectedFormdata.StartedOn,
                ModifiedBy: selectedFormdata.ModifiedBy,
                ModifiedByDesignation: selectedFormdata.ModifiedByDesignation,
                ModifiedOn: selectedFormdata.ModifiedOn,
            };
            this.ShowModel();
        } 
        else{
            this._UtilityService.showErrorAlert('Kindly select an Assessment Form');
        }
    }

    ShowModel() {
        this.ShowChildComponent = true;
    }

    ResetModel() {
        this.formDashboardList = null;
        this.rangeDates = undefined;
        this.selectedFormMasterId = null;
        this.selectedFormId = null;
        this.selectedFormData = null;
        this.componentRef.destroy();
    }
    EmitUpdateForm(event) {
        this.SearchForm();
    }
}
