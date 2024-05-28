import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ActivitiesChartModule } from '../activities-chart/activities-chart.module';
import { FluidCombinedChartModule } from "../fluid-combined-chart/fluid-combined-chart.module";
import { InfectionChartModule } from '../infection-chart/infection-chart.module';
import { BloodPressureChartModule } from '../blood-pressure-chart/blood-pressure-chart.module';
import { BehaviourChartModule } from '../behaviour-chart/behaviour-chart.module';
import { BowelChartModule } from '../bowel-chart/bowel-chart.module';
import { EnteralFeedingChartModule } from '../enteral-feeding-chart/enteral-feeding-chart.module';
import { AdlChartModule } from '../adl-chart/adl-chart.module';

@NgModule({
    declarations: [
        ChartComponent
    ],
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
        BowelChartModule,
        EnteralFeedingChartModule,
        AdlChartModule
    ],
    exports: [ChartComponent]
})
export class ChartModule { }
