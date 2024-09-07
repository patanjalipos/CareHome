import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageActionSchedulesRoutingModule } from './manage-action-schedules-routing.module';
import { ManageActionSchedulesComponent } from './manage-action-schedules.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    ManageActionSchedulesComponent
  ],
  imports: [
    CommonModule,
    ManageActionSchedulesRoutingModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
  ],exports:[
    ManageActionSchedulesComponent
  ]
})
export class ManageActionSchedulesModule { }
