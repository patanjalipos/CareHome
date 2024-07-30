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
import { TableModule } from 'primeng/table';
import { PainChartModule } from "../pain-chart/pain-chart.module";
import { WeightChartModule } from '../weight-chart/weight-chart.module';
import { BloodGlucoseChartModule } from "../blood-glucose-chart/blood-glucose-chart.module";
import { WaterlowChartModule } from '../waterlow-chart/waterlow-chart.module';
import { VitalSignsChartModule } from '../vital-signs-chart/vital-signs-chart.module';
import { UrinaryChartModule } from '../urinary-chart/urinary-chart.module';
import { SightingChartModule } from '../sighting-chart/sighting-chart.module';
import { SeizureChartModule } from '../seizure-chart/seizure-chart.module';
import { FluidIntakeChartModule } from "../fluid-intake-chart/fluid-intake-chart.module";
import { FluidOutputChartModule } from "../fluid-output-chart/fluid-output-chart.module";
import { GlasgowComaScaleChartModule } from "../glasgow-coma-scale-chart/glasgow-coma-scale-chart.module";
import { FoodIntakeChartModule } from "../food-intake-chart/food-intake-chart.module";
import { RepositioningChartModule } from "../repositioning-chart/repositioning-chart.module";
import { RestraintChartModule } from "../restraint-chart/restraint-chart.module";
import { MustChartModule } from "../must-chart/must-chart.module";
import { NewsChartModule } from "../news-chart/news-chart.module";
import { WoundChartModule } from "../wound-chart/wound-chart.module";
import { PainchekChartModule } from "../painchek-chart/painchek-chart.module";

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
    TableModule,
    DropdownModule,
    ActivitiesChartModule,
    FluidCombinedChartModule,
    InfectionChartModule,
    BehaviourChartModule,
    BloodPressureChartModule,
    BowelChartModule,
    EnteralFeedingChartModule,
    AdlChartModule,
    PainChartModule,
    WeightChartModule,
    BloodGlucoseChartModule,
    WaterlowChartModule,
    VitalSignsChartModule,
    UrinaryChartModule,
    SightingChartModule,
    SeizureChartModule,
    FluidIntakeChartModule,
    FluidOutputChartModule,
    GlasgowComaScaleChartModule,
    FoodIntakeChartModule,
    RepositioningChartModule,
    RestraintChartModule,
    MustChartModule,
    NewsChartModule,
    WoundChartModule,
    PainchekChartModule
]
})
export class ChartModule { }
