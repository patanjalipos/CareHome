import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentPriorAdmissionRoutingModule } from './resident-prior-admission-routing.module';
import { ResidentPriorAdmissionComponent } from './resident-prior-admission.component';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    ResidentPriorAdmissionComponent
  ],
  imports: [
    CommonModule,
    ResidentPriorAdmissionRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    DropdownModule,
    AccordionModule
  ],
  exports:[ResidentPriorAdmissionComponent]
})
export class ResidentPriorAdmissionModule { }
