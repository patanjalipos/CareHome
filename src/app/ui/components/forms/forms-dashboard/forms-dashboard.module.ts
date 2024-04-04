import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsDashboardRoutingModule } from './forms-dashboard-routing.module';
import { FormsDashboardComponent } from './forms-dashboard.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {MultiSelectModule} from 'primeng/multiselect';
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { CalendarModule } from "primeng/calendar";
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PreAdmissionAssessmentFormsModule } from '../pre-admission-assessment-forms/pre-admission-assessment-forms.module';
import { AccidentIncidentNearMissRecordModule } from '../accident-incident-near-miss-record/accident-incident-near-miss-record.module';
import { AcuteCarePlanInfectionPreventionAndControlModule } from '../acute-care-plan-infection-prevention-and-control/acute-care-plan-infection-prevention-and-control.module';
import { BodyMappingRecordModule } from '../body-mapping-record/body-mapping-record.module';
import { CareBreathingAndCirculationAssessmentModule } from '../care-breathing-and-circulation-assessment/care-breathing-and-circulation-assessment.module';
import { CareContinencePromotionModule } from '../care-continence-promotion/care-continence-promotion.module';
import { CareEatsAndTreatsModule } from '../care-eats-and-treats/care-eats-and-treats.module';
import { CarePersonalEmergencyEvacuationPlanModule } from '../care-personal-emergency-evacuation-plan/care-personal-emergency-evacuation-plan.module';
import { ConnectingAndCommunicatingModule } from '../connecting-and-communicating/connecting-and-communicating.module';
import { FamilyCommunicationModule } from '../family-communication/family-communication.module';
import { GpDoctorVisitCommunicationRecordModule } from '../gp-doctor-visit-communication-record/gp-doctor-visit-communication-record.module';
import { ProfessionalVisitCommunicationRecordModule } from '../professional-visit-communication-record/professional-visit-communication-record.module';
import { RiskPhysicalDependencyAssessmentModule } from '../risk-physical-dependency-assessment/risk-physical-dependency-assessment.module';
import { RiskWaterlowPressureUlcerModule } from '../risk-waterlow-pressure-ulcer/risk-waterlow-pressure-ulcer.module';
import { CareFeelingFreshAndCleanComponent } from '../care-feeling-fresh-and-clean/care-feeling-fresh-and-clean.component';
import { CareFeelingFreshAndCleanModule } from '../care-feeling-fresh-and-clean/care-feeling-fresh-and-clean.module';



@NgModule({
  declarations: [
    FormsDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsDashboardRoutingModule,
    ToolbarModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    PreAdmissionAssessmentFormsModule,
    AccidentIncidentNearMissRecordModule,
    AcuteCarePlanInfectionPreventionAndControlModule,
    BodyMappingRecordModule,
    CareBreathingAndCirculationAssessmentModule,
    CareContinencePromotionModule,
    CareEatsAndTreatsModule,
    CarePersonalEmergencyEvacuationPlanModule,
    ConnectingAndCommunicatingModule,
    FamilyCommunicationModule,
    GpDoctorVisitCommunicationRecordModule,
    ProfessionalVisitCommunicationRecordModule,
    RiskPhysicalDependencyAssessmentModule,
    RiskWaterlowPressureUlcerModule,
    CareFeelingFreshAndCleanModule
   
 


  ],

  exports:[
    FormsDashboardComponent,
  ]
})

export class FormsDashboardModule { }