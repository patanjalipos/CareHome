import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareBreathingAndCirculationAssessmentRoutingModule } from './care-breathing-and-circulation-assessment-routing.module';
import { CareBreathingAndCirculationAssessmentComponent } from './care-breathing-and-circulation-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    CareBreathingAndCirculationAssessmentComponent
  ],
  imports: [
    CommonModule,
    CareBreathingAndCirculationAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule,

  ]
})
export class CareBreathingAndCirculationAssessmentModule { }
