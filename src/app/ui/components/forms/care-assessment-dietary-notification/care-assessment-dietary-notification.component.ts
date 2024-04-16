import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-assessment-dietary-notification',
  templateUrl: './care-assessment-dietary-notification.component.html',
  styleUrls: ['./care-assessment-dietary-notification.component.scss']
})
export class CareAssessmentDietaryNotificationComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
