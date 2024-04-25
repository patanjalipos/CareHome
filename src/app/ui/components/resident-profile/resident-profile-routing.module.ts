import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentProfileComponent } from './resident-profile.component';

const routes: Routes = [{path:'', component:ResidentProfileComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentProfileRoutingModule { }
