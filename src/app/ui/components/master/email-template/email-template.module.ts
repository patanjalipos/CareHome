import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateComponent } from './email-template.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import {EditorModule} from 'primeng/editor';

@NgModule({
  declarations: [EmailTemplateComponent],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule,
    FormsModule,
    //ReactiveFormsModule,
    ToastModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DropdownModule,
    InputTextModule,
    EditorModule
  ]
})
export class EmailTemplateModule { }
