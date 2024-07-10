import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FluidOutputChartComponent } from './fluid-output-chart.component';

const routes: Routes = [
  { path: '', component: FluidOutputChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FluidOutputChartRoutingModule { }
