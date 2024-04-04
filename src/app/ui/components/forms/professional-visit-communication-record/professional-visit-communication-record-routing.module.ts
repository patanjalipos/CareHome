import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionalVisitCommunicationRecordComponent } from './professional-visit-communication-record.component';

const routes: Routes = [
  {
    path:'',component:ProfessionalVisitCommunicationRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalVisitCommunicationRecordRoutingModule { }
