import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SepsisScreeningToolRoutingModule } from './sepsis-screening-tool-routing.module';
import { SepsisScreeningToolComponent } from './sepsis-screening-tool.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    SepsisScreeningToolComponent
  ],
  imports: [
    CommonModule,
    SepsisScreeningToolRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule

  ]
})
export class SepsisScreeningToolModule { }
