import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationMasterRoutingModule } from './location-master-routing.module';
import { LocationMasterComponent } from './location-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    LocationMasterComponent
  ],
  imports: [
    CommonModule,
    LocationMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
  ]
})
export class LocationMasterModule { }
