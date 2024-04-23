import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThePoolActivityLevelRoutingModule } from './the-pool-activity-level-routing.module';
import { ThePoolActivityLevelComponent } from './the-pool-activity-level.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    ThePoolActivityLevelComponent
  ],
  imports: [
    CommonModule,
    ThePoolActivityLevelRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

  ],
  exports:[ThePoolActivityLevelComponent]
})
export class ThePoolActivityLevelModule { }
