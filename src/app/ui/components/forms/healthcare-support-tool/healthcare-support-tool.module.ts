import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthcareSupportToolRoutingModule } from './healthcare-support-tool-routing.module';
import { HealthcareSupportToolComponent } from './healthcare-support-tool.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    HealthcareSupportToolComponent
  ],
  imports: [
    CommonModule,
    HealthcareSupportToolRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class HealthcareSupportToolModule { }
