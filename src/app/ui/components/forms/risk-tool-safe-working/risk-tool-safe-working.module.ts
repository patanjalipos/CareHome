import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskToolSafeWorkingRoutingModule } from './risk-tool-safe-working-routing.module';
import { RiskToolSafeWorkingComponent } from './risk-tool-safe-working.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    RiskToolSafeWorkingComponent
  ],
  imports: [
    CommonModule,
    RiskToolSafeWorkingRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

  ],
  exports:[RiskToolSafeWorkingComponent]
})
export class RiskToolSafeWorkingModule { }
