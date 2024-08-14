import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositioningChartRoutingModule } from './repositioning-chart-routing.module';
import { RepositioningChartComponent } from './repositioning-chart.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    RepositioningChartComponent
  ],
  imports: [
    CommonModule,
    RepositioningChartRoutingModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    SelectButtonModule,
    StrikeThroughEntryModule,
    DialogModule,
    ButtonModule,
    CalendarModule,
    MultiSelectModule
  ],
  exports: [RepositioningChartComponent]
})
export class RepositioningChartModule { }
