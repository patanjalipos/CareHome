import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentIndicatorsRoutingModule } from './resident-indicators-routing.module';
import { ResidentIndicatorsComponent } from './resident-indicators.component';
import {FormsModule} from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    ResidentIndicatorsComponent
  ],
  imports: [
    CommonModule,
    ResidentIndicatorsRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CheckboxModule,
    AccordionModule
  ],
  exports:[ResidentIndicatorsComponent]
})
export class ResidentIndicatorsModule { }
