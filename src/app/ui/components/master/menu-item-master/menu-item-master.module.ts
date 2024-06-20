import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuItemMasterRoutingModule } from './menu-item-master-routing.module';
import { MenuItemMasterComponent } from './menu-item-master.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {MultiSelectModule} from 'primeng/multiselect';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { InputNumberModule } from "primeng/inputnumber";
import { FilterationModule } from '../../filteration/filteration.module';


@NgModule({
  declarations: [MenuItemMasterComponent],
  imports: [
    CommonModule,
    MenuItemMasterRoutingModule,    
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    InputTextModule,
    InputNumberModule,
    FilterationModule,
  ]
})
export class MenuItemMasterModule { }
