import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalVisitCommunicationRecordRoutingModule } from './professional-visit-communication-record-routing.module';
import { ProfessionalVisitCommunicationRecordComponent } from './professional-visit-communication-record.component';


@NgModule({
  declarations: [
    ProfessionalVisitCommunicationRecordComponent
  ],
  imports: [
    CommonModule,
    ProfessionalVisitCommunicationRecordRoutingModule
  ]
})
export class ProfessionalVisitCommunicationRecordModule { }
