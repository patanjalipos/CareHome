import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositiveBehaviourSupportRoutingModule } from './positive-behaviour-support-routing.module';
import { PositiveBehaviourSupportComponent } from './positive-behaviour-support.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    PositiveBehaviourSupportComponent
  ],
  imports: [
    CommonModule,
    PositiveBehaviourSupportRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[PositiveBehaviourSupportComponent]
})
export class PositiveBehaviourSupportModule { }
