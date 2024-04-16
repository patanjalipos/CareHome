import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordOfPropertyRoutingModule } from './record-of-property-routing.module';
import { RecordOfPropertyComponent } from './record-of-property.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    RecordOfPropertyComponent
  ],
  imports: [
    CommonModule,
    RecordOfPropertyRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[RecordOfPropertyComponent]
})
export class RecordOfPropertyModule { }
