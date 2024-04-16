import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareAssessmentMyEpilepsyRoutingModule } from './care-assessment-my-epilepsy-routing.module';
import { CareAssessmentMyEpilepsyComponent } from './care-assessment-my-epilepsy.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CareAssessmentMyEpilepsyComponent
  ],
  imports: [
    CommonModule,
    CareAssessmentMyEpilepsyRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,

  ],
  exports:[CareAssessmentMyEpilepsyComponent]
})
export class CareAssessmentMyEpilepsyModule { }
