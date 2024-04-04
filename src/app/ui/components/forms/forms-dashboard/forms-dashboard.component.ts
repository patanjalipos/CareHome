import {
    Component,
    ComponentRef,
    EventEmitter,
    OnInit,
    Output,
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
import { PreAdmissionAssessmentFormsComponent } from '../pre-admission-assessment-forms/pre-admission-assessment-forms.component';
import { NotfoundComponent } from '../../notfound/notfound.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/ui/service/data-service.service';
import { AccidentIncidentNearMissRecordComponent } from '../accident-incident-near-miss-record/accident-incident-near-miss-record.component';
import { AcuteCarePlanInfectionPreventionAndControlComponent } from '../acute-care-plan-infection-prevention-and-control/acute-care-plan-infection-prevention-and-control.component';

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

    selectedFormMasterId : string;
    selectedFormData : any;
    selectedFormId: string;

    residentAdmissionInfoId: string;
    rangeDates: Date[] | undefined;

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private _DataService: DataService,
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
x
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
                        //console.log(tdata);
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

    SearchForm(selectedFormId: string, rangeDates: Date[]) {
        this._UtilityService.showSpinner();
        //console.log('date Ranges: ' + rangeDates);
        const residentAdmissionInfoId = this.residentAdmissionInfoId;
        const formMasterId = selectedFormId;

        let fromDate: Date | null = null;
        let toDate: Date | null = null;

        if (rangeDates && rangeDates.length >= 2) {
            fromDate = rangeDates[0];
            toDate = rangeDates[1];
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
                        //console.log(this.formDashboardList);
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
    OpenForm(selectedFormMasterId: string, selectedFormId: string =null, isEditable: boolean = true) {
        this.selectedFormId = selectedFormId;
        this.selectedFormMasterId = selectedFormMasterId;

        this.selectedFormData = {
            selectedFormID: this.selectedFormId,
            isEditable: isEditable,
          };

        this._DataService.sendData(this.selectedFormData);
        this.ShowForm(this.selectedFormMasterId)
    }

    //Create new Form
    ShowForm(selectedFormMasterId: string) {
        // Clear existing component if any
        if (this.componentRef) {
            this.componentRef.destroy();
        }
        // Determine which component to load based on selectedForm
        let componentType: any;
        switch (selectedFormMasterId) {
            case FormTypes.PreAdmission:
                componentType = PreAdmissionAssessmentFormsComponent;
                break;
            case FormTypes.AccidentIncident:
                componentType = AccidentIncidentNearMissRecordComponent;
                break;
            case FormTypes.AcuteCarePlan:
                componentType = AcuteCarePlanInfectionPreventionAndControlComponent;
                break;
            default:
                componentType = NotfoundComponent;
        }

        // Load the component dynamically
        this.componentRef = this.formContainer.createComponent(componentType);
    }

    //Clear Search
    ResetModel() {
        this.formDashboardList = <any>{};
        this.rangeDates = undefined;
        this.selectedFormMasterId = null;
        this.selectedFormId = null;
        this.selectedFormData = null;
        this.componentRef.destroy();
    }
}
