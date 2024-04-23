import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-skin-assessment',
  templateUrl: './care-skin-assessment.component.html',
  styleUrls: ['./care-skin-assessment.component.scss']
})
export class CareSkinAssessmentComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
