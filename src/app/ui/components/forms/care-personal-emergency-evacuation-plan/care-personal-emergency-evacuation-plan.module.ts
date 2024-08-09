import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarePersonalEmergencyEvacuationPlanRoutingModule } from './care-personal-emergency-evacuation-plan-routing.module';
import { CarePersonalEmergencyEvacuationPlanComponent } from './care-personal-emergency-evacuation-plan.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    CarePersonalEmergencyEvacuationPlanComponent
  ],
  imports: [
    CommonModule,
    CarePersonalEmergencyEvacuationPlanRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ],
  exports:[CarePersonalEmergencyEvacuationPlanComponent]
})
export class CarePersonalEmergencyEvacuationPlanModule { }
