import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { PainChartRoutingModule } from './pain-chart-routing.module';
import { PainChartComponent } from './pain-chart.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { BodyMappingImageModule } from '../body-mapping-Image/body-mapping.module';
import { CarouselModule } from 'primeng/carousel';
import { RadioButtonModule } from 'primeng/radiobutton';


@NgModule({
  declarations: [PainChartComponent],
  imports: [
    CommonModule,
    PainChartRoutingModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    SelectButtonModule,
    DialogModule,
    BodyMappingImageModule,
    CarouselModule,
    RadioButtonModule
  ],
  exports:[PainChartComponent]
})
export class PainChartModule { }
