import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { DistrictNurseVisitCommunicationService } from './district-nurse-visit-communication.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-district-nurse-visit-communication',
  templateUrl: './district-nurse-visit-communication.component.html',
  styleUrls: ['./district-nurse-visit-communication.component.scss']
})
export class DistrictNurseVisitCommunicationComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  DistrictNurseFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  uniqueReferenceId: any;
  loginId: any;
  userId: any;
  statementType: string = null;

  lstCommStatus: any[] = [];

  constructor(private _ConstantServices: ConstantsService, private route: ActivatedRoute, private _DataService: DataService, private _UserServices: UserService, private _UtilityService: UtilityService, private datePipe: DatePipe, private _District: DistrictNurseVisitCommunicationService) {

    super();
    this._ConstantServices.ActiveMenuName = "District Nurse Visit Communication Form";
    this.loginId = localStorage.getItem('userId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.DistrictNurseFormsData = <any>{};
      this.GetDistrictNurseVisitDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  ngOnInit(): void {

    this.userId = this.preSelectedFormData.userId;
    this.residentAdmissionInfoId = this.preSelectedFormData.residentAdmissionInfoId;

    const collectionNames = [
      'CommStatus'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.DistrictNurseVisit, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstCommStatus = responses[0];
    });

    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.DistrictNurseFormsData = <any>{};
      this.GetDistrictNurseVisitDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }
    this.DistrictNurseFormsData.NurseVisitDate=new Date();
  }

  SaveAsPDF() { }

  getFormattedTime(time: Date) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getDropdownMasterLists(formMasterId: string, dropdownName: string, status: number): Observable<any> {
    this._UtilityService.showSpinner();
    return this._UserServices.GetDropDownMasterList(formMasterId, dropdownName, status).pipe(
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

        return of([]); // Returning empty array in case of error
      })
    );
  }

  GetDistrictNurseVisitDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._District
      .GetDistrictNurseVisitDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
            tdata = tdata ? tdata : {};

            this.DistrictNurseFormsData = tdata;
            this.DistrictNurseFormsData.nurseVisitDate = this.datePipe.transform(this.DistrictNurseFormsData.nurseVisitDate, 'MM/dd/yyyy')

          } else {
            this.DistrictNurseFormsData = {};
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  saveAsUnfinished() {

    this.DistrictNurseFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.DistrictNurseFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    debugger
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.DistrictNurseFormsData.userId = this.userId;
      this.DistrictNurseFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.DistrictNurseFormsData.startedBy = this.loginId;
      this.DistrictNurseFormsData.lastEnteredBy = this.loginId;
      this.DistrictNurseFormsData.nurseVisitDate = this.datePipe.transform(this.DistrictNurseFormsData.nurseVisitDate, 'yyyy-MM-dd');
      const objectBody: any = {
        statementType: this.statementType,
        districtNurseVisitCommunicationForm: this.DistrictNurseFormsData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._District
        .InsertUpdateDistrictNurseVisitForm(
          objectBody
        )
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
        'District Nurse Visit Communication details are missing.'
      );
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.DistrictNurseFormsData = <any>{};
    this.statementType = 'Insert';
  }


}
