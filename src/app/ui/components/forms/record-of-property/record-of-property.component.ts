import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-record-of-property',
  templateUrl: './record-of-property.component.html',
  styleUrls: ['./record-of-property.component.scss']
})
export class RecordOfPropertyComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
