import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsAndChartsRoutingModule } from './forms-and-charts-routing.module';
import { FormsAndChartsComponent } from './forms-and-charts.component';


@NgModule({
  declarations: [
    FormsAndChartsComponent
  ],
  imports: [
    CommonModule,
    FormsAndChartsRoutingModule
  ]
})
export class FormsAndChartsModule { }
