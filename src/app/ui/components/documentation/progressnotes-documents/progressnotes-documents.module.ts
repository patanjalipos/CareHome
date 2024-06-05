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
import { ProgressnotesDocumentsComponent } from './progressnotes-documents.component';
import { ProgressnotesDocumentsRoutingModule } from './progressnotes-documents-routing.module';
import { ResidentProgressnotesModule } from "../../resident-profile/resident-progressnotes/resident-progressnotes.module";
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    declarations: [
        ProgressnotesDocumentsComponent
    ],
    imports: [
        CommonModule,
        ProgressnotesDocumentsRoutingModule,
        FormsModule,
        TableModule,
        DropdownModule,
        InputTextModule,
        InputNumberModule,
        ButtonModule,
        FileUploadModule,
        CalendarModule,       
        AccordionModule,
        ResidentProgressnotesModule,
    ]
})
export class ProgressnotesDocumentsModule { }
