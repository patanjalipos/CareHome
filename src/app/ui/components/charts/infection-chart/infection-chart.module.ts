import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfectionChartRoutingModule } from './infection-chart-routing.module';
import { InfectionChartComponent } from './infection-chart.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { BodyMappingImageModule } from '../body-mapping-Image/body-mapping.module';


@NgModule({
  declarations: [InfectionChartComponent],
  imports: [
    CommonModule,
    InfectionChartRoutingModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    CarouselModule,
    DialogModule,
    StrikeThroughEntryModule,
    MultiSelectModule,
    BodyMappingImageModule
  ],
  exports:[InfectionChartComponent]
})
export class InfectionChartModule { }
