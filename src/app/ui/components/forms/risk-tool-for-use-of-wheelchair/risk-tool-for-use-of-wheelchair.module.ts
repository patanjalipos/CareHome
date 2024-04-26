import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskToolForUseOfWheelchairRoutingModule } from './risk-tool-for-use-of-wheelchair-routing.module';
import { RiskToolForUseOfWheelchairComponent } from './risk-tool-for-use-of-wheelchair.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    RiskToolForUseOfWheelchairComponent
  ],
  imports: [
    CommonModule,
    RiskToolForUseOfWheelchairRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

  ],
  exports:[ RiskToolForUseOfWheelchairComponent]
})
export class RiskToolForUseOfWheelchairModule { }
