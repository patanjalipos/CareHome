import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodPressureChartComponent } from './blood-pressure-chart.component';

const routes: Routes = [
  {path:'',component:BloodPressureChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodPressureChartRoutingModule { }
