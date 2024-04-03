import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BodyMappingRecordRoutingModule } from './body-mapping-record-routing.module';
import { BodyMappingRecordComponent } from './body-mapping-record.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    BodyMappingRecordComponent
  ],
  imports: [
    CommonModule,
    BodyMappingRecordRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class BodyMappingRecordModule { }
