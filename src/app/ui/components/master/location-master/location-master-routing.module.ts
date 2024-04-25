import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationMasterComponent } from './location-master.component';

const routes: Routes = [{path:'',component:LocationMasterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationMasterRoutingModule { }
