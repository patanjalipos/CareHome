import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskOnTheMoveRoutingModule } from './risk-on-the-move-routing.module';
import { RiskOnTheMoveComponent } from './risk-on-the-move.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    RiskOnTheMoveComponent
  ],
  imports: [
    CommonModule,
    RiskOnTheMoveRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class RiskOnTheMoveModule { }
