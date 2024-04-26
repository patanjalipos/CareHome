import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OralHealthRiskAndOralPlanRoutingModule } from './oral-health-risk-and-oral-plan-routing.module';
import { OralHealthRiskAndOralPlanComponent } from './oral-health-risk-and-oral-plan.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    OralHealthRiskAndOralPlanComponent
  ],
  imports: [
    CommonModule,
    OralHealthRiskAndOralPlanRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class OralHealthRiskAndOralPlanModule { }
