import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareResidentContactsListRoutingModule } from './care-resident-contacts-list-routing.module';
import { CareResidentContactsListComponent } from './care-resident-contacts-list.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CareResidentContactsListComponent
  ],
  imports: [
    CommonModule,
    CareResidentContactsListRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule

  ],
  exports :[CareResidentContactsListComponent]
})
export class CareResidentContactsListModule { }
