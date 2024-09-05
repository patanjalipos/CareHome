import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { ChartModule } from '../../charts/chart-dashboard/chart.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ViewChartsComponent } from './view-charts.component';
import { ViewChartsRoutingModule } from './view-charts-routing.module';

@NgModule({
    declarations: [
        ViewChartsComponent
    ],
    imports: [
        CommonModule,
        ViewChartsRoutingModule,
        FormsModule,
        TableModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        RadioButtonModule,
        ButtonModule,
        FileUploadModule,
        CalendarModule,       
        AccordionModule,
        ChartModule,
    ]
})
export class  ViewChartsModule { }
