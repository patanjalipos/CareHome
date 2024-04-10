import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareVitaminDSupplementationRoutingModule } from './care-vitamin-d-supplementation-routing.module';
import { CareVitaminDSupplementationComponent } from './care-vitamin-d-supplementation.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    CareVitaminDSupplementationComponent
  ],
  imports: [
    CommonModule,
    CareVitaminDSupplementationRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class CareVitaminDSupplementationModule { }
