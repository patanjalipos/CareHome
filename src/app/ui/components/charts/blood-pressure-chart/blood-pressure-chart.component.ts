import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-blood-pressure-chart',
  templateUrl: './blood-pressure-chart.component.html',
  styleUrls: ['./blood-pressure-chart.component.scss']
})
export class BloodPressureChartComponent implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
