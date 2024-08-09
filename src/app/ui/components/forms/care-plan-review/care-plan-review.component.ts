import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-plan-review',
  templateUrl: './care-plan-review.component.html',
  styleUrls: ['./care-plan-review.component.scss']
})
export class CarePlanReviewComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
