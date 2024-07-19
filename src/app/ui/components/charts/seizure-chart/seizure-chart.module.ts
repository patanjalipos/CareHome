import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeizureChartRoutingModule } from './seizure-chart-routing.module';
import { SeizureChartComponent } from './seizure-chart.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [SeizureChartComponent],
  imports: [
    CommonModule,
    SeizureChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    DialogModule,
    StrikeThroughEntryModule,
    SelectButtonModule,
    MultiSelectModule
  ],
  exports:[SeizureChartComponent]
})
export class SeizureChartModule { }
