import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClinicalRoutingModule } from './clinical-routing.module';
import { ClinicalComponent } from './clinical.component';
import { AllergiesModule } from './allergies/allergies.module';
import { ResidentIndicatorsModule } from './resident-indicators/resident-indicators.module';
import { ClinicalInformationModule } from './clinical-information/clinical-information.module';
import { BaselineHealthInformationModule } from './baseline-health-information/baseline-health-information.module';
import { AlertPreferencesModule } from './alert-preferences/alert-preferences.module';
import { ChartPreferencesModule } from './chart-preferences/chart-preferences.module';
import { DailyVitalModule } from './daily-vital/daily-vital.module';
import { PainAssessmentModule } from './pain-assessment/pain-assessment.module';
import { AccordionModule } from 'primeng/accordion';
import { FallRiskAssessmentModule } from './fall-risk-assessment/fall-risk-assessment.module';


@NgModule({
  declarations: [
    ClinicalComponent
  ],
  imports: [
    CommonModule,
    ClinicalRoutingModule,
    FormsModule,
    AllergiesModule,
    ResidentIndicatorsModule,
    ClinicalInformationModule,
    BaselineHealthInformationModule,
    AlertPreferencesModule,
    ChartPreferencesModule,
    DailyVitalModule,
    PainAssessmentModule,
    FallRiskAssessmentModule,
    AccordionModule
  ]
})
export class ClinicalModule { }
