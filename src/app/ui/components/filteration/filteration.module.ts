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
import { FilterationComponent } from './filteration.component';
import { FilterationRoutingModule } from './filteration-routing.module';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [
        FilterationComponent
    ],
    imports: [
        CommonModule,
        FilterationRoutingModule,
        FormsModule,
        TableModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        DialogModule,
        FileUploadModule,
        CalendarModule,       
        AccordionModule,
        MultiSelectModule,
    ],
    exports: [FilterationComponent]
})
export class FilterationModule { }
