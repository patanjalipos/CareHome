import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FluidIntakeChartRoutingModule } from './fluid-intake-chart-routing.module';
import { FluidIntakeChartComponent } from './fluid-intake-chart.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [FluidIntakeChartComponent],
  imports: [
    CommonModule,
    FluidIntakeChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    StrikeThroughEntryModule,
    DialogModule,
    ButtonModule,
    MultiSelectModule
  ],
  exports: [FluidIntakeChartComponent]
})
export class FluidIntakeChartModule { }
