import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-covid-vaccination-record',
  templateUrl: './covid-vaccination-record.component.html',
  styleUrls: ['./covid-vaccination-record.component.scss']
})
export class CovidVaccinationRecordComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
