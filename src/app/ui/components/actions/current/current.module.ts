import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentRoutingModule } from './current-routing.module';
import { CurrentComponent } from './current.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    CurrentComponent
  ],
  imports: [
    CommonModule,
    CurrentRoutingModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
  ] ,
  exports:[
    CurrentComponent
  ]
})
export class CurrentModule { }
