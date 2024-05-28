import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from "primeng/inputtext";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ResidentProgressnotesComponent } from './resident-progressnotes.component';
import { ResidentProgressnotesRoutingModule } from './resident-progressnotes-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    ResidentProgressnotesComponent
  ],
  imports: [
    CommonModule,
    ResidentProgressnotesRoutingModule,
    InputTextModule,
    CalendarModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    TableModule,
    AccordionModule,
    RadioButtonModule,
    CheckboxModule,
    TieredMenuModule,
    DialogModule,
  ],
  exports:[ResidentProgressnotesComponent]
})
export class ResidentProgressnotesModule { }
