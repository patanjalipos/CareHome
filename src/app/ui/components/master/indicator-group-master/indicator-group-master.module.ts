import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicatorGroupMasterRoutingModule } from './indicator-group-master-routing.module';
import { IndicatorGroupMasterComponent } from './indicator-group-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    IndicatorGroupMasterComponent
  ],
  imports: [
    CommonModule,
    IndicatorGroupMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class IndicatorGroupMasterModule { }
