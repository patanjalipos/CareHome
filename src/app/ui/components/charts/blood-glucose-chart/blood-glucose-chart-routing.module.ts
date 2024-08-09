import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BloodGlucoseChartComponent } from './blood-glucose-chart.component';

const routes: Routes = [
  {path:'',component:BloodGlucoseChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloodGlucoseChartRoutingModule { }
