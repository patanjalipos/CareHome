import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareSignsOfIllBeingRoutingModule } from './care-signs-of-ill-being-routing.module';
import { CareSignsOfIllBeingComponent } from '../care-signs-of-ill-being/care-signs-of-ill-being.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CareSignsOfIllBeingComponent
  ],
  imports: [
    CommonModule,
    CareSignsOfIllBeingRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[CareSignsOfIllBeingComponent]
})
export class CareSignsOfIllBeingModule { }
