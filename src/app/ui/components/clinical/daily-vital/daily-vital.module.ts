import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { DailyVitalRoutingModule } from './daily-vital-routing.module';
import { DailyVitalComponent } from './daily-vital.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
@NgModule({
  declarations: [
    DailyVitalComponent
  ],
  imports: [
    CommonModule,
    DailyVitalRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    AccordionModule
  ],
  exports:[DailyVitalComponent]
})
export class DailyVitalModule { }
