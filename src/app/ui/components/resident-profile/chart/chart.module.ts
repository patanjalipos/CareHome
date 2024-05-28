import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ActivitiesChartModule } from '../../charts/activities-chart/activities-chart.module';
import { BowelChartModule } from '../../charts/bowel-chart/bowel-chart.module';
import { EnteralFeedingChartModule } from '../../charts/enteral-feeding-chart/enteral-feeding-chart.module';

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
    BowelChartModule,
    EnteralFeedingChartModule
  ],
  exports:[ChartComponent]
})
export class ChartModule { }
