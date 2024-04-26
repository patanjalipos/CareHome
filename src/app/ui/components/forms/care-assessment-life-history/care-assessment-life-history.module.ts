import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareAssessmentLifeHistoryRoutingModule } from './care-assessment-life-history-routing.module';
import { CareAssessmentLifeHistoryComponent } from './care-assessment-life-history.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CareAssessmentLifeHistoryComponent
  ],
  imports: [
    CommonModule,
    CareAssessmentLifeHistoryRoutingModule,
    CheckboxModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule
  ],
  exports : [CareAssessmentLifeHistoryComponent]
})
export class CareAssessmentLifeHistoryModule { }
