import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewChartsComponent } from './view-charts.component';

const routes: Routes = [{path:'', component:ViewChartsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewChartsRoutingModule { }
