import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeightChartRoutingModule } from './weight-chart-routing.module';
import { WeightChartComponent } from './weight-chart.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';


@NgModule({
  declarations: [WeightChartComponent],
  imports: [
    CommonModule,
    WeightChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    DialogModule,
    StrikeThroughEntryModule,
    ButtonModule,
    MessagesModule
  ],
  exports:[WeightChartComponent]
})
export class WeightChartModule { }
