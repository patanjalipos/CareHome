import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentMasterComponent } from './resident-master.component';

const routes: Routes = [{path:'', component:ResidentMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentMasterRoutingModule { }
