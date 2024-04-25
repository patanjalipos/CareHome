import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorMasterComponent } from './indicator-master.component';

const routes: Routes = [{ path: '', component: IndicatorMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicatorMasterRoutingModule { }
