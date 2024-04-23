import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-covid-acute-care-plan',
  templateUrl: './covid-acute-care-plan.component.html',
  styleUrls: ['./covid-acute-care-plan.component.scss']
})
export class CovidAcuteCarePlanComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
