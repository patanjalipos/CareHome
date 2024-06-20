import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodPressureChartRoutingModule } from './blood-pressure-chart-routing.module';
import { BloodPressureChartComponent } from './blood-pressure-chart.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [BloodPressureChartComponent],
  imports: [
    CommonModule,
    BloodPressureChartRoutingModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    CarouselModule
  ],
  exports:[BloodPressureChartComponent]
})
export class BloodPressureChartModule { }
