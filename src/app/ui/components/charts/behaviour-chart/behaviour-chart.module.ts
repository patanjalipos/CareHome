import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviourChartRoutingModule } from './behaviour-chart-routing.module';
import { BehaviourChartComponent } from './behaviour-chart.component';


@NgModule({
  declarations: [BehaviourChartComponent],
  imports: [
    CommonModule,
    BehaviourChartRoutingModule
  ],
  exports:[BehaviourChartComponent]
})
export class BehaviourChartModule { }
