import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ActionsComponent } from './actions.component';


@NgModule({
  declarations: [ActionsComponent],
  imports: [
    CommonModule,
    ActionsRoutingModule
  ],
  exports:[ActionsComponent]
})
export class ActionsModule { }
