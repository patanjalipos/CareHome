import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpDoctorVisitCommunicationRecordRoutingModule } from './gp-doctor-visit-communication-record-routing.module';
import { GpDoctorVisitCommunicationRecordComponent } from './gp-doctor-visit-communication-record.component';


@NgModule({
  declarations: [
    GpDoctorVisitCommunicationRecordComponent
  ],
  imports: [
    CommonModule,
    GpDoctorVisitCommunicationRecordRoutingModule
  ]
})
export class GpDoctorVisitCommunicationRecordModule { }
