import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondaryContactRoutingModule } from './secondary-contact-routing.module';
import { SecondaryContactComponent } from './secondary-contact.component';

import {FormsModule} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    SecondaryContactComponent
  ],
  imports: [
    CommonModule,
    SecondaryContactRoutingModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,  
    InputNumberModule  
  ],
  exports:[SecondaryContactComponent]
})
export class SecondaryContactModule { }
