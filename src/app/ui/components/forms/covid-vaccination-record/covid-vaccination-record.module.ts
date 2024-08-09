import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CovidVaccinationRecordRoutingModule } from './covid-vaccination-record-routing.module';
import { CovidVaccinationRecordComponent } from './covid-vaccination-record.component';


@NgModule({
  declarations: [
    CovidVaccinationRecordComponent
  ],
  imports: [
    CommonModule,
    CovidVaccinationRecordRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

  ],
  exports:[CovidVaccinationRecordComponent]
})
export class CovidVaccinationRecordModule { }
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';