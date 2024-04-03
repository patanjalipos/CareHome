import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';
import { DatePipe } from '@angular/common';
import { Options } from '@angular-slider/ngx-slider';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pain-assessment',
  templateUrl: './pain-assessment.component.html',
  styleUrls: ['./pain-assessment.component.scss']
})
export class PainAssessmentComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  loginId: any = localStorage.getItem('userId');
  customDateFormat = CustomDateFormat;
  currentDate = new Date();
  selecteddate:Date = null;
  public Clinical: any = <any>{};
  public lstClinicalPainAssesment: any[] = [];
  isEditable: boolean = true;
  value: number = 5;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 0, legend: "Pain Free" },
      { value: 1, legend: "Very Mild" },
      { value: 2, legend: "Discomforting" },
      { value: 3, legend: "Tolerable" },
      { value: 4, legend: "Distressing" },
      { value: 5, legend: "Very Distressing" },
      { value: 6, legend: "Intense" },
      { value: 7, legend: "Very Intense" },
      { value: 8, legend: "Horrible" },
      { value: 9, legend: "Excruciating Unbearable" },
      { value: 10, legend: "Unbearable" }
    ],
    getTickColor: function (value) {

      if (value <= 1) return 'green';
      if (value >= 2 && value <= 3) return 'yellow';
      if (value >= 4 && value <= 5) return 'blue';
      if (value >= 6 && value <= 8) return 'orange';
      if (value >= 9) return 'red';
      return '#2AE02A';
    },
  };
  constructor(
    private datepipe: DatePipe,
    private _ConstantServices: ConstantsService,
    private _MasterServices: MasterService,
    private _UtilityService: UtilityService,) {
    super();    
  }

  ngOnInit(): void {
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.isEditable = false;
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.GetClinicalPainAssesmentById(this.admissionid);
    }
  }
  AddPainData() {
    //var ObjectID = require("bson-objectid");
   var jsonObject = {
      'ClinicalPainAssesmentId':null,
      'Rating': this.Clinical.Rating,
      'CreatedOn': new Date(),
      'IsFromServer': false
    };
     this.lstClinicalPainAssesment = this.lstClinicalPainAssesment.filter(x => x.IsFromServer == true);
    this.lstClinicalPainAssesment.push(jsonObject);
  }
  edit() {
    this.Clinical= <any>{};
    this.mode = 'edit';
    if (this.userid != null && this.admissionid != null) {
      this.GetClinicalPainAssesmentById(this.admissionid);
    }
    else {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  dateRangeChange()
  {
    this.GetClinicalPainAssesmentById(this.admissionid);
  }
  resetDate()
  {
    this.selecteddate=null;
    this.GetClinicalPainAssesmentById(this.admissionid);
  }


  GetClinicalPainAssesmentById(admissionid) {
    var startdate: any = null;
    this.lstClinicalPainAssesment=[];
    if (this.selecteddate != null && this.selecteddate != undefined)
      startdate = this.datepipe.transform(this.selecteddate, 'yyyy-MM-dd');
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetClinicalPainAssesmentById(admissionid, startdate)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstClinicalPainAssesment = tdata;
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
      if (this.lstClinicalPainAssesment.filter(x => x.IsFromServer == false)?.length==0) {
        this._UtilityService.showWarningAlert("Please add new pain assessment");
        return;
      }     
      this.Clinical.UserId = this.userid;
      this.Clinical.ResidentAdmissionInfoId = this.admissionid;
      this.Clinical.ModifiedBy = this.loginId;
      //console.log('Clinical', this.Clinical);
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdatePainAssesment(this.Clinical)
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
    else {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  deletePainData(id) {
    if(id==null)
    {
      this.lstClinicalPainAssesment = this.lstClinicalPainAssesment.filter(e => e.IsFromServer !== false);
      this._UtilityService.showSuccessAlert("Clinical pain assesment details deleted successfully");
      return;
    }
    this.Clinical.statementtype = "Delete";
    this.Clinical.UserId = this.userid;
    this.Clinical.ResidentAdmissionInfoId = this.admissionid;
    this.Clinical.ModifiedBy = this.loginId;
    this.Clinical.ClinicalPainAssesmentId = id;
    this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdatePainAssesment(this.Clinical)
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
    this.Clinical.Rating=null;
    this.mode = 'view';
    this.GetClinicalPainAssesmentById(this.admissionid);
  }  

}
