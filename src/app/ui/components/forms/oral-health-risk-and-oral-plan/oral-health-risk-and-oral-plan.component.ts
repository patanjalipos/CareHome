import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-oral-health-risk-and-oral-plan',
  templateUrl: './oral-health-risk-and-oral-plan.component.html',
  styleUrls: ['./oral-health-risk-and-oral-plan.component.scss']
})
export class OralHealthRiskAndOralPlanComponent implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
