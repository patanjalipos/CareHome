import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConnectingAndCommunicatingRoutingModule } from './connecting-and-communicating-routing.module';
import { ConnectingAndCommunicatingComponent } from './connecting-and-communicating.component';


@NgModule({
  declarations: [
    ConnectingAndCommunicatingComponent
  ],
  imports: [
    CommonModule,
    ConnectingAndCommunicatingRoutingModule
  ]
})
export class ConnectingAndCommunicatingModule { }
