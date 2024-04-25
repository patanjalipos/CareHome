import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FallRiskMasterComponent } from './fall-risk-master.component';

const routes: Routes = [{path:'',component:FallRiskMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FallRiskMasterRoutingModule { }
