import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SmokingRiskAssessmentRoutingModule } from './smoking-risk-assessment-routing.module';
import { SmokingRiskAssessmentComponent } from './smoking-risk-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    SmokingRiskAssessmentComponent,
    
  ],
  imports: [
    CommonModule,
    SmokingRiskAssessmentRoutingModule,
    CheckboxModule,
    FormsModule,
    DropdownModule,
    CalendarModule,
    ButtonModule

  ],
  exports:[SmokingRiskAssessmentComponent]
})
export class SmokingRiskAssessmentModule { }
