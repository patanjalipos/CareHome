import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskWaterlowPressureUlcerRoutingModule } from './risk-waterlow-pressure-ulcer-routing.module';
import { RiskWaterlowPressureUlcerComponent } from './risk-waterlow-pressure-ulcer.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    RiskWaterlowPressureUlcerComponent
  ],
  imports: [
    CommonModule,
    RiskWaterlowPressureUlcerRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ],
  exports:[RiskWaterlowPressureUlcerComponent]
})
export class RiskWaterlowPressureUlcerModule { }
