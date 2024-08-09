import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodGlucoseChartRoutingModule } from './blood-glucose-chart-routing.module';
import { BloodGlucoseChartComponent } from './blood-glucose-chart.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';


@NgModule({
  declarations: [BloodGlucoseChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    BloodGlucoseChartRoutingModule,
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
  exports: [BloodGlucoseChartComponent],
})
export class BloodGlucoseChartModule { }
