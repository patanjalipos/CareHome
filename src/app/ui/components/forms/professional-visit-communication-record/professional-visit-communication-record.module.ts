import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalVisitCommunicationRecordRoutingModule } from './professional-visit-communication-record-routing.module';
import { ProfessionalVisitCommunicationRecordComponent } from './professional-visit-communication-record.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    ProfessionalVisitCommunicationRecordComponent
  ],
  imports: [
    CommonModule,
    ProfessionalVisitCommunicationRecordRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ],
  exports:[ProfessionalVisitCommunicationRecordComponent]
})
export class ProfessionalVisitCommunicationRecordModule { }
