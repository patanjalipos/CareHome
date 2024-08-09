import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-vision-assessment',
  templateUrl: './care-vision-assessment.component.html',
  styleUrls: ['./care-vision-assessment.component.scss']
})
export class CareVisionAssessmentComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
