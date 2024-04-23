import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskMultifactorialFallsRiskRoutingModule } from './risk-multifactorial-falls-risk-routing.module';
import { RiskMultifactorialFallsRiskComponent } from './risk-multifactorial-falls-risk.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    RiskMultifactorialFallsRiskComponent
  ],
  imports: [
    CommonModule,
    RiskMultifactorialFallsRiskRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports: [RiskMultifactorialFallsRiskComponent]
})
export class RiskMultifactorialFallsRiskModule { }
