import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { ActivityChartService } from '../activities-chart/activity-chart.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-strike-through-entry',
  templateUrl: './strike-through-entry.component.html',
  styleUrls: ['./strike-through-entry.component.scss']
})
export class StrikeThroughEntryComponent extends AppComponentBase implements OnInit {

  @Input() StrikeThroughData:any = <any>{};
  @Output() StrikeThroughCheck:EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor(private _UtilityService: UtilityService, private _UserService: UserService) {
    super();
   }

  ngOnInit(): void {
  }

  Submit() {
  const objectBody: any = this.StrikeThroughData

  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._UserService
      .ChartStrikeThrough(objectBody)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                this.StrikeThroughCheck.emit(false);
                  // this.ResetModel();
                  this._UtilityService.showSuccessAlert(
                      data.actionResult.errMsg
                  );
              } else
                  this._UtilityService.showWarningAlert(
                      data.actionResult.errMsg
                  );
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
 } 

 Cancel() {
  this.StrikeThroughCheck.emit(false);
}

}
