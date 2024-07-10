import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SightingChartRoutingModule } from './sighting-chart-routing.module';
import { SightingChartComponent } from './sighting-chart.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';


@NgModule({
  declarations: [SightingChartComponent],
  imports: [
    CommonModule,
    SightingChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    DialogModule,
    StrikeThroughEntryModule,
  ],
  exports:[SightingChartComponent]
})
export class SightingChartModule { }
