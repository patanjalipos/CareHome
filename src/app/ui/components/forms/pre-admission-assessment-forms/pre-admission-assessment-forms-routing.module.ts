import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreAdmissionAssessmentFormsComponent } from './pre-admission-assessment-forms.component';

const routes: Routes = [
  {
    path:'',component:PreAdmissionAssessmentFormsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreAdmissionAssessmentFormsRoutingModule { }
