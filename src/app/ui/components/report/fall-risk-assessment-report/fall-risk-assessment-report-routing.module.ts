import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FallRiskAssessmentReportComponent } from './fall-risk-assessment-report.component';

const routes: Routes = [{ path: '', component: FallRiskAssessmentReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FallRiskAssessmentReportRoutingModule { }
