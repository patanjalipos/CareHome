import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormMasterRoutingModule } from './form-master-routing.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';
import { FormMasterComponent } from './form-master.component';



@NgModule({
  declarations: [
    FormMasterComponent
  ],
  imports: [
    CommonModule,
    FormMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class FormMasterModule { }
