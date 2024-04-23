import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordOfDecisionRoutingModule } from './record-of-decision-routing.module';
import { RecordOfDecisionComponent } from './record-of-decision.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    RecordOfDecisionComponent
  ],
  imports: [
    CommonModule,
    RecordOfDecisionRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

    
  ],
  exports:[RecordOfDecisionComponent]
})
export class RecordOfDecisionModule { }
