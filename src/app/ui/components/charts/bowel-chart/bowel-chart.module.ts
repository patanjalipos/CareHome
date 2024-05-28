import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BowelChartRoutingModule } from './bowel-chart-routing.module';
import { BowelChartComponent } from './bowel-chart.component';


@NgModule({
  declarations: [BowelChartComponent],
  imports: [
    CommonModule,
    BowelChartRoutingModule
  ],
  exports: [BowelChartComponent],
})
export class BowelChartModule { }
