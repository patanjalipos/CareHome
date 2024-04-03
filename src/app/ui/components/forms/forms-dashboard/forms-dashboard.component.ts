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
import { BodyMappingRecordComponent } from '../body-mapping-record/body-mapping-record.component';
import { CareBreathingAndCirculationAssessmentComponent } from '../care-breathing-and-circulation-assessment/care-breathing-and-circulation-assessment.component';
import { CareContinencePromotionModule } from '../care-continence-promotion/care-continence-promotion.module';
import { CareEatsAndTreatsComponent } from '../care-eats-and-treats/care-eats-and-treats.component';
import { CareFeelingFreshAndCleanComponent } from '../care-feeling-fresh-and-clean/care-feeling-fresh-and-clean.component';
import { CareContinencePromotionComponent } from '../care-continence-promotion/care-continence-promotion.component';
import { CarePersonalEmergencyEvacuationPlanComponent } from '../care-personal-emergency-evacuation-plan/care-personal-emergency-evacuation-plan.component';
import { ConnectingAndCommunicatingComponent } from '../connecting-and-communicating/connecting-and-communicating.component';
import { FamilyCommunicationComponent } from '../family-communication/family-communication.component';
import { GpDoctorVisitCommunicationRecordComponent } from '../gp-doctor-visit-communication-record/gp-doctor-visit-communication-record.component';
import { ProfessionalVisitCommunicationRecordComponent } from '../professional-visit-communication-record/professional-visit-communication-record.component';
import { RiskPhysicalDependencyAssessmentComponent } from '../risk-physical-dependency-assessment/risk-physical-dependency-assessment.component';
import { RiskWaterlowPressureUlcerComponent } from '../risk-waterlow-pressure-ulcer/risk-waterlow-pressure-ulcer.component';

@Component({
    selector: 'app-forms-dashboard',
    templateUrl: './forms-dashboard.component.html',
    styleUrls: ['./forms-dashboard.component.scss'],
})
export class FormsDashboardComponent
    extends AppComponentBase
    implements OnInit {
    //@Output() dataEvent = new EventEmitter<any>();

    @ViewChild('formContainer', { read: ViewContainerRef })
    formContainer: ViewContainerRef;
    componentRef: ComponentRef<any>;
    customDateFormat = CustomDateFormat;

    public lstMaster: any[] = [];
    public formDashboardList: any[] = [];

    residentAdmissionInfoId: string;
    rangeDates: Date[] | undefined;
    selectedFormType: string;

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

    searchForm(selectedFormId: string, rangeDates: Date[]) {
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
    openForm(formMasterId: string, formId: string) {

        //console.log('Form master id :' + formMasterId);
        //console.log('Form id :' + formId);
        //this.dataEvent.emit(formId);

        this._DataService.sendData(formId);
        this.showForm(formMasterId)
    }

    //Create new Form
    showForm(selectedFormId: string) {
        // Clear existing component if any
        if (this.componentRef) {
            this.componentRef.destroy();
        }

        console.log(selectedFormId);
        // Determine which component to load based on selectedForm
        let componentType: any;
        switch (selectedFormId) {
            case FormTypes.PreAdmission:
                componentType = PreAdmissionAssessmentFormsComponent;
                break;
            case FormTypes.AccidentIncident:
                componentType = AccidentIncidentNearMissRecordComponent;
                break;
            case FormTypes.AcuteCarePlan:
                componentType = AcuteCarePlanInfectionPreventionAndControlComponent;
                break;
            case FormTypes.BodyMappingRecord:
                componentType = BodyMappingRecordComponent;
                break;
            case FormTypes.CareAssessmentBreathing:
                componentType = CareBreathingAndCirculationAssessmentComponent;
                break;
            case FormTypes.CareAssessmentContinence:
                componentType = CareContinencePromotionComponent;
                break;
            case FormTypes.CareAssessmentEats:
                componentType = CareEatsAndTreatsComponent;
                break;
            case FormTypes.CareAssessmentFeeling:
                componentType = CareFeelingFreshAndCleanComponent;
                break;
            case FormTypes.CareAssessmentPersonal:
                componentType = CarePersonalEmergencyEvacuationPlanComponent;
                break;
            case FormTypes.ConnectingandCommunicating:
                componentType = ConnectingAndCommunicatingComponent;
                break;
            case FormTypes.FamilyCommunication:
                componentType = FamilyCommunicationComponent;
                break;
            case FormTypes.GPDoctorVisitCommunicationRecord:
                componentType = GpDoctorVisitCommunicationRecordComponent;
                break;
            case FormTypes.ProfessionalVisitCommunicationRecord:
                componentType = ProfessionalVisitCommunicationRecordComponent;
                break;
            case FormTypes.RiskAssessmentPhysical:
                componentType = RiskPhysicalDependencyAssessmentComponent;
                break;
            case FormTypes.RiskAssessmentWaterlow:
                componentType = RiskWaterlowPressureUlcerComponent;
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
        this.selectedFormType = null;
    }
}
