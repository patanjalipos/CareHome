import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareFeelingFreshAndCleanRoutingModule } from './care-feeling-fresh-and-clean-routing.module';
import { CareFeelingFreshAndCleanComponent } from './care-feeling-fresh-and-clean.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    CareFeelingFreshAndCleanComponent
  ],
  imports: [
    CommonModule,
    CareFeelingFreshAndCleanRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule,
  ]
})
export class CareFeelingFreshAndCleanModule { }
