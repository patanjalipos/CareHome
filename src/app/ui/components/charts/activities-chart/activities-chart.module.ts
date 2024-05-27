import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesChartComponent } from './activities-chart.component';
import { ActivitiesChartRoutingModule } from './activities-chart-routing.module';

@NgModule({
    declarations: [ActivitiesChartComponent],
    imports: [CommonModule, ActivitiesChartRoutingModule],
    exports: [ActivitiesChartComponent],
})
export class ActivitiesChartModule {}
