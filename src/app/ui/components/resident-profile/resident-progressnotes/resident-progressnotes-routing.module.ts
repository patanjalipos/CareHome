import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentProgressnotesComponent } from './resident-progressnotes.component';

const routes: Routes = [{path:'', component:ResidentProgressnotesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentProgressnotesRoutingModule { }
