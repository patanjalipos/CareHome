import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertPreferencesRoutingModule } from './alert-preferences-routing.module';
import { AlertPreferencesComponent } from './alert-preferences.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    AlertPreferencesComponent
  ],
  imports: [
    CommonModule,
    AlertPreferencesRoutingModule,
    RadioButtonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CheckboxModule,
    DropdownModule,
    AccordionModule
  ],
  exports:[AlertPreferencesComponent]
})
export class AlertPreferencesModule { }
