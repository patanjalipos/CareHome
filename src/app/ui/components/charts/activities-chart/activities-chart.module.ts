import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesChartComponent } from './activities-chart.component';
import { ActivitiesChartRoutingModule } from './activities-chart-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    declarations: [ActivitiesChartComponent],
    imports: [
        CommonModule,
        ActivitiesChartRoutingModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule
    ],
    exports: [ActivitiesChartComponent],
})
export class ActivitiesChartModule {

}
