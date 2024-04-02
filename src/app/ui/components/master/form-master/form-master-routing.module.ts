import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMasterComponent } from './form-master.component';

const routes: Routes = [{path:'',component:FormMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FormMasterRoutingModule { }
