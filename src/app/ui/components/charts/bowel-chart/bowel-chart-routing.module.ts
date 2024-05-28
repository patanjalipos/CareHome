import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BowelChartComponent } from './bowel-chart.component';

const routes: Routes = [
  {path:'',component:BowelChartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BowelChartRoutingModule { }
