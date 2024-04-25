import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimaryContactRoutingModule } from './primary-contact-routing.module';
import { PrimaryContactComponent } from './primary-contact.component';

import {FormsModule} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    PrimaryContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimaryContactRoutingModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule
  ],
  exports:[PrimaryContactComponent]
})
export class PrimaryContactModule { }
