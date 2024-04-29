import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-risk-on-the-move',
  templateUrl: './risk-on-the-move.component.html',
  styleUrls: ['./risk-on-the-move.component.scss']
})
export class RiskOnTheMoveComponent implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
