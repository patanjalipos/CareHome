import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartHeadMasterRoutingModule } from './chart-head-master-routing.module';
import { ChartHeadMasterComponent } from './chart-head-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ChartHeadMasterComponent
  ],
  imports: [
    CommonModule,
    ChartHeadMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class ChartHeadMasterModule { }
