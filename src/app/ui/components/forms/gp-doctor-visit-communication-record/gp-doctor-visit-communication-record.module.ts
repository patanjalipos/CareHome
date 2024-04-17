import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpDoctorVisitCommunicationRecordRoutingModule } from './gp-doctor-visit-communication-record-routing.module';
import { GpDoctorVisitCommunicationRecordComponent } from './gp-doctor-visit-communication-record.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    GpDoctorVisitCommunicationRecordComponent
  ],
  imports: [
    CommonModule,
    GpDoctorVisitCommunicationRecordRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class GpDoctorVisitCommunicationRecordModule { }
