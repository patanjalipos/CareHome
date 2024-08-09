import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfectionChartComponent } from './infection-chart.component';

const routes: Routes = [
  {path:"",component:InfectionChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfectionChartRoutingModule { }
