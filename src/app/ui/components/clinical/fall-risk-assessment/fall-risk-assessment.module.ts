import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FallRiskAssessmentRoutingModule } from './fall-risk-assessment-routing.module';
import { FallRiskAssessmentComponent } from './fall-risk-assessment.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [FallRiskAssessmentComponent],
  imports: [
    CommonModule,
    FormsModule,
    FallRiskAssessmentRoutingModule,
    TableModule,
    ButtonModule,
    RadioButtonModule,
    AccordionModule,
  ],
  exports:[FallRiskAssessmentComponent]
})
export class FallRiskAssessmentModule { }
