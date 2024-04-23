import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-risk-multifactorial-falls-risk',
  templateUrl: './risk-multifactorial-falls-risk.component.html',
  styleUrls: ['./risk-multifactorial-falls-risk.component.scss']
})
export class RiskMultifactorialFallsRiskComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
