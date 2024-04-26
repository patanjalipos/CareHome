import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-risk-tool-for-use-of-wheelchair',
  templateUrl: './risk-tool-for-use-of-wheelchair.component.html',
  styleUrls: ['./risk-tool-for-use-of-wheelchair.component.scss']
})
export class RiskToolForUseOfWheelchairComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
