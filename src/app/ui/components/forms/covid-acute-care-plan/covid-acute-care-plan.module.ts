import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovidAcuteCarePlanRoutingModule } from './covid-acute-care-plan-routing.module';
import { CovidAcuteCarePlanComponent } from './covid-acute-care-plan.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    CovidAcuteCarePlanComponent
  ],
  imports: [
    CommonModule,
    CovidAcuteCarePlanRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class CovidAcuteCarePlanModule { }
