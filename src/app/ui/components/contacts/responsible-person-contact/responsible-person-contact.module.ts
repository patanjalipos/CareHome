import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResponsiblePersonContactRoutingModule } from './responsible-person-contact-routing.module';
import { ResponsiblePersonContactComponent } from './responsible-person-contact.component';

import {FormsModule} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    ResponsiblePersonContactComponent
  ],
  imports: [
    CommonModule,
    ResponsiblePersonContactRoutingModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    InputNumberModule
  ],
  exports:[ResponsiblePersonContactComponent]
})
export class ResponsiblePersonContactModule { }
