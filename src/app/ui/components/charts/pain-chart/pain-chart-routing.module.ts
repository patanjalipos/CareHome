import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainChartComponent } from './pain-chart.component';

const routes: Routes = [
  { path: "", component: PainChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainChartRoutingModule { }
