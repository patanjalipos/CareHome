import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-assessment-my-epilepsy',
  templateUrl: './care-assessment-my-epilepsy.component.html',
  styleUrls: ['./care-assessment-my-epilepsy.component.scss']
})
export class CareAssessmentMyEpilepsyComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
