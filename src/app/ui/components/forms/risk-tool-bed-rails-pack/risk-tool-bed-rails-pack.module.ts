import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskToolBedRailsPackRoutingModule } from './risk-tool-bed-rails-pack-routing.module';
import { RiskToolBedRailsPackComponent } from '../risk-tool-bed-rails-pack/risk-tool-bed-rails-pack.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    RiskToolBedRailsPackComponent
  ],
  imports: [
    CommonModule,
    RiskToolBedRailsPackRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule

  ]
})
export class RiskToolBedRailsPackModule { }
