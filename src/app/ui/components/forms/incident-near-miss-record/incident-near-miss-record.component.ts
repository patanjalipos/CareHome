import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incident-near-miss-record',
  templateUrl: './incident-near-miss-record.component.html',
  styleUrls: ['./incident-near-miss-record.component.scss']
})
export class IncidentNearMissRecordComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
