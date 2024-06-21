import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeMasterRoutingModule } from './home-master-routing.module';
import { HomeMasterComponent } from './home-master.component';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from "primeng/inputnumber";
import { ButtonModule } from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { AccordionModule } from 'primeng/accordion';
import { FilterationModule } from '../../filteration/filteration.module';
@NgModule({
  declarations: [
    HomeMasterComponent
  ],
  imports: [
    CommonModule,
    HomeMasterRoutingModule,
    FormsModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    AccordionModule,
    CheckboxModule,
    FilterationModule,
  ]
})
export class HomeMasterModule { }
