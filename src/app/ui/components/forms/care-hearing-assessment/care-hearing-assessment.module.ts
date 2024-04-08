import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareHearingAssessmentRoutingModule } from './care-hearing-assessment-routing.module';
import { CareHearingAssessmentComponent } from './care-hearing-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';


@NgModule({
  declarations: [
    CareHearingAssessmentComponent
  ],
  imports: [
    CommonModule,
    CareHearingAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule,
  ]
})
export class CareHearingAssessmentModule { }
