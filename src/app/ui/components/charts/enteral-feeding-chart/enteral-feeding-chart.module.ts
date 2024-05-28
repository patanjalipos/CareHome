import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnteralFeedingChartRoutingModule } from './enteral-feeding-chart-routing.module';
import { EnteralFeedingChartComponent } from './enteral-feeding-chart.component';


@NgModule({
  declarations: [EnteralFeedingChartComponent],
  imports: [
    CommonModule,
    EnteralFeedingChartRoutingModule
  ],
  exports:[EnteralFeedingChartComponent]
})
export class EnteralFeedingChartModule { }
