import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiskWaterlowPressureUlcerRoutingModule } from './risk-waterlow-pressure-ulcer-routing.module';
import { RiskWaterlowPressureUlcerComponent } from './risk-waterlow-pressure-ulcer.component';


@NgModule({
  declarations: [
    RiskWaterlowPressureUlcerComponent
  ],
  imports: [
    CommonModule,
    RiskWaterlowPressureUlcerRoutingModule
  ]
})
export class RiskWaterlowPressureUlcerModule { }
