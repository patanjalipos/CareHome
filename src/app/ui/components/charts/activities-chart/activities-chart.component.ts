import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { OptionService } from 'src/app/ui/service/option.service';

@Component({
  selector: 'app-activities-chart',
  templateUrl: './activities-chart.component.html',
  styleUrls: ['./activities-chart.component.scss'],
})
export class ActivitiesChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  //Static Options
  stLstYesNoOptions: any[] = [];
  stLstAttendanceOptions: any[] = [];

  constructor(private optionService: OptionService ) {
    super();
  }

  ngOnInit(): void { 

    this.optionService.getstLstYesNoOptions().subscribe(data => {
      this.stLstYesNoOptions = data;
    });

    this.optionService.getstLstAttendaceOptions().subscribe(data => {
      this.stLstAttendanceOptions = data;
    });

  }

  saveAsUnfinished() { }

  completeForm() { }

  SaveAsPDF() { }
}
