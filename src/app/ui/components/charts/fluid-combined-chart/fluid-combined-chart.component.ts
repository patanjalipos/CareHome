import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
@Component({
  selector: 'app-fluid-combined-chart',
  templateUrl: './fluid-combined-chart.component.html',
  styleUrls: ['./fluid-combined-chart.component.scss']
})
export class FluidCombinedChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
