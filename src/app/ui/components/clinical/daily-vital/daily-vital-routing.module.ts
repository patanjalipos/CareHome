import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DailyVitalComponent } from './daily-vital.component';

const routes: Routes = [{ path: '', component: DailyVitalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DailyVitalRoutingModule { }
