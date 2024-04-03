import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GpDoctorVisitCommunicationRecordComponent } from './gp-doctor-visit-communication-record.component';

const routes: Routes = [
  {
    path:'',component:GpDoctorVisitCommunicationRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GpDoctorVisitCommunicationRecordRoutingModule { }
