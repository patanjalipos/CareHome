import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissedRoutingModule } from './missed-routing.module';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { MissedComponent } from './missed.component';
import { FilterationModule } from "../../filteration/filteration.module";


@NgModule({
  declarations: [
    MissedComponent
  ],
  imports: [
    CommonModule,
    MissedRoutingModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
    FilterationModule
],
  exports:[
    MissedComponent
  ]
})
export class MissedModule { }
