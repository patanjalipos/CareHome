import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnectingAndCommunicatingComponent } from './connecting-and-communicating.component';

const routes: Routes = [
  {
    path:'', component:ConnectingAndCommunicatingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectingAndCommunicatingRoutingModule { }
