import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PainChartRoutingModule } from './pain-chart-routing.module';
import { PainChartComponent } from './pain-chart.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
  declarations: [PainChartComponent],
  imports: [
    CommonModule,
    PainChartRoutingModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    SelectButtonModule
  ],
  exports:[PainChartComponent]
})
export class PainChartModule { }
