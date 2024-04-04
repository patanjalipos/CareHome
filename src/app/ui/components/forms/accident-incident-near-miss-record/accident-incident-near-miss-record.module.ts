import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccidentIncidentNearMissRecordRoutingModule } from './accident-incident-near-miss-record-routing.module';
import { AccidentIncidentNearMissRecordComponent } from '../accident-incident-near-miss-record/accident-incident-near-miss-record.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    AccidentIncidentNearMissRecordComponent
  ],
  imports: [
    CommonModule,
    AccidentIncidentNearMissRecordRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class AccidentIncidentNearMissRecordModule { }
