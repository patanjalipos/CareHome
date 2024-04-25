import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-assessment-life-history',
  templateUrl: './care-assessment-life-history.component.html',
  styleUrls: ['./care-assessment-life-history.component.scss']
})
export class CareAssessmentLifeHistoryComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
