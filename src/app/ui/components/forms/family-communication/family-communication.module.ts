import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FamilyCommunicationRoutingModule } from './family-communication-routing.module';
import { FamilyCommunicationComponent } from './family-communication.component';


@NgModule({
  declarations: [
    FamilyCommunicationComponent
  ],
  imports: [
    CommonModule,
    FamilyCommunicationRoutingModule
  ]
})
export class FamilyCommunicationModule { }
