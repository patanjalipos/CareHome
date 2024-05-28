import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentProfileRoutingModule } from './resident-profile-routing.module';
import { ResidentProfileComponent } from './resident-profile.component';
import { ProfileModule } from './profile/profile.module';
import { FormsDashboardModule } from '../forms/forms-dashboard/forms-dashboard.module';
import { AlertModule } from './alert/alert.module';
import { ChartModule } from './chart/chart.module';
import { ResidentProgressnotesModule } from "./resident-progressnotes/resident-progressnotes.module";


@NgModule({
    declarations: [
        ResidentProfileComponent
    ],
    exports: [ResidentProfileComponent],
    imports: [
        CommonModule,
        ResidentProfileRoutingModule,
        ProfileModule,
        AlertModule,
        FormsDashboardModule,
        ChartModule,
        ResidentProgressnotesModule,
  ],
})
export class ResidentProfileModule { }
