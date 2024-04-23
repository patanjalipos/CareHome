import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareAssessmentDietaryNotificationRoutingModule } from './care-assessment-dietary-notification-routing.module';
import { CareAssessmentDietaryNotificationComponent } from './care-assessment-dietary-notification.component';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CareAssessmentDietaryNotificationComponent
  ],
  imports: [
    CommonModule,
    CareAssessmentDietaryNotificationRoutingModule,
    CheckboxModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule


  ],
  exports: [CareAssessmentDietaryNotificationComponent]
})
export class CareAssessmentDietaryNotificationModule { }
