import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertHeadMasterComponent } from './alert-head-master.component';

const routes: Routes = [{ path: '', component: AlertHeadMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertHeadMasterRoutingModule { }
