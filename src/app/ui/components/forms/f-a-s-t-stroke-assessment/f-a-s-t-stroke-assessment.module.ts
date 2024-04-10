import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FASTStrokeAssessmentRoutingModule } from './f-a-s-t-stroke-assessment-routing.module';
import { FASTStrokeAssessmentComponent } from './f-a-s-t-stroke-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    FASTStrokeAssessmentComponent
  ],
  imports: [
    CommonModule,
    FASTStrokeAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class FASTStrokeAssessmentModule { }
