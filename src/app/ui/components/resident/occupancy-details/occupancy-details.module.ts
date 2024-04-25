import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OccupancyDetailsRoutingModule } from './occupancy-details-routing.module';
import { OccupancyDetailsComponent } from './occupancy-details.component';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';

import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    OccupancyDetailsComponent
  ],
  imports: [
    CommonModule,
    OccupancyDetailsRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    DropdownModule,
    CalendarModule,
    AccordionModule
  ],
  exports:[OccupancyDetailsComponent]
})
export class OccupancyDetailsModule { }
