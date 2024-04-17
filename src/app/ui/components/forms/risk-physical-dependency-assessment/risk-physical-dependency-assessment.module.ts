import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskPhysicalDependencyAssessmentRoutingModule } from './risk-physical-dependency-assessment-routing.module';
import { RiskPhysicalDependencyAssessmentComponent } from './risk-physical-dependency-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    RiskPhysicalDependencyAssessmentComponent
  ],
  imports: [
    CommonModule,
    RiskPhysicalDependencyAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
    
  ]
})
export class RiskPhysicalDependencyAssessmentModule { }
