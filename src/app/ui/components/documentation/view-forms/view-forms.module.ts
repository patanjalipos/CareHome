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
import { ViewFormsComponent } from './view-forms.component';
import { ViewFormsRoutingModule } from './view-forms-routing.module';
import { FormsDashboardModule } from '../../forms/forms-dashboard/forms-dashboard.module';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
    declarations: [
        ViewFormsComponent
    ],
    imports: [
        CommonModule,
        ViewFormsRoutingModule,
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
        FormsDashboardModule,
    ]
})
export class  ViewFormsModule { }
