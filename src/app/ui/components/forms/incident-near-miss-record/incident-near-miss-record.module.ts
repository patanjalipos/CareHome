import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncidentNearMissRecordRoutingModule } from './incident-near-miss-record-routing.module';
import { IncidentNearMissRecordComponent } from './incident-near-miss-record.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    IncidentNearMissRecordComponent
  ],
  imports: [
    CommonModule,
    IncidentNearMissRecordRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,

  ],
  exports:[IncidentNearMissRecordComponent]
})
export class IncidentNearMissRecordModule { }
