import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterationComponent } from './filteration.component';

const routes: Routes = [{path:'', component:FilterationComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterationRoutingModule { }
