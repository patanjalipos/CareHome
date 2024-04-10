import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyCommunicationRoutingModule } from './family-communication-routing.module';
import { FamilyCommunicationComponent } from './family-communication.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    FamilyCommunicationComponent
  ],
  imports: [
    CommonModule,
    FamilyCommunicationRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ],
  exports:[FamilyCommunicationComponent]
  
})
export class FamilyCommunicationModule { }
