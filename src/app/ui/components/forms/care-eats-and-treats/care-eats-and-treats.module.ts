import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareEatsAndTreatsRoutingModule } from './care-eats-and-treats-routing.module';
import { CareEatsAndTreatsComponent } from './care-eats-and-treats.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    CareEatsAndTreatsComponent
  ],
  imports: [
    CommonModule,
    CareEatsAndTreatsRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule

  ]
})
export class CareEatsAndTreatsModule { }
