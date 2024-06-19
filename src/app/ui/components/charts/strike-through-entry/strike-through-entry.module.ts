import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrikeThroughEntryRoutingModule } from './strike-through-entry-routing.module';
import { DialogModule } from 'primeng/dialog';
import { StrikeThroughEntryComponent } from './strike-through-entry.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [StrikeThroughEntryComponent],
  imports: [
    CommonModule,
    StrikeThroughEntryRoutingModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  exports:[StrikeThroughEntryComponent]
})
export class StrikeThroughEntryModule { }
