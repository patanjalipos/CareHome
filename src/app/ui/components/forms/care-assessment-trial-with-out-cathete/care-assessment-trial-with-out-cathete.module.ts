import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareAssessmentTrialWithOutCatheteRoutingModule } from './care-assessment-trial-with-out-cathete-routing.module';
import { CareAssessmentTrialWithOutCatheteComponent } from './care-assessment-trial-with-out-cathete.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CareAssessmentTrialWithOutCatheteComponent
  ],
  imports: [
    CommonModule,
    CareAssessmentTrialWithOutCatheteRoutingModule,
    CheckboxModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule
  ],
  exports: [CareAssessmentTrialWithOutCatheteComponent]
})
export class CareAssessmentTrialWithOutCatheteModule { }
