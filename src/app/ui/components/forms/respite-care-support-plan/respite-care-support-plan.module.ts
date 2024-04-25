import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RespiteCareSupportPlanRoutingModule } from './respite-care-support-plan-routing.module';
import { RespiteCareSupportPlanComponent } from './respite-care-support-plan.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    RespiteCareSupportPlanComponent
  ],
  imports: [
    CommonModule,
    RespiteCareSupportPlanRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports: [RespiteCareSupportPlanComponent]
})
export class RespiteCareSupportPlanModule { }
