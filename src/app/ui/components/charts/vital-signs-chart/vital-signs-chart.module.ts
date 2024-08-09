import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VitalSignsChartRoutingModule } from './vital-signs-chart-routing.module';
import { VitalSignsChartComponent } from './vital-signs-chart.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [VitalSignsChartComponent],
  imports: [
    CommonModule,
    VitalSignsChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    DialogModule,
    StrikeThroughEntryModule
  ],
  exports:[VitalSignsChartComponent]
})
export class VitalSignsChartModule { }
