import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeManagersSettlingRoutingModule } from './home-managers-settling-routing.module';
import { HomeManagersSettlingComponent } from './home-managers-settling.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
    HomeManagersSettlingComponent
  ],
  imports: [
    CommonModule,
    HomeManagersSettlingRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    CheckboxModule
  ],
  exports:[HomeManagersSettlingComponent]
})
export class HomeManagersSettlingModule { }
