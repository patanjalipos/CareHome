import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-body-mapping-record',
  templateUrl: './body-mapping-record.component.html',
  styleUrls: ['./body-mapping-record.component.scss']
})
export class BodyMappingRecordComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
