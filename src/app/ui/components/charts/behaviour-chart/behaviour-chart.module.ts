import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviourChartRoutingModule } from './behaviour-chart-routing.module';
import { BehaviourChartComponent } from './behaviour-chart.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [BehaviourChartComponent],
  imports: [
    CommonModule,
    BehaviourChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    StrikeThroughEntryModule,
    DialogModule
  ],
  exports:[BehaviourChartComponent]
})
export class BehaviourChartModule { }
