import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareEatsAndTreatsComponent } from './care-eats-and-treats.component';

const routes: Routes = [
  {
    path:'',component:CareEatsAndTreatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareEatsAndTreatsRoutingModule { }
