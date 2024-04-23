import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RespiratoryScreeningQuestionsRoutingModule } from './respiratory-screening-questions-routing.module';
import { RespiratoryScreeningQuestionsComponent } from './RespiratoryScreeningQuestionsComponent';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    RespiratoryScreeningQuestionsComponent
  ],
  imports: [
    CommonModule,
    RespiratoryScreeningQuestionsRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule


  ],
  exports: [RespiratoryScreeningQuestionsComponent]
})
export class RespiratoryScreeningQuestionsModule { }
