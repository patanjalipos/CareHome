import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
@Component({
  selector: 'app-fluid-combined-chart',
  templateUrl: './fluid-combined-chart.component.html',
  styleUrls: ['./fluid-combined-chart.component.scss']
})
export class FluidCombinedChartComponent extends AppComponentBase implements OnInit {

  constructor() {
    super();
   }

  ngOnInit(): void {
  }

}
