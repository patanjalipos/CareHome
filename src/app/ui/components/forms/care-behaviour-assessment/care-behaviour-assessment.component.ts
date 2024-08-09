import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-behaviour-assessment',
  templateUrl: './care-behaviour-assessment.component.html',
  styleUrls: ['./care-behaviour-assessment.component.scss']
})
export class CareBehaviourAssessmentComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
