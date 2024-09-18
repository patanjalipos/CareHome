import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { AppComponentBase } from 'src/app/app-component-base';
import { CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { ResidentProfileService } from '../resident-profile.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { ActionsService } from './actions.service';
import { Router } from '@angular/router';

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
  BodyMappingActionData: any[] = [];
  rangeDates: Date[] = [];
  customDateFormat = CustomDateFormat;
  actionPage: string = 'Current';
  selectedFormMasterId: string;
  ShowChildComponent: boolean = false;
  FormTypes = FormTypes;
  selectedFormData: any;
  isShowActionTakenPopup: boolean = false;
  iconCheck: boolean = false;
  dialogHeader: string = 'View Action';

  constructor(private sharedStateService: ResidentProfileService,
              private _UtilityService: UtilityService,
              private _actionService: ActionsService,
              private router: Router
  ) {super(); }

  ngOnInit(): void {
    this.data = [{
      action:"Care Skin Assessment",
      assignedUser:"Parth",
      dueDate:"May 30, 2024"
    }]
  this.GetBodyMappingFormActionList(FormTypes.BodyMappingRecord,this.admissionid,'Current');

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

  this.ShowChildComponent = false;

  this.GetBodyMappingFormActionList(FormTypes.BodyMappingRecord, this.admissionid, this.actionPage);
}

GetBodyMappingFormActionList(formId: string, residentAdmissionInfoId: string, actionStatus: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._actionService
      .GetBodyMappingFormActionList(formId, residentAdmissionInfoId, actionStatus)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                var tdata = data.actionResult.result;
                  tdata = tdata ? tdata : [];
                  this.BodyMappingActionData = tdata;
                  console.log('DATA',this.BodyMappingActionData);
              } else {
                  this.BodyMappingActionData = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

openForm(selectedFormData: any = <any>{}, isEditable = true) {
  console.log('Selected DETAILS',selectedFormData);
  
if(selectedFormData.FormId != null && this.actionPage != 'Upcoming') {
  this.selectedFormMasterId = selectedFormData.FormId;
  this.selectedFormData = {
    BodyMappingRecordId: selectedFormData.BodyMappingRecordId,
    formId: selectedFormData.FormId,
    userId: selectedFormData.UserId,
    residentAdmissionInfoId: selectedFormData.ResidentAdmissionInfoId,
    isEditable: isEditable,
    Date: selectedFormData.Date,
    residentDetails: this.residentadmissiondetails,
    actionStatus: this.actionPage,
    completionAfterDueDateReason: selectedFormData.CompletionAfterDueDateReason,
    notRequiredReason: selectedFormData.NotRequiredReason,
    isPrioritiseStatus: selectedFormData.PrioritiseStatus,
    assignedUser: selectedFormData.AssignedUser,
    assignedUserName: selectedFormData.AssignedUserName,
    userList: selectedFormData.UserList,
    formList: selectedFormData.FormList,
    startedBy: selectedFormData.StartedBy,
    startedByName: selectedFormData.StartedByName,
    startedOn: selectedFormData.StartedOn,
    lastEnteredBy: selectedFormData.LastEnteredBy,
    lastEnteredByName: selectedFormData.LastEnteredByName,
    lastEnteredOn: selectedFormData.LastEnteredOn
  };
  this.isShowActionTakenPopup = true;
}
}

// this is for form 
EmitUpdateForm(event) {
  this.ShowChildComponent = false;
  this.GetBodyMappingFormActionList(FormTypes.BodyMappingRecord, this.admissionid, this.actionPage);
}

// this is for popup
PopupStatus(event) {
this.isShowActionTakenPopup = false;
if(event == true) {
  this.ShowChildComponent = true;
}
this.GetBodyMappingFormActionList(FormTypes.BodyMappingRecord, this.admissionid, this.actionPage);
}

EditPopup(event) {
if(event == true) {
  this.dialogHeader = 'Edit Action';
}
}

}
