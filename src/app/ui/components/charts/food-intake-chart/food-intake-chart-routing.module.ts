import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoodIntakeChartComponent } from './food-intake-chart.component';

const routes: Routes = [
  { path: '', component: FoodIntakeChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodIntakeChartRoutingModule { }
