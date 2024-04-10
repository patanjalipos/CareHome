import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcuteCarePlanInfectionPreventionAndControlRoutingModule } from './acute-care-plan-infection-prevention-and-control-routing.module';
import { AcuteCarePlanInfectionPreventionAndControlComponent } from './acute-care-plan-infection-prevention-and-control.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    AcuteCarePlanInfectionPreventionAndControlComponent
  ],
  imports: [
    CommonModule,
    AcuteCarePlanInfectionPreventionAndControlRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ],
  exports:[AcuteCarePlanInfectionPreventionAndControlComponent]
})
export class AcuteCarePlanInfectionPreventionAndControlModule { }
