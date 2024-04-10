import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotingWellbeingAtHomeRoutingModule } from './promoting-wellbeing-at-home-routing.module';
import { PromotingWellbeingAtHomeComponent } from './promoting-wellbeing-at-home.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    PromotingWellbeingAtHomeComponent
  ],
  imports: [
    CommonModule,
    PromotingWellbeingAtHomeRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class PromotingWellbeingAtHomeModule { }
