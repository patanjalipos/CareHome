import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentListComponent } from './resident-list.component';

const routes: Routes = [{path:'', component:ResidentListComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentListRoutingModule { }
