import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodPressureChartRoutingModule } from './blood-pressure-chart-routing.module';
import { BloodPressureChartComponent } from './blood-pressure-chart.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [BloodPressureChartComponent],
  imports: [
    CommonModule,
    BloodPressureChartRoutingModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    CarouselModule,
    StrikeThroughEntryModule,
    DialogModule
  ],
  exports:[BloodPressureChartComponent]
})
export class BloodPressureChartModule { }
