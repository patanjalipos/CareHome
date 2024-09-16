import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MissedComponent } from './missed.component';

const routes: Routes = [
  { path: '', component: MissedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MissedRoutingModule { }
