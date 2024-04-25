import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentHealthcareDetailsRoutingModule } from './resident-healthcare-details-routing.module';
import { ResidentHealthcareDetailsComponent } from './resident-healthcare-details.component';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    ResidentHealthcareDetailsComponent
  ],
  imports: [
    CommonModule,
    ResidentHealthcareDetailsRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    AccordionModule
  ],
  exports:[ResidentHealthcareDetailsComponent]
})
export class ResidentHealthcareDetailsModule { }
