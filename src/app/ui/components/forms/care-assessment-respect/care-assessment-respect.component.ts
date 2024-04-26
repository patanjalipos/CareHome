import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-assessment-respect',
  templateUrl: './care-assessment-respect.component.html',
  styleUrls: ['./care-assessment-respect.component.scss']
})
export class CareAssessmentRespectComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
