import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertMasterComponent } from './alert-master.component';

const routes: Routes = [{ path: '', component: AlertMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlertMasterRoutingModule { }
