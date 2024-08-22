import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertRoutingModule } from './alert-routing.module';
import { AlertComponent } from './alert.component';
import { TableModule } from 'primeng/table';
// import { ButtonModule } from 'primeng/button';
// import { RippleModule } from 'primeng/ripple';
// import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from "primeng/inputtext";
// import { InputNumberModule } from "primeng/inputnumber";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ActionTakenPopupModule } from "../action-taken-popup/action-taken-popup.module";

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    CommonModule,
    AlertRoutingModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ActionTakenPopupModule
],
  exports:[AlertComponent]
})
export class AlertModule { }
