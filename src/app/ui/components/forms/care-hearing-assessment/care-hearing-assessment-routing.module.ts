import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareHearingAssessmentComponent } from './care-hearing-assessment.component';

const routes: Routes = [{
  path: '', component: CareHearingAssessmentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareHearingAssessmentRoutingModule { }
