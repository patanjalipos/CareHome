import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpCommingComponent } from './up-comming.component';

const routes: Routes = [
  { path: '', component: UpCommingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpCommingRoutingModule { }
