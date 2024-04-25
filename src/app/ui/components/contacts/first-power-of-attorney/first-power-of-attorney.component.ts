import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';

@Component({
  selector: 'app-first-power-of-attorney',
  templateUrl: './first-power-of-attorney.component.html',
  styleUrls: ['./first-power-of-attorney.component.scss']
})
export class FirstPowerOfAttorneyComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  loginId: any = localStorage.getItem('userId');
  Contact: any = <any>{};
  lstAttorneyTypeMaster: any[] = [];
  isEditable: boolean = true;
  constructor(private _ConstantServices: ConstantsService,
    private _MasterServices: MasterService,
    private _UtilityService: UtilityService,
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.isEditable = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userid != null && this.admissionid != null) {
      this.GetAttorneyTypeMaster();
      this.GetContactFirstAttorneyById(this.admissionid);
    }
  }

  GetAttorneyTypeMaster() {
    this.unsubscribe.add = this._MasterServices.GetAttorneyTypeMaster(true).subscribe({
      next: (data) => {
        if (data.actionResult.success == true) {
          var tdata = JSON.parse(data.actionResult.result);
          tdata = tdata ? tdata : [];
          this.lstAttorneyTypeMaster = tdata;
        }
      },
      error: (e) => {
        this._UtilityService.hideSpinner();
        this._UtilityService.showErrorAlert(e.message);
      },
    });
  }

  edit() {
    this.mode = 'edit';
    if (this.userid != null && this.admissionid != null) {
      //this.GetContactFirstAttorneyById(this.admissionid);      
    }
    else {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
      this.mode = 'view';
    }
  }
  GetContactFirstAttorneyById(admissionid) {
    this.Contact.statementtype = "Insert";
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetContactFirstAttorneyById(admissionid)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.Contact = tdata;
            //console.log('this.Contact', this.Contact);     
            this.Contact.statementtype = "Update";
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  save() {
    if (this.userid != null && this.admissionid != null) {
      this.Contact.UserId = this.userid;
      this.Contact.ResidentAdmissionInfoId = this.admissionid;
      this.Contact.ModifiedBy = localStorage.getItem('userId');
      this.Contact.Telephone = this.Contact.Telephone?.toString() || null;
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateContactFirstAttorney(this.Contact)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.mode = 'view'
          },
          error: (e) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(e.message);
          },
        });
    }
    else {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  close() {
    this.mode = 'view'
  }
}

