import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-painchek-chart',
  templateUrl: './painchek-chart.component.html',
  styleUrls: ['./painchek-chart.component.scss']
})
export class PainchekChartComponent implements OnInit {
  
  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
