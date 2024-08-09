import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-wound-chart',
  templateUrl: './wound-chart.component.html',
  styleUrls: ['./wound-chart.component.scss']
})
export class WoundChartComponent  implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
