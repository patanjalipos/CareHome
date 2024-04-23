import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarePlanReviewRoutingModule } from './care-plan-review-routing.module';
import { CarePlanReviewComponent } from './care-plan-review.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CarePlanReviewComponent
  ],
  imports: [
    CommonModule,
    CarePlanReviewRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

  ],
  exports:[CarePlanReviewComponent]
})
export class CarePlanReviewModule { }
