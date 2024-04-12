import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-risk-tool-bed-rails-pack',
  templateUrl: './risk-tool-bed-rails-pack.component.html',
  styleUrls: ['./risk-tool-bed-rails-pack.component.scss']
})
export class RiskToolBedRailsPackComponent implements OnInit {

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
