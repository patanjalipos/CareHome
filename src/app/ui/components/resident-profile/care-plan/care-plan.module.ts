import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarePlanRoutingModule } from './care-plan-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { CarePlanComponent } from './care-plan.component';
import { CarePlanPopupModule } from '../care-plan-popup/care-plan-popup.module';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [CarePlanComponent],
  imports: [
    CommonModule,
    CarePlanRoutingModule,
    CarePlanPopupModule,
    ButtonModule,
    DialogModule,
    AccordionModule],
  exports: [CarePlanComponent]
})
export class CarePlanModule { }
