import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RiskPhysicalDependencyAssessmentComponent } from '../risk-physical-dependency-assessment/risk-physical-dependency-assessment.component';

const routes: Routes = [
  {
    path:'',component:RiskPhysicalDependencyAssessmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskWaterlowPressureUlcerRoutingModule { }
