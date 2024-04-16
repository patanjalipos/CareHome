import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-assessment-trial-with-out-cathete',
  templateUrl: './care-assessment-trial-with-out-cathete.component.html',
  styleUrls: ['./care-assessment-trial-with-out-cathete.component.scss']
})
export class CareAssessmentTrialWithOutCatheteComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
