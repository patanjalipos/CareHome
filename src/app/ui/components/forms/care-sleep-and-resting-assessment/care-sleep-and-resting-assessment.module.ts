import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareSleepAndRestingAssessmentRoutingModule } from './care-sleep-and-resting-assessment-routing.module';
import { CareSleepAndRestingAssessmentComponent } from './care-sleep-and-resting-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CareSleepAndRestingAssessmentComponent
  ],
  imports: [
    CommonModule,
    CareSleepAndRestingAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule,
    TriStateCheckboxModule,
  ],
  exports:[CareSleepAndRestingAssessmentComponent]
})
export class CareSleepAndRestingAssessmentModule { }
