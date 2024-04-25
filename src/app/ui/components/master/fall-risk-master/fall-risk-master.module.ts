import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FallRiskMasterRoutingModule } from './fall-risk-master-routing.module';
import { FallRiskMasterComponent } from './fall-risk-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    FallRiskMasterComponent
  ],
  imports: [
    CommonModule,
    FallRiskMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class FallRiskMasterModule { }
