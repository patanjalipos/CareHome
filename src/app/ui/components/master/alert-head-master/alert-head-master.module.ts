import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertHeadMasterRoutingModule } from './alert-head-master-routing.module';
import { AlertHeadMasterComponent } from './alert-head-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AlertHeadMasterComponent
  ],
  imports: [
    CommonModule,
    AlertHeadMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class AlertHeadMasterModule { }
