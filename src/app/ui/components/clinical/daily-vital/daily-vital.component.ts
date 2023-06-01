import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from '../../master/master.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-daily-vital',
  templateUrl: './daily-vital.component.html',
  styleUrls: ['./daily-vital.component.scss']
})
export class DailyVitalComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  loginId: any = localStorage.getItem('userId');
  customDateFormat = CustomDateFormat;
  currentDate = new Date();
  selecteddate:Date = null;
  public Clinical: any = <any>{};
  lstClinicalVital: any[] = [];
  isEditable: boolean = true;
  constructor(
    private datepipe: DatePipe,
    private _ConstantServices: ConstantsService,
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
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.GetClinicalDailyVitalById(this.admissionid);
    }
  }

  edit() {
    this.Clinical= <any>{};
    this.mode = 'edit';
    if (this.userid != null && this.admissionid != null) {
      this.GetClinicalDailyVitalById(this.admissionid);
    }
    else {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }

  dateRangeChange()
  {
    this.GetClinicalDailyVitalById(this.admissionid)
  }
  resetDate()
  {
    this.selecteddate=null;
    this.GetClinicalDailyVitalById(this.admissionid);
  }

  GetClinicalDailyVitalById(admissionid) {
    var startdate: any = null;
    if (this.selecteddate != null && this.selecteddate != undefined)
      startdate = this.datepipe.transform(this.selecteddate, 'yyyy-MM-dd');
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetClinicalDailyVitalById(admissionid, startdate)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstClinicalVital = tdata;
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
      if (this.Clinical.bp === undefined && this.Clinical.pr === undefined
        && this.Clinical.respiration === undefined && this.Clinical.temprature === undefined
        && this.Clinical.weight === undefined && this.Clinical.fbs === undefined && this.Clinical.ppbs === undefined
        && this.Clinical.rbs === undefined) {
        this._UtilityService.showWarningAlert("Please fill atleast one record");
        return;
      }     
      this.Clinical.userid = this.userid;
      this.Clinical.residentadmissioninfoid = this.admissionid;
      this.Clinical.modifiedby = this.loginId;     
      //console.log('Clinical', this.Clinical);
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateDailyVital(this.Clinical)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            if (data.actionResult.success == true)
              this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            else
              this._UtilityService.showWarningAlert(data.actionResult.errMsg);
            this.close();
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
  deleteVitalData(id) {
    this.Clinical.StatementType = "delete";
    this.Clinical.userid = this.userid;
    this.Clinical.residentadmissioninfoid = this.admissionid;
    this.Clinical.clinicaldailyvitalid = id;
    this.Clinical.modifiedby = this.loginId;
    this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateDailyVital(this.Clinical)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.close();
          },
          error: (e) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(e.message);
          },
        });    
  }
  close() {
    this.mode = 'view';
    this.GetClinicalDailyVitalById(this.admissionid);
  }

}
