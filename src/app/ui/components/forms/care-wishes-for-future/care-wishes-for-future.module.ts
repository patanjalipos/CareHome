import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareWishesForFutureRoutingModule } from './care-wishes-for-future-routing.module';
import { CareWishesForFutureComponent } from './care-wishes-for-future.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    CareWishesForFutureComponent
  ],
  imports: [
    CommonModule,
    CareWishesForFutureRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[CareWishesForFutureComponent]
})
export class CareWishesForFutureModule { }
