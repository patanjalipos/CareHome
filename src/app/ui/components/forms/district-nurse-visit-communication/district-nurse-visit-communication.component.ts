import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { DistrictNurseVisitCommunicationService } from './district-nurse-visit-communication.service';

@Component({
  selector: 'app-district-nurse-visit-communication',
  templateUrl: './district-nurse-visit-communication.component.html',
  styleUrls: ['./district-nurse-visit-communication.component.scss']
})
export class DistrictNurseVisitCommunicationComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  DistrictNurseFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  uniqueReferenceId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstCommStatus: any[] = [];

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _DataService: DataService,private _MasterServices: MasterService,private _UtilityService: UtilityService, private datePipte: DatePipe,private _District: DistrictNurseVisitCommunicationService) {

    super();
    this._ConstantServices.ActiveMenuName = "District Nurse Visit Communication Form";
    this.loginId = localStorage.getItem('userId');

    this.unsubscribe.add = this.route.queryParams.subscribe((params) => {
      var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);

      if (ParamsArray?.length > 0) {
        this.userId =
        ParamsArray.find((e) => e.FieldStr == 'id')?.FieldVal ||
        null;
        this.residentAdmissionInfoId =
        ParamsArray.find((e) => e.FieldStr == 'admissionid')
            ?.FieldVal || null;
      }
    });
   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    
    if (this.preSelectedFormData.selectedFormID != null) {
      this.DistrictNurseFormsData = <any>{};
        this.GetDistrictNurseVisitDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  ngOnInit(): void {

    const collectionNames = [
      'CommStatus'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.DistrictNurseVisit,collectionName,1))).subscribe((responses: any[]) => {
    this.lstCommStatus = responses[0];
});

this.isEditable = this.preSelectedFormData.isEditable;
  
      if (this.preSelectedFormData.selectedFormID != null) {
        this.DistrictNurseFormsData = <any>{};
          this.GetDistrictNurseVisitDetails(
              this.preSelectedFormData.selectedFormID
          );
          this.StatementType = 'Update';
      }
      else {
        this.ResetModel();
      }
  }

  getFormattedTime(time: Date) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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

GetDistrictNurseVisitDetails(formId: string) {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._District
      .GetDistrictNurseVisitDetails(formId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : {};
                  console.log(tdata.DateOfAccident)
                  this.DistrictNurseFormsData = tdata;
                  this.DistrictNurseFormsData.NurseVisitDate = this.datePipte.transform(this.DistrictNurseFormsData.NurseVisitDate,'MM/dd/yyyy')
                  // console.log(this.AccidentNearMissRecordFormsData)
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
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.DistrictNurseFormsData.userId = this.userId;
    this.DistrictNurseFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.DistrictNurseFormsData.StartedBy = this.loginId;
    this.DistrictNurseFormsData.LastEnteredBy = this.loginId;
    this.DistrictNurseFormsData.NurseVisitDate = this.datePipte.transform(this.DistrictNurseFormsData.NurseVisitDate,'yyyy-MM-dd');
        const objectBody: any = {
          StatementType: this.StatementType,
          districtNurseVisitCommunicationForm: this.DistrictNurseFormsData,
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._District
        .InsertUpdateDistrictNurseVisitForm(
            objectBody
        )
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true){
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
this.StatementType = 'Insert';
}


}
