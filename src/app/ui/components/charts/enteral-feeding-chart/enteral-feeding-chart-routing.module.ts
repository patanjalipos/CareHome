import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnteralFeedingChartComponent } from './enteral-feeding-chart.component';

const routes: Routes = [
  {path:'',component:EnteralFeedingChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnteralFeedingChartRoutingModule { }
