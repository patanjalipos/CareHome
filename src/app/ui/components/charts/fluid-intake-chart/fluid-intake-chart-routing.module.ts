import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FluidIntakeChartComponent } from './fluid-intake-chart.component';

const routes: Routes = [
  { path: '', component: FluidIntakeChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FluidIntakeChartRoutingModule { }
