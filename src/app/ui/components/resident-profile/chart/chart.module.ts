import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ActivitiesChartModule } from '../../charts/activities-chart/activities-chart.module';
import { FluidCombinedChartModule } from "../../charts/fluid-combined-chart/fluid-combined-chart.module";
import { InfectionChartModule } from '../../charts/infection-chart/infection-chart.module';
import { BloodPressureChartModule } from '../../charts/blood-pressure-chart/blood-pressure-chart.module';
import { BehaviourChartModule } from '../../charts/behaviour-chart/behaviour-chart.module';

@NgModule({
    declarations: [
        ChartComponent
    ],
    exports: [ChartComponent],
    imports: [
        CommonModule,
        ChartRoutingModule,
        CalendarModule,
        CheckboxModule,
        FormsModule,
        DropdownModule,
        ActivitiesChartModule,
        FluidCombinedChartModule,
        InfectionChartModule,
        BehaviourChartModule,
        BloodPressureChartModule,
    ],
    exports:[ChartComponent]
})
export class ChartModule { }
