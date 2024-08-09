import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentDocumentsRoutingModule } from './resident-documents-routing.module';
import { ResidentDocumentsComponent } from './resident-documents.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ResidentDocumentsComponent
  ],
  imports: [
    CommonModule,
    ResidentDocumentsRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    FileUploadModule,
    CalendarModule,
  ]
})
export class ResidentDocumentsModule { }
