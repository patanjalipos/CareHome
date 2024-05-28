import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesChartComponent } from './activities-chart.component';

const routes: Routes = [
  {path:'',component:ActivitiesChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesChartRoutingModule { }
