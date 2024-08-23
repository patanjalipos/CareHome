import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionTakenPopupRoutingModule } from './action-taken-popup-routing.module';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ActionTakenPopupComponent } from './action-taken-popup.component';


@NgModule({
  declarations: [ActionTakenPopupComponent],
  imports: [
    CommonModule,
    ActionTakenPopupRoutingModule,
    FormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule
  ],
  exports:[ActionTakenPopupComponent]
})
export class ActionTakenPopupModule { }
