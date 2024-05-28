import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ActivitiesChartModule } from '../../charts/activities-chart/activities-chart.module';

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
    ActivitiesChartModule
  ],
  exports:[ChartComponent]
})
export class ChartModule { }
