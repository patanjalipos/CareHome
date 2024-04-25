import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorGroupMasterComponent } from './indicator-group-master.component';

const routes: Routes = [{ path: '', component: IndicatorGroupMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorGroupMasterRoutingModule { }
