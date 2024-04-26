import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareSkinAssessmentRoutingModule } from './care-skin-assessment-routing.module';
import { CareSkinAssessmentComponent } from './care-skin-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CareSkinAssessmentComponent
  ],
  imports: [
    CommonModule,
    CareSkinAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports: [CareSkinAssessmentComponent]
})
export class CareSkinAssessmentModule { }
