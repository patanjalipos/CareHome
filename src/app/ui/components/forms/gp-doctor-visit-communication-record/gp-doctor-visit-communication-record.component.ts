import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
@Component({
  selector: 'app-gp-doctor-visit-communication-record',
  templateUrl: './gp-doctor-visit-communication-record.component.html',
  styleUrls: ['./gp-doctor-visit-communication-record.component.scss']
})
export class GpDoctorVisitCommunicationRecordComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('myForm') public myForm: NgForm;
  customDateFormat = CustomDateFormat;
  GPDoctorVisitCommDetails: any = <any>{};
  //Form which is selected to edit or view
  isEditable: boolean; //Need to be passed from form Dashboard
  StatementType: string = null;
  //Patient Details
  userId: any;
  ResidentAdmissionInfoId: any;
  //CreatedBy or ModifiedBy
  loginId: any;
  lstComRelayMaster: any[] = [];
  lstFamilyComRelayMaster:any[]=[];
  lstFamilyComReasonMaster:any[]=[];
  constructor(
    private _UtilityService: UtilityService,
    private _ConstantServices: ConstantsService,
    private route: ActivatedRoute,
    private _MasterServices: MasterService
  ) {
    super();
    this._ConstantServices.ActiveMenuName = 'GP Doctor Visit Communication Record';
    this.loginId = localStorage.getItem('userId');
    this.unsubscribe.add = this.route.queryParams.subscribe((params) => {
      var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);
      if (ParamsArray?.length > 0) {
        this.userId =
          ParamsArray.find((e) => e.FieldStr == 'id')?.FieldVal || null;
        this.ResidentAdmissionInfoId = ParamsArray.find((e) => e.FieldStr == 'admissionid')?.FieldVal || null;
      }
    });
  }

  ngOnInit(): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    if (this.preSelectedFormData.selectedFormID != null) {
      this.GPDoctorVisitCommDetails = <any>{};
      this.GPDoctorVisitCommDetailsByid(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
    const collectionNames = [
      'CommRelay',
    ];
    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.FamilyCommunication, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstFamilyComRelayMaster = responses[0];
    });
    //this.GetFamilyRelayMaster();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    if (this.preSelectedFormData.selectedFormID != null) {
      this.GPDoctorVisitCommDetails = <any>{};
      this.GPDoctorVisitCommDetailsByid(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    } else {
      this.ResetModel();
    }
  }

  getDropdownMasterLists(formMasterId: string, dropdownName: string,status:number): Observable<any> {
    this._UtilityService.showSpinner();
    return this._MasterServices.GetDropDownMasterList(formMasterId,dropdownName, status).pipe(
        map((response) => {
            this._UtilityService.hideSpinner();
            if (response.actionResult.success) {
                return JSON.parse(response.actionResult.result);
            } else {
                return [];
            }
        }),
        catchError((error) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(error.message);
            alert(error.message);
            return of([]); // Returning empty array in case of error
        })
    );
}

  // GetFamilyRelayMaster() {
  //   this._UtilityService.showSpinner();
  //   this.unsubscribe.add = this._MasterServices
  //       .GetFamilyRelayMaster(0)
  //       .subscribe({
  //           next: (data) => {
  //               this._UtilityService.hideSpinner();
  //               if (data.actionResult.success == true) {
  //                   var tdata = JSON.parse(data.actionResult.result);
  //                   tdata = tdata ? tdata : {};
  //                   this.lstComRelayMaster = tdata;
  //                   //console.log(this.PreAdmissionAssessmentFormsData);
  //               } else {
  //                   this.lstComRelayMaster = [];
  //               }
  //           },
  //           error: (e) => {
  //               this._UtilityService.hideSpinner();
  //               this._UtilityService.showErrorAlert(e.message);
  //           },
  //       });
  // }
  GPDoctorVisitCommDetailsByid(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices
      .GPDoctorVisitCommDetailsByid(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};
            this.GPDoctorVisitCommDetails = tdata;
            this.GPDoctorVisitCommDetails.DateOfGPCommunication = new Date(this.GPDoctorVisitCommDetails.DateOfGPCommunication);
            this.GPDoctorVisitCommDetails.TimeOfGPCommunication = new Date(this.GPDoctorVisitCommDetails.TimeOfGPCommunication);
          } else {
            this.GPDoctorVisitCommDetails = {};
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  ResetModel() {
    this.preSelectedFormData = <any>{};
    this.isEditable = true;
    this.GPDoctorVisitCommDetails = <any>{};
    this.StatementType = 'Insert';
  }
  saveAsUnfinished() {
    this.GPDoctorVisitCommDetails.IsFormCompleted = false;
    this.Save();
  }
  completeForm() {
    this.GPDoctorVisitCommDetails.IsFormCompleted = true;
    this.Save();
  }
  Save() {
    if (this.userId != null && this.ResidentAdmissionInfoId != null) {
      this.GPDoctorVisitCommDetails.userId = this.userId;
      this.GPDoctorVisitCommDetails.StartedBy = localStorage.getItem('userId');
      this.GPDoctorVisitCommDetails.LastEnteredBy = localStorage.getItem('userId');
      this.GPDoctorVisitCommDetails.ResidentAdmissionInfoId = this.ResidentAdmissionInfoId;
      const objectBody: any = {
        StatementType: this.StatementType,
        GPDoctorVisitCommunicationDetailsForm: this.GPDoctorVisitCommDetails,
      };
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddUpdateGPDoctorVisitCommDetails(objectBody)
        .subscribe({
          next: (data) => {
            this._UtilityService.hideSpinner();
            if (data.actionResult.success == true) {
              this.EmitUpdateForm.emit(true);
              this.ResetModel();
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
        'Doctor Visit Communication details are missing.'
      );
    }
  }
}
