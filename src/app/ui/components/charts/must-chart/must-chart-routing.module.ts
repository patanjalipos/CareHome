import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MustChartComponent } from './must-chart.component';

const routes: Routes = [
  { path: '', component: MustChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MustChartRoutingModule { }
