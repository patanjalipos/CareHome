import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsChartRoutingModule } from './news-chart-routing.module';
import { NewsChartComponent } from './news-chart.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BowelChartRoutingModule } from '../bowel-chart/bowel-chart-routing.module';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    NewsChartComponent
  ],
  imports: [
    CommonModule,
    NewsChartRoutingModule,
    MessagesModule,
    CommonModule,
    CalendarModule,
    DropdownModule,
    MessagesModule,
    InputTextModule,
    BowelChartRoutingModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    StrikeThroughEntryModule,
    DialogModule,
    ButtonModule,
    SelectButtonModule
  ],
  exports: [NewsChartComponent]
})
export class NewsChartModule { }
