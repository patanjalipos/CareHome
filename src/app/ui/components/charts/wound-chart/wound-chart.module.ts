import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WoundChartRoutingModule } from './wound-chart-routing.module';
import { WoundChartComponent } from './wound-chart.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BodyMappingImageModule } from '../body-mapping-Image/body-mapping.module';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [
    WoundChartComponent
  ],
  imports: [
    CommonModule,
    WoundChartRoutingModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    SelectButtonModule,
    DialogModule,
    BodyMappingImageModule,
    CarouselModule,
    RadioButtonModule,
    StrikeThroughEntryModule,
    AccordionModule,
    MultiSelectModule,
    MessagesModule,
    NgxSliderModule,
    FileUploadModule
  ],
  exports: [WoundChartComponent]
})
export class WoundChartModule { }
