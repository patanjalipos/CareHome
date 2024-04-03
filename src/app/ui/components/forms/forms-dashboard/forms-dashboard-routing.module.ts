import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsDashboardComponent } from './forms-dashboard.component';

const routes: Routes = [
  {
  path:'', component:FormsDashboardComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsDashboardRoutingModule { }
