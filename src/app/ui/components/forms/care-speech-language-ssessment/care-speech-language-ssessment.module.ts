import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareSpeechLanguageSsessmentRoutingModule } from './care-speech-language-ssessment-routing.module';
import { CareSpeechLanguageSsessmentComponent } from './care-speech-language-ssessment.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@NgModule({
  declarations: [
    CareSpeechLanguageSsessmentComponent
  ],
  imports: [
    CommonModule,
    CareSpeechLanguageSsessmentRoutingModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TriStateCheckboxModule
  ]
})
export class CareSpeechLanguageSsessmentModule { }
