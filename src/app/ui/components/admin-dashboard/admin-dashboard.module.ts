import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard.component';

import { ChartModule } from 'primeng/chart'
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ActivityModule } from '../activity/activity.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    FormsModule,
    ChartModule,
    DialogModule,
    ActivityModule,
  ]
})
export class AdminDashboardModule { }
