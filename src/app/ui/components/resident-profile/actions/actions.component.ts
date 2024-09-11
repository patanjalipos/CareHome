import { Component, Input, OnInit } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { AppComponentBase } from 'src/app/app-component-base';
import { CustomDateFormat } from 'src/app/ui/service/constants.service';
import { ResidentProfileService } from '../resident-profile.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent extends AppComponentBase implements OnInit {
  
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  @Input() residentadmissiondetails: any = <any>{};

  data:any = <any>{};
  rangeDates: Date[] = [];
  customDateFormat = CustomDateFormat;
  actionPage: string = '';

  constructor(private sharedStateService: ResidentProfileService) {super(); }

  ngOnInit(): void {
    this.data = [{
      action:"Care Skin Assessment",
      assignedUser:"Parth",
      dueDate:"May 30, 2024"
    }]
  }

  dateRangeChange(calendar: Calendar) {
    this.sharedStateService.tranferValu(true);
    if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
        calendar.overlayVisible = false;
        //this.GetDailyVitalAlertLog();
    }

}

actionPageChange(value:number) {
  if(value == 1) {
    this.actionPage = 'Missed';
  }
  else if(value == 2) {
    this.actionPage = 'Current';
  }
  else if(value == 3) {
    this.actionPage = 'Upcoming';
  }
  else {
    this.actionPage = 'Completed';
  }
}

}
