import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FallRiskAssessmentReportRoutingModule } from './fall-risk-assessment-report-routing.module';

import { TableModule } from 'primeng/table';
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from 'primeng/button';
import { FallRiskAssessmentReportComponent } from './fall-risk-assessment-report.component';

@NgModule({
  declarations: [FallRiskAssessmentReportComponent],
  imports: [
    CommonModule,
    FormsModule,
    FallRiskAssessmentReportRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class FallRiskAssessmentReportModule { }
