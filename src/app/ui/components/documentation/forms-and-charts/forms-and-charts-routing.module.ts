import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsAndChartsComponent } from './forms-and-charts.component';

const routes: Routes = [{path:'', component:FormsAndChartsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsAndChartsRoutingModule { }
