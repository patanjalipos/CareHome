import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepositioningChartComponent } from './repositioning-chart.component';

const routes: Routes = [
  { path: "", component: RepositioningChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositioningChartRoutingModule { }
