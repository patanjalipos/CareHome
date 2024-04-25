import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentProfileRoutingModule } from './resident-profile-routing.module';
import { ResidentProfileComponent } from './resident-profile.component';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { FluidAssessmentModule } from '../fluid-assessment/fluid-assessment.module';
import { PersonalDetailsModule } from '../personal-details/personal-details.module';
import { TodoListModule } from '../todo-list/todo-list.module';
import { DietPlannerModule } from '../diet-planner/diet-planner.module';

@NgModule({
  declarations: [
    ResidentProfileComponent
  ],
  imports: [
    CommonModule,
    ResidentProfileRoutingModule,
    PersonalDetailsModule,
    FluidAssessmentModule,
    DietPlannerModule,
    FormsModule,
    AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
    TodoListModule,
  ]
})
export class ResidentProfileModule { }
