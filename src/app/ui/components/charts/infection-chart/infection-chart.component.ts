import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-infection-chart',
  templateUrl: './infection-chart.component.html',
  styleUrls: ['./infection-chart.component.scss']
})
export class InfectionChartComponent extends AppComponentBase implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
