import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-enteral-feeding-chart',
  templateUrl: './enteral-feeding-chart.component.html',
  styleUrls: ['./enteral-feeding-chart.component.scss']
})
export class EnteralFeedingChartComponent implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
