import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareVisionAssessmentRoutingModule } from './care-vision-assessment-routing.module';
import { CareVisionAssessmentComponent } from './care-vision-assessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CareVisionAssessmentComponent
  ],
  imports: [
    CommonModule,
    CareVisionAssessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

  ],
  exports:[CareVisionAssessmentComponent]
})
export class CareVisionAssessmentModule { }
