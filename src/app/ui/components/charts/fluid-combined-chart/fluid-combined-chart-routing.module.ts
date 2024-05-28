import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FluidCombinedChartComponent } from './fluid-combined-chart.component';

const routes: Routes = [
  { path: "", component: FluidCombinedChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FluidCombinedChartRoutingModule { }
