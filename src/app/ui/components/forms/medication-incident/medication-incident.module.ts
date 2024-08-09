import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicationIncidentRoutingModule } from './medication-incident-routing.module';
import { MedicationIncidentComponent } from './medication-incident.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    MedicationIncidentComponent
  ],
  imports: [
    CommonModule,
    MedicationIncidentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[MedicationIncidentComponent]
})
export class MedicationIncidentModule { }
