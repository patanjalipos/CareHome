import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskOnTheMoveRoutingModule } from './risk-on-the-move-routing.module';
import { RiskOnTheMoveComponent } from './risk-on-the-move.component';


@NgModule({
  declarations: [
    RiskOnTheMoveComponent
  ],
  imports: [
    CommonModule,
    RiskOnTheMoveRoutingModule
  ]
})
export class RiskOnTheMoveModule { }
