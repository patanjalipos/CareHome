import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllergiesRoutingModule } from './allergies-routing.module';
import { AllergiesComponent } from './allergies.component';
import {FormsModule} from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
@NgModule({
  declarations: [
    AllergiesComponent
  ],
  imports: [
    CommonModule,
    AllergiesRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule
  ],
  exports:[AllergiesComponent]
})
export class AllergiesModule { }
