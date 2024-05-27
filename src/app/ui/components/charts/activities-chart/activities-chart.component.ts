import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
    selector: 'app-activities-chart',
    templateUrl: './activities-chart.component.html',
    styleUrls: ['./activities-chart.component.scss'],
})
export class ActivitiesChartComponent extends AppComponentBase implements OnInit {

    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
      super();
    }

    ngOnInit(): void {}
}
