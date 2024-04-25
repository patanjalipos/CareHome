import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentPreferencesRoutingModule } from './resident-preferences-routing.module';
import { ResidentPreferencesComponent } from './resident-preferences.component';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CheckboxModule } from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ResidentPreferencesComponent
  ],
  imports: [
    CommonModule,
    ResidentPreferencesRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectButtonModule,
    CheckboxModule,
    AccordionModule,
    DropdownModule
  ],
  exports:[ResidentPreferencesComponent]
})
export class ResidentPreferencesModule { }
