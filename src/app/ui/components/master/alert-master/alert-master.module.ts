import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertMasterRoutingModule } from './alert-master-routing.module';
import { AlertMasterComponent } from './alert-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AlertMasterComponent
  ],
  imports: [
    CommonModule,
    AlertMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class AlertMasterModule { }
