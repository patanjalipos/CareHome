import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DentistVisitCommunicationRoutingModule } from './dentist-visit-communication-routing.module';
import { DentistVisitCommunicationComponent } from './dentist-visit-communication.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    DentistVisitCommunicationComponent
  ],
  imports: [
    CommonModule,
    DentistVisitCommunicationRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class DentistVisitCommunicationModule { }
