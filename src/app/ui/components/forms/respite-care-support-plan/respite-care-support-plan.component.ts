import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-respite-care-support-plan',
  templateUrl: './respite-care-support-plan.component.html',
  styleUrls: ['./respite-care-support-plan.component.scss']
})
export class RespiteCareSupportPlanComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
