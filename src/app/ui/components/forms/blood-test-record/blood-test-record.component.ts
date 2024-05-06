import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blood-test-record',
  templateUrl: './blood-test-record.component.html',
  styleUrls: ['./blood-test-record.component.scss']
})
export class BloodTestRecordComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
  ngOnInit(): void {
  }

}
