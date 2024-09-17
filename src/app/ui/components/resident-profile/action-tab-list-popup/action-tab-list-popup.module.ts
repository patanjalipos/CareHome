import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionTabListPopupRoutingModule } from './action-tab-list-popup-routing.module';
import { ActionTabListPopupComponent } from './action-tab-list-popup.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [ActionTabListPopupComponent],
  imports: [
    CommonModule,
    ActionTabListPopupRoutingModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
    DropdownModule,
    InputTextareaModule,
    RadioButtonModule,
    CalendarModule
  ],
  exports:[ActionTabListPopupComponent]
})
export class ActionTabListPopupModule { }
