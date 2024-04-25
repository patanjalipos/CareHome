import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentMasterRoutingModule } from './resident-master-routing.module';
import { ResidentMasterComponent } from './resident-master.component';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FileUploadModule } from 'primeng/fileupload';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ResidentHealthcareDetailsModule } from '../resident-healthcare-details/resident-healthcare-details.module';
import { ResidentPreferencesModule } from '../resident-preferences/resident-preferences.module';
import { ResidentPriorAdmissionModule } from '../resident-prior-admission/resident-prior-admission.module';
import { OccupancyDetailsModule } from '../occupancy-details/occupancy-details.module';


@NgModule({
  declarations: [
    ResidentMasterComponent
  ],
  imports: [
    CommonModule,
    ResidentMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    AccordionModule,
    ButtonModule,   
    CalendarModule,
    MultiSelectModule,
    FileUploadModule,
    SelectButtonModule,
    ResidentHealthcareDetailsModule,
    ResidentPreferencesModule,
    ResidentPriorAdmissionModule,  
    OccupancyDetailsModule 
    
  ]
})
export class ResidentMasterModule { }
