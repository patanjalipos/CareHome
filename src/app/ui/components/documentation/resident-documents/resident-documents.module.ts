import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentDocumentsRoutingModule } from './resident-documents-routing.module';
import { ResidentDocumentsComponent } from './resident-documents.component';


@NgModule({
  declarations: [
    ResidentDocumentsComponent
  ],
  imports: [
    CommonModule,
    ResidentDocumentsRoutingModule
  ]
})
export class ResidentDocumentsModule { }
