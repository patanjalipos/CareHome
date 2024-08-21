import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidentProfileRoutingModule } from './resident-profile-routing.module';
import { ResidentProfileComponent } from './resident-profile.component';
import { ProfileModule } from './profile/profile.module';
import { FormsDashboardModule } from '../forms/forms-dashboard/forms-dashboard.module';
import { AlertModule } from './alert/alert.module';
import { ChartModule } from '../charts/chart-dashboard/chart.module';
import { ResidentProgressnotesModule } from "./resident-progressnotes/resident-progressnotes.module";
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActionsModule } from './actions/actions.module';


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
        DialogModule,
        ButtonModule,
        ConfirmDialogModule,
        ActionsModule
  ],
})
export class ResidentProfileModule { }
