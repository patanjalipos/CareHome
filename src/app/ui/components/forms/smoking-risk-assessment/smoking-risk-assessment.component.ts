import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-smoking-risk-assessment',
  templateUrl: './smoking-risk-assessment.component.html',
  styleUrls: ['./smoking-risk-assessment.component.scss']
})
export class SmokingRiskAssessmentComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
