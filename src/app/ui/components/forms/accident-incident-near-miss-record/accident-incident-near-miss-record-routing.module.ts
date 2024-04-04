import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccidentIncidentNearMissRecordComponent } from './accident-incident-near-miss-record.component';

const routes: Routes = [
  {path:'',component:AccidentIncidentNearMissRecordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccidentIncidentNearMissRecordRoutingModule { }
