import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsAndChartsRoutingModule } from './forms-and-charts-routing.module';
import { FormsAndChartsComponent } from './forms-and-charts.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FormsDashboardModule } from '../../forms/forms-dashboard/forms-dashboard.module';
import { ChartModule } from '../../charts/chart-dashboard/chart.module';

@NgModule({
    declarations: [FormsAndChartsComponent],
    imports: [
        CommonModule,
        FormsAndChartsRoutingModule,
        FormsModule,
        RadioButtonModule,
        DropdownModule,
        FormsDashboardModule,
        ChartModule
    ],
})
export class FormsAndChartsModule {}
