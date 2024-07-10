import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestraintChartComponent } from './restraint-chart.component';

const routes: Routes = [
  { path: '', component: RestraintChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestraintChartRoutingModule { }
