import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliriumRiskAndRiskReductionRoutingModule } from './delirium-risk-and-risk-reduction-routing.module';
import { DeliriumRiskAndRiskReductionComponent } from './delirium-risk-and-risk-reduction.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    DeliriumRiskAndRiskReductionComponent
  ],
  imports: [
    CommonModule,
    DeliriumRiskAndRiskReductionRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class DeliriumRiskAndRiskReductionModule { }
