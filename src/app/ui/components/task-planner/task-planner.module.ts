import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskPlannerRoutingModule } from './task-planner-routing.module';
import { TaskPlannerComponent } from './task-planner.component';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from 'primeng/calendar';
import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [
    TaskPlannerComponent
  ],
  imports: [
    CommonModule,
    TaskPlannerRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    AutoCompleteModule,
  ]
})
export class TaskPlannerModule { }
