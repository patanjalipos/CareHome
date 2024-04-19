import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareBehaviourAssessmentRoutingModule } from './care-behaviour-assessment-routing.module';
import { CareBehaviourAssessmentComponent } from './care-behaviour-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CareBehaviourAssessmentComponent
  ],
  imports: [
    CommonModule,
    CareBehaviourAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[CareBehaviourAssessmentComponent]
})
export class CareBehaviourAssessmentModule { }
