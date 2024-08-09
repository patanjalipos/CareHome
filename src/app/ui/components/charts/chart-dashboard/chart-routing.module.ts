import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart.component';
import { AuthGuard } from '../../auth/auth.guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard], component: ChartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
