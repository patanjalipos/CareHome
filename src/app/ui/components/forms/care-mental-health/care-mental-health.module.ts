import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareMentalHealthRoutingModule } from './care-mental-health-routing.module';
import { CareMentalHealthComponent } from '../care-mental-health/care-mental-health.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CheckboxModule } from 'primeng/checkbox';


@NgModule({
  declarations: [
    CareMentalHealthComponent
  ],
  imports: [
    CommonModule,
    CareMentalHealthRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule,
    CheckboxModule
  ],
  exports:[CareMentalHealthComponent]
})
export class CareMentalHealthModule { }
