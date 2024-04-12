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
import { CheckboxModule } from 'primeng/checkbox';
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
import { CareHearingAssessmentModule } from '../care-hearing-assessment/care-hearing-assessment.module';
import { CareMentalHealthComponent } from '../care-mental-health/care-mental-health.component';
import { CareMentalHealthModule } from '../care-mental-health/care-mental-health.module';
import { CareSleepAndRestingAssessmentComponent } from '../care-sleep-and-resting-assessment/care-sleep-and-resting-assessment.component';
import { CareSleepAndRestingAssessmentModule } from '../care-sleep-and-resting-assessment/care-sleep-and-resting-assessment.module';
import { DeliriumRiskAndRiskReductionModule } from '../delirium-risk-and-risk-reduction/delirium-risk-and-risk-reduction.module';
import { RiskOnTheMoveModule } from '../risk-on-the-move/risk-on-the-move.module';
import { OralHealthRiskAndOralPlanModule } from '../oral-health-risk-and-oral-plan/oral-health-risk-and-oral-plan.module';
import { CareVitaminDSupplementationModule } from '../care-vitamin-d-supplementation/care-vitamin-d-supplementation.module';
import { MustStep5NutritionalManagementModule } from '../must-step5-nutritional-management/must-step5-nutritional-management.module';
import { CareSpeechLanguageSsessmentModule } from '../care-speech-language-ssessment/care-speech-language-ssessment.module';
import { CovidAcuteCarePlanModule } from '../covid-acute-care-plan/covid-acute-care-plan.module';
import { DentistVisitCommunicationModule } from '../dentist-visit-communication/dentist-visit-communication.module';
import { DistrictNurseVisitCommunicationModule } from '../district-nurse-visit-communication/district-nurse-visit-communication.module';
import { FASTStrokeAssessmentModule } from '../f-a-s-t-stroke-assessment/f-a-s-t-stroke-assessment.module';
import { HealthcareSupportToolModule } from '../healthcare-support-tool/healthcare-support-tool.module';
import { HomeManagersSettlingModule } from '../home-managers-settling/home-managers-settling.module';
import { PromotingWellbeingAtHomeModule } from '../promoting-wellbeing-at-home/promoting-wellbeing-at-home.module';
import { RiskToolBedRailsPackModule } from '../risk-tool-bed-rails-pack/risk-tool-bed-rails-pack.module';
import { SepsisScreeningToolModule } from '../sepsis-screening-tool/sepsis-screening-tool.module';



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
    CheckboxModule,
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
    CareFeelingFreshAndCleanModule,
    CareHearingAssessmentModule,
    CareMentalHealthModule,
    CareSleepAndRestingAssessmentModule,
    DeliriumRiskAndRiskReductionModule,
    RiskOnTheMoveModule,
    OralHealthRiskAndOralPlanModule,
    CareVitaminDSupplementationModule,
    MustStep5NutritionalManagementModule,
    CareSpeechLanguageSsessmentModule,
    CovidAcuteCarePlanModule,
    DentistVisitCommunicationModule,
    DistrictNurseVisitCommunicationModule,
    FASTStrokeAssessmentModule,
    HealthcareSupportToolModule,
    HomeManagersSettlingModule,
    PromotingWellbeingAtHomeModule,
    RiskToolBedRailsPackModule,
    SepsisScreeningToolModule

   
 


  ],

  exports:[
    FormsDashboardComponent,
  ]
})

export class FormsDashboardModule { }