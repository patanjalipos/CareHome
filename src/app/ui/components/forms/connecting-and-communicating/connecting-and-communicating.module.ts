import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectingAndCommunicatingRoutingModule } from './connecting-and-communicating-routing.module';
import { ConnectingAndCommunicatingComponent } from './connecting-and-communicating.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    ConnectingAndCommunicatingComponent
  ],
  imports: [
    CommonModule,
    ConnectingAndCommunicatingRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ],
  exports :[ConnectingAndCommunicatingComponent]
})
export class ConnectingAndCommunicatingModule { }
