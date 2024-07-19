import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PainchekChartComponent } from './painchek-chart.component';

const routes: Routes = [
  { path: '', component: PainchekChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainchekChartRoutingModule { }
