import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesChartComponent } from './activities-chart.component';
import { ActivitiesChartRoutingModule } from './activities-chart-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'primeng/carousel';
import { StrikeThroughEntryModule } from '../strike-through-entry/strike-through-entry.module';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
@NgModule({
    declarations: [ActivitiesChartComponent],
    imports: [
        CommonModule,
        ActivitiesChartRoutingModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        FormsModule,
        CarouselModule,
        StrikeThroughEntryModule,
        DialogModule,
        ButtonModule
    ],
    exports: [ActivitiesChartComponent],
})
export class ActivitiesChartModule {

}
