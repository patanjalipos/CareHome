import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { PainAssessmentRoutingModule } from './pain-assessment-routing.module';
import { PainAssessmentComponent } from './pain-assessment.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  declarations: [
    PainAssessmentComponent,
  ],
  imports: [
    CommonModule,
    PainAssessmentRoutingModule,
    NgxSliderModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    AccordionModule,
  ],
  exports:[PainAssessmentComponent]
})
export class PainAssessmentModule { }
