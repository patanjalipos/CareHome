import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliriumRiskAndRiskReductionRoutingModule } from './delirium-risk-and-risk-reduction-routing.module';
import { DeliriumRiskAndRiskReductionComponent } from './delirium-risk-and-risk-reduction.component';


@NgModule({
  declarations: [
    DeliriumRiskAndRiskReductionComponent
  ],
  imports: [
    CommonModule,
    DeliriumRiskAndRiskReductionRoutingModule
  ]
})
export class DeliriumRiskAndRiskReductionModule { }
