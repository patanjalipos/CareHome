import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BloodPressureChartRoutingModule } from './blood-pressure-chart-routing.module';
import { BloodPressureChartComponent } from './blood-pressure-chart.component';


@NgModule({
  declarations: [BloodPressureChartComponent],
  imports: [
    CommonModule,
    BloodPressureChartRoutingModule
  ],
  exports:[BloodPressureChartComponent]
})
export class BloodPressureChartModule { }
