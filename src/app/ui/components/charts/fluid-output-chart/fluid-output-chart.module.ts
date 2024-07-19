import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FluidOutputChartRoutingModule } from './fluid-output-chart-routing.module';
import { FluidOutputChartComponent } from './fluid-output-chart.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [FluidOutputChartComponent],
  imports: [
    CommonModule,
    FluidOutputChartRoutingModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    SelectButtonModule,
    StrikeThroughEntryModule,
    DialogModule,
    ButtonModule,
    CalendarModule
  ],
  exports: [FluidOutputChartComponent]
})
export class FluidOutputChartModule { }
