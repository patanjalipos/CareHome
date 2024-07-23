import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsChartRoutingModule } from './news-chart-routing.module';
import { NewsChartComponent } from './news-chart.component';


@NgModule({
  declarations: [
    NewsChartComponent
  ],
  imports: [
    CommonModule,
    NewsChartRoutingModule
  ],
  exports: [NewsChartComponent]
})
export class NewsChartModule { }
