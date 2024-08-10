import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainchekChartRoutingModule } from './painchek-chart-routing.module';
import { PainchekChartComponent } from './painchek-chart.component';


@NgModule({
  declarations: [
    PainchekChartComponent
  ],
  imports: [
    CommonModule,
    PainchekChartRoutingModule
  ],
  exports: [PainchekChartComponent]
})
export class PainchekChartModule { }
