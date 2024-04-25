import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentListRoutingModule } from './resident-list-routing.module';
import { ResidentListComponent } from './resident-list.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    ResidentListComponent
  ],
  imports: [
    CommonModule,
    ResidentListRoutingModule,
    FormsModule,
    TableModule,
    InputTextModule,
    TieredMenuModule,
    ButtonModule,
  ]
})
export class ResidentListModule { }
