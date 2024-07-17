import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsChartComponent } from './news-chart.component';

const routes: Routes = [
  { path: '', component: NewsChartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsChartRoutingModule { }
