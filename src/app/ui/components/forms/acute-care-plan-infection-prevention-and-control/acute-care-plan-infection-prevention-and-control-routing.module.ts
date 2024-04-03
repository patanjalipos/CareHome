import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcuteCarePlanInfectionPreventionAndControlComponent } from './acute-care-plan-infection-prevention-and-control.component';

const routes: Routes = [
  {
    path:'',component:AcuteCarePlanInfectionPreventionAndControlComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcuteCarePlanInfectionPreventionAndControlRoutingModule { }
