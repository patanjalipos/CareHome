import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-action-taken-popup',
  templateUrl: './action-taken-popup.component.html',
  styleUrls: ['./action-taken-popup.component.scss']
})
export class ActionTakenPopupComponent extends AppComponentBase implements OnInit {

  @Input() ActionTakenData:any = <any>{};
  @Output() ActionTakenCheck:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() EmitUpdateAlert: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _UtilityService: UtilityService, private _UserService: UserService) {
    super();
   }

  ngOnInit(): void {
  }

  AlertActionTakenCheck(actionCheck: boolean) {

    this.ActionTakenData.isActionTaken = actionCheck;
    const objectBody: any = this.ActionTakenData
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserService
        .AlertActionTaken(objectBody)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                  this.ActionTakenCheck.emit(false);
                  console.log('DATA',data);
                  
                  this.EmitUpdateAlert.emit(data.actionResult.value);
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
}
