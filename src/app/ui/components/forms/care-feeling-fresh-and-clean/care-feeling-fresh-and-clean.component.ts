import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareFeelingFreshAndCleanService } from './care-feeling-fresh-and-clean.service';

@Component({
  selector: 'app-care-feeling-fresh-and-clean',
  templateUrl: './care-feeling-fresh-and-clean.component.html',
  styleUrls: ['./care-feeling-fresh-and-clean.component.scss']
})
export class CareFeelingFreshAndCleanComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  CareAssessmentFreshAndCleanFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstAppearance:any[] = [];
  lstCapacity:any[] = [];
  lstHygienePreference:any[] =[]
  lstDressingPreference:any[] = []
  lstDressingAndUndressing:any[] = []
  lstGrooming:any[] = []
  lstGroomingAssistance:any[] = []
  lstHairRoutine:any[] = []
  lstEyeCare:any[] = []
  lstNailCare:any[] = []
  lstMakeup:any[] = []
  lstJewellery:any[] = []
  lstFragrance:any[] = []
  lstFaceAndBodyCreams:any[] = []
  lstGoalsToAchieveFreshAndClean:any[] = []
  lstStrategyToManageHygiene:any[] = []
  lstActionToManageAdditionalRisk:any[] = []

  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _UtilityService: UtilityService, private _CareFreshAndClean: CareFeelingFreshAndCleanService) {
    
    super(); 
    this._ConstantServices.ActiveMenuName = "Care Assessment Fresh And Clean Form";
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
      this.CareAssessmentFreshAndCleanFormsData = <any>{};
        this.GetCareAssessmentFreshAndCleanDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  ngOnInit(): void {

    this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentFreshAndCleanFormsData = <any>{};
        this.GetCareAssessmentFreshAndCleanDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
  }
  this.GetAppearance();
  this.GetCapacity();
  this.GetDressingAndUndressing();
  this.GetDressingPreference();
  this.GetEyeCare();
  this.GetFaceAndBodyCreams();
  this.GetFragrance();
  this.GetGoalsToAchieveFreshAndClean();
  this.GetGrooming();
  this.GetHairRoutine();
  this.GetHygienePreference();
  this.GetJewellery();
  this.GetMakeup();
  this.GetNailCare();
  this.GetStrategyToManageHygiene();

}

  GetCareAssessmentFreshAndCleanDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareFreshAndClean
        .GetCareAssessmentFreshAndCleanDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    this.CareAssessmentFreshAndCleanFormsData = tdata;
                    // console.log(this.CareAssessmentEatsAndDrinksFormsData)
                } else {
                    this.CareAssessmentFreshAndCleanFormsData = {};
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetAppearance() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetAppearance(1)
      .subscribe({
          next: (data) => {
            // console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstAppearance = tdata;
                  console.log(this.lstAppearance)
              } else {
                  this.lstAppearance = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetCapacity() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetCapacity(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstCapacity = tdata;
              } else {
                  this.lstCapacity = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetHygienePreference() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetHygienePreference(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstHygienePreference = tdata;
              } else {
                  this.lstHygienePreference = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetDressingPreference() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetDressingPreference(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstDressingPreference = tdata;
              } else {
                  this.lstDressingPreference = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetDressingAndUndressing() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetDressingAndUndressing(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstDressingAndUndressing = tdata;
              } else {
                  this.lstDressingAndUndressing = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetGrooming() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetGrooming(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstGrooming = tdata;
              } else {
                  this.lstGrooming = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}


GetHairRoutine() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetHairRoutine(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstHairRoutine = tdata;
              } else {
                  this.lstHairRoutine = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetEyeCare() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetEyeCare(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstEyeCare = tdata;
              } else {
                  this.lstEyeCare = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetNailCare() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetNailCare(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstNailCare = tdata;
              } else {
                  this.lstNailCare = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetMakeup() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetMakeup(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstMakeup = tdata;
              } else {
                  this.lstMakeup = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetJewellery() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetJewellery(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstJewellery = tdata;
              } else {
                  this.lstJewellery = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetFragrance() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetFragrance(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstFragrance = tdata;
              } else {
                  this.lstFragrance = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetFaceAndBodyCreams() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetFaceAndBodyCreams(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstFaceAndBodyCreams = tdata;
              } else {
                  this.lstFaceAndBodyCreams = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetGoalsToAchieveFreshAndClean() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetGoalsToAchieveFreshAndClean(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstGoalsToAchieveFreshAndClean = tdata;
              } else {
                  this.lstGoalsToAchieveFreshAndClean = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

GetStrategyToManageHygiene() {
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._CareFreshAndClean
      .GetStrategyToManageHygiene(1)
      .subscribe({
          next: (data) => {
          //   console.log(data)
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  // console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstStrategyToManageHygiene = tdata;
              } else {
                  this.lstStrategyToManageHygiene = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

saveAsUnfinished() {

  this.CareAssessmentFreshAndCleanFormsData.isFormCompleted = false;
  this.Save();
}

completeForm() {
  this.CareAssessmentFreshAndCleanFormsData.isFormCompleted = true;
  this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.CareAssessmentFreshAndCleanFormsData.userId = this.userId;
    this.CareAssessmentFreshAndCleanFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.CareAssessmentFreshAndCleanFormsData.StartedBy = this.loginId;
    this.CareAssessmentFreshAndCleanFormsData.LastEnteredBy = this.loginId;
    
        const objectBody: any = {
          StatementType: this.StatementType,
          careAssessmentFreshAndCleanForm: this.CareAssessmentFreshAndCleanFormsData,
      };
      

      console.log(objectBody);

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareFreshAndClean
        .AddInsertUpdateCareAssessmentFreshAndCleanForm(
            objectBody
        )
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true){
                    this.EmitUpdateForm.emit(true);
                //   this.ResetModel();
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
        'Care Assessment Fresh and Clean details are missing.'
    );
}
}


ResetModel() {
  this.isEditable = true;
  this.CareAssessmentFreshAndCleanFormsData = <any>{};
//   this.preSelectedFormData = <any>{};
  this.StatementType = 'Insert';
}

}
