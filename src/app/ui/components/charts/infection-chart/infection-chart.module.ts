import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfectionChartRoutingModule } from './infection-chart-routing.module';
import { InfectionChartComponent } from './infection-chart.component';


@NgModule({
  declarations: [InfectionChartComponent],
  imports: [
    CommonModule,
    InfectionChartRoutingModule
  ],
  exports:[InfectionChartComponent]
})
export class InfectionChartModule { }
