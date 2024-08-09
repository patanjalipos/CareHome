import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareOralAndDentalRoutingModule } from './care-oral-and-dental-routing.module';
import { CareOralAndDentalComponent } from './care-oral-and-dental.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CareOralAndDentalComponent
  ],
  imports: [
    CommonModule,
    CareOralAndDentalRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports :[CareOralAndDentalComponent]
})
export class CareOralAndDentalModule { }
