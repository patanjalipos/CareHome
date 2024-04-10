import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictNurseVisitCommunicationRoutingModule } from './district-nurse-visit-communication-routing.module';
import { DistrictNurseVisitCommunicationComponent } from './district-nurse-visit-communication.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    DistrictNurseVisitCommunicationComponent
  ],
  imports: [
    CommonModule,
    DistrictNurseVisitCommunicationRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule, 
    FormsModule,
    TriStateCheckboxModule

  ]
})
export class DistrictNurseVisitCommunicationModule { }
