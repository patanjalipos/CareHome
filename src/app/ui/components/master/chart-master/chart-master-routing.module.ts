import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartMasterComponent } from './chart-master.component';

const routes: Routes = [{ path: '', component: ChartMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartMasterRoutingModule { }
