import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'fallriskassessmentreport', loadChildren: () => import('./fall-risk-assessment-report/fall-risk-assessment-report.module').then(m => m.FallRiskAssessmentReportModule) },
  { path: '**', redirectTo: '/notfound' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
