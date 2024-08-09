import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlasgowComaScaleChartComponent } from './glasgow-coma-scale-chart.component';

const routes: Routes = [
  { path: '', component: GlasgowComaScaleChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlasgowComaScaleChartRoutingModule { }
