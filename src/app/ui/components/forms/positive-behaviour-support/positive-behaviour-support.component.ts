import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-positive-behaviour-support',
  templateUrl: './positive-behaviour-support.component.html',
  styleUrls: ['./positive-behaviour-support.component.scss']
})
export class PositiveBehaviourSupportComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
