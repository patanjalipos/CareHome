import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsentFormRoutingModule } from './consent-form-routing.module';
import { ConsentFormComponent } from './consent-form.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    ConsentFormComponent
  ],
  imports: [
    CommonModule,
    ConsentFormRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports: [ConsentFormComponent]
})
export class ConsentFormModule { }
