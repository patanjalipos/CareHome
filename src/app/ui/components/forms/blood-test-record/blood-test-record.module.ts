import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BloodTestRecordRoutingModule } from './blood-test-record-routing.module';
import { BloodTestRecordComponent } from './blood-test-record.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BloodTestRecordComponent
  ],
  imports: [
    CommonModule,
    BloodTestRecordRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule
  ],
  exports:[BloodTestRecordComponent]
})
export class BloodTestRecordModule { }
