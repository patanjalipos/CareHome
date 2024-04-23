import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HerbertProtocolMissingPersonRoutingModule } from './herbert-protocol-missing-person-routing.module';
import { HerbertProtocolMissingPersonComponent } from './herbert-protocol-missing-person.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    HerbertProtocolMissingPersonComponent
  ],
  imports: [
    CommonModule,
    HerbertProtocolMissingPersonRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule


  ],
  exports:[HerbertProtocolMissingPersonComponent]
})
export class HerbertProtocolMissingPersonModule { }
