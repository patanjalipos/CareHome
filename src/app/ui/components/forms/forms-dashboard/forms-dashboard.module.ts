import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsDashboardRoutingModule } from './forms-dashboard-routing.module';
import { FormsDashboardComponent } from './forms-dashboard.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {MultiSelectModule} from 'primeng/multiselect';
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { CalendarModule } from "primeng/calendar";
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { PreAdmissionAssessmentFormsModule } from '../pre-admission-assessment-forms/pre-admission-assessment-forms.module';



@NgModule({
  declarations: [
    FormsDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsDashboardRoutingModule,
    ToolbarModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    TableModule,
    ButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    PreAdmissionAssessmentFormsModule,
   
 


  ],

  exports:[
    FormsDashboardComponent,
  ]
})

export class FormsDashboardModule { }