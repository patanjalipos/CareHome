import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertListRoutingModule } from './alert-list-routing.module';
import { AlertListComponent } from './alert-list.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TieredMenuModule } from 'primeng/tieredmenu';


@NgModule({
  declarations: [
    AlertListComponent
  ],
  imports: [
    CommonModule,
    AlertListRoutingModule,
    FormsModule,
    TableModule,
    InputTextModule,
    TieredMenuModule,
    ButtonModule,
  ],
})
export class AlertListModule { }
