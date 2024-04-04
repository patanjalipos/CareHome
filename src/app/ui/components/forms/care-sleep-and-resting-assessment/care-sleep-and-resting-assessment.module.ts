import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareSleepAndRestingAssessmentRoutingModule } from './care-sleep-and-resting-assessment-routing.module';
import { CareSleepAndRestingAssessmentComponent } from './care-sleep-and-resting-assessment.component';


@NgModule({
  declarations: [
    CareSleepAndRestingAssessmentComponent
  ],
  imports: [
    CommonModule,
    CareSleepAndRestingAssessmentRoutingModule
  ]
})
export class CareSleepAndRestingAssessmentModule { }
