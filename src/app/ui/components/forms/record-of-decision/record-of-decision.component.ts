import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-record-of-decision',
  templateUrl: './record-of-decision.component.html',
  styleUrls: ['./record-of-decision.component.scss']
})
export class RecordOfDecisionComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
