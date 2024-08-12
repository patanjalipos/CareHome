import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewFormsComponent } from './view-forms.component';

const routes: Routes = [{path:'', component:ViewFormsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewFormsRoutingModule { }
