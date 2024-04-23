import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutingsRiskAssessmentRoutingModule } from './outings-risk-assessment-routing.module';
import { OutingsRiskAssessmentComponent } from './outings-risk-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    OutingsRiskAssessmentComponent
  ],
  imports: [
    CommonModule,
    OutingsRiskAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

  ],
  exports:[OutingsRiskAssessmentComponent]
})
export class OutingsRiskAssessmentModule { }
