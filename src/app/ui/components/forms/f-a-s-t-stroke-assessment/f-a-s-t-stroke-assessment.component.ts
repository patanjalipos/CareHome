import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-f-a-s-t-stroke-assessment',
  templateUrl: './f-a-s-t-stroke-assessment.component.html',
  styleUrls: ['./f-a-s-t-stroke-assessment.component.scss']
})
export class FASTStrokeAssessmentComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
