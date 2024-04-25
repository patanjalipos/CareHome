import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartHeadMasterComponent } from './chart-head-master.component';

const routes: Routes = [{ path: '', component: ChartHeadMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartHeadMasterRoutingModule { }
