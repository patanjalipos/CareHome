import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdlChartRoutingModule } from './adl-chart-routing.module';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AdlChartComponent } from './adl-chart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AdlChartComponent],
    imports: [
        CommonModule,
        AdlChartRoutingModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        FormsModule
    ],
    exports:[AdlChartComponent]
})
export class AdlChartModule {}
