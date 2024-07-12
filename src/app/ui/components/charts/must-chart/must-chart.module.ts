import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MustChartRoutingModule } from './must-chart-routing.module';
import { MustChartComponent } from './must-chart.component';


@NgModule({
  declarations: [
    MustChartComponent
  ],
  imports: [
    CommonModule,
    MustChartRoutingModule
  ],
  exports: [MustChartComponent]
})
export class MustChartModule { }
