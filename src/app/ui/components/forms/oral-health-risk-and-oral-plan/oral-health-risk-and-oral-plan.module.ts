import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OralHealthRiskAndOralPlanRoutingModule } from './oral-health-risk-and-oral-plan-routing.module';
import { OralHealthRiskAndOralPlanComponent } from './oral-health-risk-and-oral-plan.component';


@NgModule({
  declarations: [
    OralHealthRiskAndOralPlanComponent
  ],
  imports: [
    CommonModule,
    OralHealthRiskAndOralPlanRoutingModule
  ]
})
export class OralHealthRiskAndOralPlanModule { }
