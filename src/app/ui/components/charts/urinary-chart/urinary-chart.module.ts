import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UrinaryChartRoutingModule } from './urinary-chart-routing.module';
import { UrinaryChartComponent } from './urinary-chart.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
  declarations: [UrinaryChartComponent],
  imports: [
    CommonModule,
    UrinaryChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    DialogModule,
    StrikeThroughEntryModule,
    SelectButtonModule
  ],
  exports:[UrinaryChartComponent]
})
export class UrinaryChartModule { }
