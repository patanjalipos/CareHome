
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';

import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';

import { UtilityService } from 'src/app/utility/utility.service';
import { PromotingWellbeingAtHomeService } from './promoting-wellbeing-at-home.service';

@Component({
  selector: 'app-promoting-wellbeing-at-home',
  templateUrl: './promoting-wellbeing-at-home.component.html',
  styleUrls: ['./promoting-wellbeing-at-home.component.scss']
})
export class PromotingWellbeingAtHomeComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  PromotingWellbeingAtHomeFormData: any = <any>{};

  constructor(private _ConstantServices: ConstantsService,
    private route: ActivatedRoute,
    private _UtilityService: UtilityService,
    private _promotingWellbeingAtHome: PromotingWellbeingAtHomeService
  ) {

    super();

    this._ConstantServices.ActiveMenuName = "Promoting Well being At Home";
    this.loginId = localStorage.getItem('userId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    
    if (this.preSelectedFormData.selectedFormID != null) {
      this.PromotingWellbeingAtHomeFormData = <any>{};
      this.GetPromotingWellbeingAtHomeDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  ngOnInit(): void {

    this.userId = this.preSelectedFormData.userId;
    this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

    this.isEditable = this.preSelectedFormData.isEditable;
    if (this.preSelectedFormData.selectedFormID != null) {
      this.PromotingWellbeingAtHomeFormData = <any>{};
      this.GetPromotingWellbeingAtHomeDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  GetPromotingWellbeingAtHomeDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._promotingWellbeingAtHome
      .GetPromotingWellbeingAtHomeDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};

        
            this.PromotingWellbeingAtHomeFormData = tdata;
            // this.PromotingWellbeingAtHomeFormData.DateOfComplete = this.datePipe.transform(this.PromotingWellbeingAtHomeFormData.DateOfComplete, 'MM/dd/yyyy')

          } else {
            this.PromotingWellbeingAtHomeFormData = {};
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }




  saveAsUnfinished() {

    this.PromotingWellbeingAtHomeFormData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.PromotingWellbeingAtHomeFormData.isFormCompleted = true;
    this.Save();
  }

  Save() {

    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.PromotingWellbeingAtHomeFormData.userId = this.userId;
      this.PromotingWellbeingAtHomeFormData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.PromotingWellbeingAtHomeFormData.StartedBy = this.loginId;
      this.PromotingWellbeingAtHomeFormData.LastEnteredBy = this.loginId;
     // this.PromotingWellbeingAtHomeFormData.DateOfComplete = this.datePipe.transform(this.PromotingWellbeingAtHomeFormData.DateOfComplete, 'yyyy-MM-dd');

      const objectBody: any = {
        StatementType: this.StatementType,
        promotingWellbeingAtHomeForm: this.PromotingWellbeingAtHomeFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._promotingWellbeingAtHome
        .AddInsertUpdatePromotingWellbeingAtHomeFormData(objectBody)
        .subscribe({
          next: (data) => {
            this._UtilityService.hideSpinner();
            if (data.actionResult.success == true) {
              this.EmitUpdateForm.emit(true);
              this._UtilityService.showSuccessAlert(
                data.actionResult.errMsg
              );
            }
            else
              this._UtilityService.showWarningAlert(
                data.actionResult.errMsg
              );
          },
          error: (e) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(e.message);
          },
        });
    } else {
      this._UtilityService.showWarningAlert(
        'Promoting Well Being at home.'
      );
    }

  }


  ResetModel() {
    this.isEditable = true;
    this.PromotingWellbeingAtHomeFormData = <any>{};
    this.StatementType = 'Insert';
  }

  SaveAsPDF() { }

}
