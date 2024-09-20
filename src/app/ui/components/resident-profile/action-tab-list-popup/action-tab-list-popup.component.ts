import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-action-tab-list-popup',
  templateUrl: './action-tab-list-popup.component.html',
  styleUrls: ['./action-tab-list-popup.component.scss']
})
export class ActionTabListPopupComponent extends AppComponentBase implements OnInit {

  @Input() ActionTakenData: any = <any>{};
  @Output() EmitUpdatePopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() EmitEditPopup: EventEmitter<any> = new EventEmitter<any>();

  imageSrc: any;
  customDateFormat = CustomDateFormat;
  buttonCheck: number;
  statementType: string = null;
  popupCheck: boolean = false;
  actionType: string;
  formMasterId: string;

  FormTypes = FormTypes;

  constructor(private _UtilityService: UtilityService, private _UserService: UserService) {
    super();
   }

  ngOnInit(): void {

    this.formMasterId = this.FormTypes.BodyMappingRecord;
    this.actionType = 'custom';
    this.ActionTakenData.userList.unshift({ UserId: null, FullName: '-- No Selection --' });
    if (this.ActionTakenData.residentDetails.ProfileImage != undefined && this.ActionTakenData.residentDetails.ProfileImage != null && this.ActionTakenData.residentDetails.ProfileImage != '') {
      var imageFormat = this._UtilityService.getFileExtension(this.ActionTakenData.residentDetails.ProfileImage);
      this.imageSrc = "data:image/" + imageFormat + ";base64," + this.ActionTakenData.residentDetails.ProfileImage;
    }
    else {
      this.imageSrc = "";
    }

    this.ActionTakenData.Date = new Date(this.ActionTakenData.Date);
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

  PopupClose() {
    this.EmitUpdatePopup.emit(false);
  }

  ButtonChange(value: number) {
    this.buttonCheck = value;
    if(value == 1) {
      this.EmitUpdatePopup.emit(true);
    }
  }

  Save(value: number) {
    
    if(value == 0) {
      if(this.ActionTakenData.isPrioritiseStatus) {
        this.statementType = 'prioritised';
        }
      else {
        this.statementType = 'removed as prioritised';
      }
      console.log('ACTION TAKEN DATA',this.ActionTakenData);
    }
    else if(value == 1) {
      if(this.ActionTakenData.assignedUser != null) {
        this.statementType = 'assigned a user';
      }
      else {
        this.statementType = 'removed assigned user';
      }
    }
    else if(value == 2) {
      if(this.ActionTakenData.notRequiredReason) {
        this.statementType = 'marked as not required';
      }
      else {
        this.statementType = 'completed';
      }
    }
    else {
      this.statementType = 'edited';
    }
    this.ActionTakenData.LastEnteredBy = localStorage.getItem('userId');

    const objectBody: any = {
      StatementType: this.statementType,
      BodyMappingForm: this.ActionTakenData
    }
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserService
      .UpdateActionListById(objectBody)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            if(value == 2) {
              this.EmitUpdatePopup.emit(true);
            }
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

  Edit(check:boolean) {
    this.EmitEditPopup.emit(check);
    this.popupCheck = true;
  }

  Cancel() {
    this.popupCheck = false;
    this.buttonCheck = null;
  }

}
