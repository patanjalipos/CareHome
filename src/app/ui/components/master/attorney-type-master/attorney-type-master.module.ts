import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttorneyTypeMasterRoutingModule } from './attorney-type-master-routing.module';
import { AttorneyTypeMasterComponent } from './attorney-type-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AttorneyTypeMasterComponent
  ],
  imports: [
    CommonModule,
    AttorneyTypeMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class AttorneyTypeMasterModule { }
