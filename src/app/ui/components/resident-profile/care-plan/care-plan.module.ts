import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarePlanRoutingModule } from './care-plan-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { CarePlanComponent } from './care-plan.component';



@NgModule({
  declarations: [CarePlanComponent],
  imports: [
    CommonModule,
    CarePlanRoutingModule,
    ButtonModule,
    AccordionModule],
  exports: [CarePlanComponent]
})
export class CarePlanModule { }
