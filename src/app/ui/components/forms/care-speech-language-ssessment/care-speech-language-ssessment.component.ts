import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-speech-language-ssessment',
  templateUrl: './care-speech-language-ssessment.component.html',
  styleUrls: ['./care-speech-language-ssessment.component.scss']
})
export class CareSpeechLanguageSsessmentComponent implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
