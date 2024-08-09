import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BowelChartRoutingModule } from './bowel-chart-routing.module';
import { BowelChartComponent } from './bowel-chart.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
@NgModule({
    declarations: [BowelChartComponent],
    imports: [
        CommonModule,
        CalendarModule,
        DropdownModule,
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
    exports: [BowelChartComponent],
})
export class BowelChartModule { }
