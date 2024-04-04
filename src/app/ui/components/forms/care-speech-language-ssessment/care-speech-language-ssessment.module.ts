import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareSpeechLanguageSsessmentRoutingModule } from './care-speech-language-ssessment-routing.module';
import { CareSpeechLanguageSsessmentComponent } from './care-speech-language-ssessment.component';


@NgModule({
  declarations: [
    CareSpeechLanguageSsessmentComponent
  ],
  imports: [
    CommonModule,
    CareSpeechLanguageSsessmentRoutingModule
  ]
})
export class CareSpeechLanguageSsessmentModule { }
