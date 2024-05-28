import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-behaviour-chart',
  templateUrl: './behaviour-chart.component.html',
  styleUrls: ['./behaviour-chart.component.scss']
})
export class BehaviourChartComponent implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
