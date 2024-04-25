import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OccupancyDetailsComponent } from './occupancy-details.component';

const routes: Routes = [{path:'', component:OccupancyDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OccupancyDetailsRoutingModule { }
