import {
    Component,
    ComponentRef,
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

@Component({
    selector: 'app-forms-dashboard',
    templateUrl: './forms-dashboard.component.html',
    styleUrls: ['./forms-dashboard.component.scss'],
})
export class FormsDashboardComponent
    extends AppComponentBase
    implements OnInit
{
    @ViewChild('formContainer', { read: ViewContainerRef })
    formContainer: ViewContainerRef;
    componentRef: ComponentRef<any>;
    customDateFormat = CustomDateFormat;

    public lstMaster: any[] = [];
    public formDashboardList: any[] = [];

    selectedFormMasterId: string;
    selectedFormData: any;
    selectedFormId: string;

    residentAdmissionInfoId: string;
    rangeDates: Date[] | undefined;
    FormTypes = FormTypes;
    ShowChildComponent: boolean = false;

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private route: ActivatedRoute
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Form Dashboard';

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
    x;
    ngOnInit() {
        this.GetformMaster();
    }

    GetformMaster() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices
            .GetFormMaster(true)
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
        //console.log('date Ranges: ' + rangeDates);
        const residentAdmissionInfoId = this.residentAdmissionInfoId;
        const formMasterId = this.selectedFormMasterId;

        let fromDate: Date | null = null;
        let toDate: Date | null = null;

        if (this.rangeDates && this.rangeDates.length >= 2) {
            fromDate = this.rangeDates[0];
            toDate = this.rangeDates[1];
        }

        // Call the API
        this._MasterServices
            .GetFormDasboardList(
                residentAdmissionInfoId,
                formMasterId,
                fromDate,
                toDate
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
        this.selectedFormMasterId = selectedFormMasterId;
        this.selectedFormData = {
            formMasterId: selectedFormMasterId,
            selectedFormID: selectedFormdata.FormId,
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
