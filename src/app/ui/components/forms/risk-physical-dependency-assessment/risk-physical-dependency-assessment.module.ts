import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskPhysicalDependencyAssessmentRoutingModule } from './risk-physical-dependency-assessment-routing.module';
import { RiskPhysicalDependencyAssessmentComponent } from './risk-physical-dependency-assessment.component';


@NgModule({
  declarations: [
    RiskPhysicalDependencyAssessmentComponent
  ],
  imports: [
    CommonModule,
    RiskPhysicalDependencyAssessmentRoutingModule
  ]
})
export class RiskPhysicalDependencyAssessmentModule { }
