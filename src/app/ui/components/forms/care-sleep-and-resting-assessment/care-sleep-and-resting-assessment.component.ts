import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-sleep-and-resting-assessment',
  templateUrl: './care-sleep-and-resting-assessment.component.html',
  styleUrls: ['./care-sleep-and-resting-assessment.component.scss']
})
export class CareSleepAndRestingAssessmentComponent implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
