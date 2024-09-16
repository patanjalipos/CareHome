import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../service/constants.service';



@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {

  isMissed: boolean=true;
  isCurrent: boolean;
  isUpcomming: boolean;
  isCompleted: boolean;
  isAlert: boolean;
  isManageActionSchedules: boolean;

  constructor(
    private _ConstantServices: ConstantsService,
  ) {
    this._ConstantServices.ActiveMenuName = "Action's";
   }

  ngOnInit(): void {
  }

  showComponent(tabName) {
    if (tabName == 'Missed') {
      this.isMissed = true;
      this.isManageActionSchedules = false;
      this.isCompleted = false;
      this.isUpcomming = false;
      this.isCurrent = false;
      this.isAlert=false;
    }
    if (tabName == 'Current') {
      this.isMissed = false;
      this.isManageActionSchedules = false;
      this.isCompleted = false;
      this.isUpcomming = false;
      this.isCurrent = true;
      this.isAlert=false;
    }
    if (tabName == 'Upcomming') {
      this.isMissed = false;
      this.isManageActionSchedules = false;
      this.isCompleted = false;
      this.isUpcomming = true;
      this.isCurrent = false;
      this.isAlert=false;
    }
    if (tabName == 'Completed') {
      this.isCompleted = true;
      this.isUpcomming = false;
      this.isManageActionSchedules = false;
      this.isCurrent = false;
      this.isMissed = false;
      this.isAlert=false;
    }
    if (tabName == 'Alert') {
      this.isManageActionSchedules = false;
      this.isCompleted = false;
      this.isAlert=true;
      this.isUpcomming = false;
      this.isCurrent = false;
      this.isMissed = false;
    }
    if (tabName == 'Manage action schedules') {
      this.isManageActionSchedules = true;
      this.isCompleted = false;
      this.isUpcomming = false;
      this.isAlert=false;
      this.isCurrent = false;
      this.isMissed = false;
    }

  }

}
