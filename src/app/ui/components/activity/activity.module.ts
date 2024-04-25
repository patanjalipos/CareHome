import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
   
  ]
})
export class ActivityModule { }
