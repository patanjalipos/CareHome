import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpCommingRoutingModule } from './up-comming-routing.module';
import { UpCommingComponent } from './up-comming.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    UpCommingComponent
  ],
  imports: [
    CommonModule,
    UpCommingRoutingModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    TableModule,
    ButtonModule,
  ],exports:[
    UpCommingComponent
  ]
})
export class UpCommingModule { }
