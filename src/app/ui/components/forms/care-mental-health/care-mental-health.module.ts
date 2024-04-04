import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareMentalHealthRoutingModule } from './care-mental-health-routing.module';
import { CareMentalHealthComponent } from '../care-mental-health/care-mental-health.component';


@NgModule({
  declarations: [
    CareMentalHealthComponent
  ],
  imports: [
    CommonModule,
    CareMentalHealthRoutingModule
  ]
})
export class CareMentalHealthModule { }
