import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecondPowerOfAttorneyRoutingModule } from './second-power-of-attorney-routing.module';
import { SecondPowerOfAttorneyComponent } from './second-power-of-attorney.component';

import {FormsModule} from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    SecondPowerOfAttorneyComponent
  ],
  imports: [
    CommonModule,
    SecondPowerOfAttorneyRoutingModule,
    FormsModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule
  ],
  exports:[SecondPowerOfAttorneyComponent]
})
export class SecondPowerOfAttorneyModule { }
