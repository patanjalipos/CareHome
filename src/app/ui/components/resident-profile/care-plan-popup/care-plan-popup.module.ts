import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CarePlanPopupRoutingModule } from './care-plan-popup-routing.module';
import { CarePlanPopupComponent } from './care-plan-popup.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    CarePlanPopupComponent
  ],
  imports: [
    CommonModule,
    CarePlanPopupRoutingModule,
    InputTextareaModule,
    DropdownModule,
    ButtonModule
  ],
  exports:[CarePlanPopupComponent]
})
export class CarePlanPopupModule { }
