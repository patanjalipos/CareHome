import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMasterRoutingModule } from './user-master-routing.module';
import { UserMasterComponent } from './user-master.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { AccordionModule } from 'primeng/accordion';
import { TreeModule } from 'primeng/tree';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { TreeTableModule } from 'primeng/treetable';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';
import { FilterationComponent } from '../../filteration/filteration.component';
import { FilterationModule } from '../../filteration/filteration.module';


@NgModule({
  declarations: [
    UserMasterComponent
  ],
  imports: [
    CommonModule,
    UserMasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    AccordionModule,
    TreeModule,
    OverlayPanelModule,
    ButtonModule,   
    CalendarModule,
    MultiSelectModule,
    TreeTableModule,
    DialogModule,
    FilterationModule,
  ]
})
export class UserMasterModule { }
