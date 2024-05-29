import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FluidCombinedChartRoutingModule } from './fluid-combined-chart-routing.module';
import { FluidCombinedChartComponent } from './fluid-combined-chart.component';


@NgModule({
  declarations: [FluidCombinedChartComponent],
  imports: [
    CommonModule,
    FluidCombinedChartRoutingModule
  ],
  exports: [FluidCombinedChartComponent],
})
export class FluidCombinedChartModule { }
