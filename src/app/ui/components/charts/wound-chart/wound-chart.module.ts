import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WoundChartRoutingModule } from './wound-chart-routing.module';
import { WoundChartComponent } from './wound-chart.component';


@NgModule({
  declarations: [
    WoundChartComponent
  ],
  imports: [
    CommonModule,
    WoundChartRoutingModule
  ],
  exports: [WoundChartComponent]
})
export class WoundChartModule { }
