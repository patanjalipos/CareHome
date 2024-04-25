import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndicatorMasterRoutingModule } from './indicator-master-routing.module';
import { IndicatorMasterComponent } from './indicator-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    IndicatorMasterComponent
  ],
  imports: [
    CommonModule,
    IndicatorMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class IndicatorMasterModule { }
