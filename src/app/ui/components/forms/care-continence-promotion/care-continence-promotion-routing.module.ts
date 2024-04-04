import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareBreathingAndCirculationAssessmentComponent } from '../care-breathing-and-circulation-assessment/care-breathing-and-circulation-assessment.component';

const routes: Routes = [
  {
    path:'',component:CareBreathingAndCirculationAssessmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareContinencePromotionRoutingModule { }
