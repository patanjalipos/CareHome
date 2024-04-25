import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-outings-risk-assessment',
  templateUrl: './outings-risk-assessment.component.html',
  styleUrls: ['./outings-risk-assessment.component.scss']
})
export class OutingsRiskAssessmentComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
