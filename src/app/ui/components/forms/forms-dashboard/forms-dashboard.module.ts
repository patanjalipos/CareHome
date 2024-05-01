import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsDashboardRoutingModule } from './forms-dashboard-routing.module';
import { FormsDashboardComponent } from './forms-dashboard.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
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
import { RecordOfPropertyModule } from '../record-of-property/record-of-property.module';
import { RespiratoryScreeningQuestionsModule } from '../respiratory-screening-questions/respiratory-screening-questions.module';
import { PositiveBehaviourSupportModule } from '../positive-behaviour-support/positive-behaviour-support.module';
import { CareAssessmentDietaryNotificationModule } from '../care-assessment-dietary-notification/care-assessment-dietary-notification.module';
import { CareAssessmentLifeHistoryModule } from '../care-assessment-life-history/care-assessment-life-history.module';
import { CareAssessmentMyEpilepsyModule } from '../care-assessment-my-epilepsy/care-assessment-my-epilepsy.module';
import { CareAssessmentRespectModule } from '../care-assessment-respect/care-assessment-respect.module';
import { ThePoolActivityLevelModule } from '../the-pool-activity-level/the-pool-activity-level.module';
import { CareAssessmentTrialWithOutCatheteComponent } from '../care-assessment-trial-with-out-cathete/care-assessment-trial-with-out-cathete.component';
import { CareAssessmentTrialWithOutCatheteModule } from '../care-assessment-trial-with-out-cathete/care-assessment-trial-with-out-cathete.module';
import { CarePlanReviewModule } from '../care-plan-review/care-plan-review.module';
import { CareSignsOfIllBeingComponent } from '../care-signs-of-ill-being/care-signs-of-ill-being.component';
import { CareSignsOfIllBeingModule } from '../care-signs-of-ill-being/care-signs-of-ill-being.module';
import { HazardsRisksModule } from '../hazards-risks/hazards-risks.module';
import { HerbertProtocolMissingPersonModule } from '../herbert-protocol-missing-person/herbert-protocol-missing-person.module';
import { IncidentNearMissRecordModule } from '../incident-near-miss-record/incident-near-miss-record.module';
import { MedicationIncidentModule } from '../medication-incident/medication-incident.module';
import { OutingsRiskAssessmentModule } from '../outings-risk-assessment/outings-risk-assessment.module';
import { RecordOfDecisionModule } from '../record-of-decision/record-of-decision.module';
import { RiskToolSafeWorkingModule } from '../risk-tool-safe-working/risk-tool-safe-working.module';
import { SmokingRiskAssessmentModule } from '../smoking-risk-assessment/smoking-risk-assessment.module';
import { CareBehaviourAssessmentComponent } from '../care-behaviour-assessment/care-behaviour-assessment.component';
import { CareBehaviourAssessmentModule } from '../care-behaviour-assessment/care-behaviour-assessment.module';
import { CareOralAndDentalModule } from '../care-oral-and-dental/care-oral-and-dental.module';
import { CareResidentContactsListModule } from '../care-resident-contacts-list/care-resident-contacts-list.module';
import { CareSkinAssessmentModule } from '../care-skin-assessment/care-skin-assessment.module';
import { CareVisionAssessmentModule } from '../care-vision-assessment/care-vision-assessment.module';
import { CareWishesForFutureModule } from '../care-wishes-for-future/care-wishes-for-future.module';
import { ConsentFormModule } from '../consent-form/consent-form.module';
import { CovidVaccinationRecordModule } from '../covid-vaccination-record/covid-vaccination-record.module';
import { RespiteCareSupportPlanModule } from '../respite-care-support-plan/respite-care-support-plan.module';
import { RiskMultifactorialFallsRiskModule } from '../risk-multifactorial-falls-risk/risk-multifactorial-falls-risk.module';
import { RiskToolForUseOfWheelchairModule } from '../risk-tool-for-use-of-wheelchair/risk-tool-for-use-of-wheelchair.module';
import { RiskPhysicalDependencyAssessmentRoutingModule } from '../risk-physical-dependency-assessment/risk-physical-dependency-assessment-routing.module';



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
    SepsisScreeningToolModule,
    RecordOfPropertyModule,
    RespiratoryScreeningQuestionsModule,
    PositiveBehaviourSupportModule,
    CareAssessmentDietaryNotificationModule,
    CareAssessmentLifeHistoryModule,
    CareAssessmentMyEpilepsyModule,
    CareAssessmentRespectModule,
    PositiveBehaviourSupportModule,
    RespiratoryScreeningQuestionsModule,
    ThePoolActivityLevelModule,
    CareAssessmentTrialWithOutCatheteModule,
    CarePlanReviewModule,
    CareSignsOfIllBeingModule,
    HazardsRisksModule,
    HerbertProtocolMissingPersonModule,
    IncidentNearMissRecordModule,
    MedicationIncidentModule,
    OutingsRiskAssessmentModule,
    RecordOfDecisionModule,
    RiskToolSafeWorkingModule,
    SmokingRiskAssessmentModule,
    CareBehaviourAssessmentModule,
    CareOralAndDentalModule,
    CareResidentContactsListModule,
    CareSkinAssessmentModule,
    CareVisionAssessmentModule,
    CareWishesForFutureModule,
    ConsentFormModule,
    CovidVaccinationRecordModule,RespiteCareSupportPlanModule,
    RiskMultifactorialFallsRiskModule,
    RiskToolForUseOfWheelchairModule,
    RiskPhysicalDependencyAssessmentRoutingModule,
  ],
  exports:[
    FormsDashboardComponent,
  ]
})

export class FormsDashboardModule { }