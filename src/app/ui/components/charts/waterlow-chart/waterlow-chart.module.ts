import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterlowChartRoutingModule } from './waterlow-chart-routing.module';
import { WaterlowChartComponent } from './waterlow-chart.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [WaterlowChartComponent],
  imports: [
    CommonModule,
    WaterlowChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    DialogModule,
    StrikeThroughEntryModule,
    ButtonModule,
    SelectButtonModule,
    MessagesModule,
    MultiSelectModule
  ],
  exports:[WaterlowChartComponent]
})
export class WaterlowChartModule { }
