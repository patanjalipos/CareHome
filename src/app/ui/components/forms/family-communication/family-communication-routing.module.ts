import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilyCommunicationComponent } from './family-communication.component';

const routes: Routes = [
  {
    path:'',component:FamilyCommunicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FamilyCommunicationRoutingModule { }
