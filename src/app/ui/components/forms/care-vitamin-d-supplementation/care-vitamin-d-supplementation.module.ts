import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareVitaminDSupplementationRoutingModule } from './care-vitamin-d-supplementation-routing.module';
import { CareVitaminDSupplementationComponent } from './care-vitamin-d-supplementation.component';


@NgModule({
  declarations: [
    CareVitaminDSupplementationComponent
  ],
  imports: [
    CommonModule,
    CareVitaminDSupplementationRoutingModule
  ]
})
export class CareVitaminDSupplementationModule { }
