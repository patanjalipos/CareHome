import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartPreferencesRoutingModule } from './chart-preferences-routing.module';
import { ChartPreferencesComponent } from './chart-preferences.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    ChartPreferencesComponent
  ],
  imports: [
    CommonModule,
    ChartPreferencesRoutingModule,
    RadioButtonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    AccordionModule
  ],
  exports:[ChartPreferencesComponent]
})
export class ChartPreferencesModule { }
