import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-risk-tool-safe-working',
  templateUrl: './risk-tool-safe-working.component.html',
  styleUrls: ['./risk-tool-safe-working.component.scss']
})
export class RiskToolSafeWorkingComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
