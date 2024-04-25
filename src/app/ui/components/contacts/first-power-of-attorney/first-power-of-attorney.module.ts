import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstPowerOfAttorneyRoutingModule } from './first-power-of-attorney-routing.module';
import { FirstPowerOfAttorneyComponent } from './first-power-of-attorney.component';

import {FormsModule} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    FirstPowerOfAttorneyComponent
  ],
  imports: [
    CommonModule,
    FirstPowerOfAttorneyRoutingModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule
  ],
  exports:[FirstPowerOfAttorneyComponent]
})
export class FirstPowerOfAttorneyModule { }
