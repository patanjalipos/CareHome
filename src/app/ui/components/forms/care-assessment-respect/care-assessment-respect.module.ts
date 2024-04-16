import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareAssessmentRespectRoutingModule } from './care-assessment-respect-routing.module';
import { CareAssessmentRespectComponent } from './care-assessment-respect.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CareAssessmentRespectComponent
  ],
  imports: [
    CommonModule,
    CareAssessmentRespectRoutingModule,
    CheckboxModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule

    
  ],
  exports:[CareAssessmentRespectComponent]
})
export class CareAssessmentRespectModule { }
