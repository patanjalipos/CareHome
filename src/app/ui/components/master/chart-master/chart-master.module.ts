import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartMasterRoutingModule } from './chart-master-routing.module';
import { ChartMasterComponent } from './chart-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    ChartMasterComponent
  ],
  imports: [
    CommonModule,
    ChartMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class ChartMasterModule { }
