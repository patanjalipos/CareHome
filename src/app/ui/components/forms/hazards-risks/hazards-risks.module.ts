import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HazardsRisksRoutingModule } from './hazards-risks-routing.module';
import { HazardsRisksComponent } from './hazards-risks.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    HazardsRisksComponent
  ],
  imports: [
    CommonModule,
    HazardsRisksRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[HazardsRisksComponent]
})
export class HazardsRisksModule { }
