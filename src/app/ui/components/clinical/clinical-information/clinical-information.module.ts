import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClinicalInformationRoutingModule } from './clinical-information-routing.module';
import { ClinicalInformationComponent } from './clinical-information.component';
import {FormsModule} from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    ClinicalInformationComponent
  ],
  imports: [
    CommonModule,
    ClinicalInformationRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    AccordionModule
  ],
  exports:[ClinicalInformationComponent]
})
export class ClinicalInformationModule { }
