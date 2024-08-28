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

  imageSrc: any;
  
  constructor(private _UtilityService: UtilityService, private _UserService: UserService) {
    super();
  }
  
  ngOnInit(): void {
    console.log("main data");
    console.log(this.ActionTakenData);
    
    if (this.ActionTakenData.residentDetails.ProfileImage != undefined && this.ActionTakenData.residentDetails.ProfileImage != null && this.ActionTakenData.residentDetails.ProfileImage != '') {
      var imageFormat = this._UtilityService.getFileExtension(this.ActionTakenData.residentDetails.ProfileImage);
      this.imageSrc = "data:image/" + imageFormat + ";base64," + this.ActionTakenData.residentDetails.ProfileImage;
    }
    else {
      this.imageSrc = "";
    }
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

   calculateAge(birthday): number {
    if (birthday != undefined) {
      var curdate = new Date();
      var dob = new Date(birthday);
      var ageyear = curdate.getFullYear() - dob.getFullYear();
      var agemonth = curdate.getMonth() - dob.getMonth();
      var ageday = curdate.getDate() - dob.getDate();
      if (agemonth <= 0) {
        ageyear--;
        agemonth = (12 + agemonth);
      }
      if (curdate.getDate() < dob.getDate()) {
        agemonth--;
        ageday = 30 + ageday;
      } if (agemonth == 12) {
        ageyear = ageyear + 1;
        agemonth = 0;
      }
      return ageyear;
    }
    else
      return 0;
  }
}

