import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareContinencePromotionRoutingModule } from './care-continence-promotion-routing.module';
import { CareContinencePromotionComponent } from './care-continence-promotion.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    CareContinencePromotionComponent
  ],
  imports: [
    CommonModule,
    CareContinencePromotionRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ],
  exports:[CareContinencePromotionComponent]
})
export class CareContinencePromotionModule { }
