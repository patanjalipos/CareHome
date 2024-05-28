import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-infection-chart',
  templateUrl: './infection-chart.component.html',
  styleUrls: ['./infection-chart.component.scss']
})
export class InfectionChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

}
