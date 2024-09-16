import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageActionSchedulesComponent } from './manage-action-schedules.component';

const routes: Routes = [
  { path: '', component: ManageActionSchedulesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageActionSchedulesRoutingModule { }
