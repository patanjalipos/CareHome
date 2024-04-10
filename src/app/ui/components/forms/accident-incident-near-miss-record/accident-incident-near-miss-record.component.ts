import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-accident-incident-near-miss-record',
  templateUrl: './accident-incident-near-miss-record.component.html',
  styleUrls: ['./accident-incident-near-miss-record.component.scss']
})
export class AccidentIncidentNearMissRecordComponent implements OnInit {

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }
  
}
