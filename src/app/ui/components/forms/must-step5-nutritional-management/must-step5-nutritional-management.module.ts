import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MustStep5NutritionalManagementRoutingModule } from './must-step5-nutritional-management-routing.module';
import { MustStep5NutritionalManagementComponent } from './must-step5-nutritional-management.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    MustStep5NutritionalManagementComponent
  ],
  imports: [
    CommonModule,
    MustStep5NutritionalManagementRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule,
  ]
})
export class MustStep5NutritionalManagementModule { }
