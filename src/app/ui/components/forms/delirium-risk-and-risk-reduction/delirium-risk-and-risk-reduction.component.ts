import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delirium-risk-and-risk-reduction',
  templateUrl: './delirium-risk-and-risk-reduction.component.html',
  styleUrls: ['./delirium-risk-and-risk-reduction.component.scss']
})
export class DeliriumRiskAndRiskReductionComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
