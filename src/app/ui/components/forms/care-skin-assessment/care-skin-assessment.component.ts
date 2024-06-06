import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareSkinAssessmentService } from './care-skin-assessment.service';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-care-skin-assessment',
  templateUrl: './care-skin-assessment.component.html',
  styleUrls: ['./care-skin-assessment.component.scss']
})
export class CareSkinAssessmentComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  CareSkinAssessmentFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  StatementType: string = null;

  lstSkinIntegrityDecisions: any[] = [];
  lstSkinAgeingEffects: any[] = [];
  lstHealthStatus: any[] = [];
  lstDrySkin: any[] = [];
  lstDrySkinManage: any[] = [];
  lstTissuePaperSkin: any[] = [];
  lstMeasuresForSkinTears: any[] = [];
  lstExcoriation: any[] = [];
  lstReddened: any[] = [];
  lstRash: any[] = [];
  lstBruises: any[] = [];
  lstHairScalp: any[] = [];
  lstFingernails: any[] = [];
  lstToenails: any[] = [];
  lstWoundChart: any[] = [];
  lstWoundsCauses: any[] = [];
  lstSkinIntegrityPromotion: any[] = [];
  lstSkinCareStrategies: any[] = [];
  lstGoalsToAchieve: any[] = [];
  lstSafeguardReferral: any[] = [];


  constructor(private _ConstantServices: ConstantsService, private route: ActivatedRoute, private _UtilityService: UtilityService, private _UserServices: UserService, private _CareSkin: CareSkinAssessmentService) {
    super();
    this._ConstantServices.ActiveMenuName = "Care Skin Assessment Form";
    this.loginId = localStorage.getItem('userId');

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareSkinAssessmentFormsData = <any>{};
      this.GetCareSkinAssessmentDetails(
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
    this.residentAdmissionInfoId =
      this.preSelectedFormData.residentAdmissionInfoId;
    this.isEditable = this.preSelectedFormData.isEditable;

    const collectionNames = [
      'SkinIntegrityDecisions',
      'SkinAgeingEffects',
      'HealthStatus',
      'DrySkin',
      'DrySkinManage',
      'TissuePaperSkin',
      'MeasuresForSkinTears',
      'Excoriation',
      'Reddened',
      'Rash',
      'Bruises',
      'HairScalp',
      'Fingernails',
      'Toenails',
      'WoundChart',
      'WoundsCauses',
      'SkinIntegrityPromotion',
      'SkinCareStrategies',
      'GoalsToAchieve',
      'SafeguardReferral'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.careskinassessment, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstSkinIntegrityDecisions = responses[0];
      this.lstSkinAgeingEffects = responses[1];
      this.lstHealthStatus = responses[2];
      this.lstDrySkin = responses[3];
      this.lstDrySkinManage = responses[4];
      this.lstTissuePaperSkin = responses[5];
      this.lstMeasuresForSkinTears = responses[6];
      this.lstExcoriation = responses[7];
      this.lstReddened = responses[8];
      this.lstRash = responses[9];
      this.lstBruises = responses[10];
      this.lstHairScalp = responses[11];
      this.lstFingernails = responses[12];
      this.lstToenails = responses[13];
      this.lstWoundChart = responses[14];
      this.lstWoundsCauses = responses[15];
      this.lstSkinIntegrityPromotion = responses[16];
      this.lstSkinCareStrategies = responses[17];
      this.lstGoalsToAchieve = responses[18];
      this.lstSafeguardReferral = responses[19];
    });

    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareSkinAssessmentFormsData = <any>{};
      this.GetCareSkinAssessmentDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  SaveAsPDF() { }

  GetCareSkinAssessmentDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareSkin
      .GetCareSkinAssessmentDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};
            console.log(tdata)
            this.CareSkinAssessmentFormsData = tdata;
            console.log(this.CareSkinAssessmentFormsData.CareAssessmentHearingFormId)

            // console.log(this.CareAssessmentHearingFormsData.HearingDiagnosisCheck);

          } else {
            this.CareSkinAssessmentFormsData = {};
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
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
        alert(error.message);
        return of([]); // Returning empty array in case of error
      })
    );
  }



  saveAsUnfinished() {

    this.CareSkinAssessmentFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.CareSkinAssessmentFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.CareSkinAssessmentFormsData.userId = this.userId;
      this.CareSkinAssessmentFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.CareSkinAssessmentFormsData.StartedBy = this.loginId;
      this.CareSkinAssessmentFormsData.LastEnteredBy = this.loginId;


      const objectBody: any = {
        StatementType: this.StatementType,
        careSkinAssessmentForm: this.CareSkinAssessmentFormsData,
      };


      console.log(objectBody);

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._CareSkin
        .AddInsertUpdateCareSkinAssessmentForm(
          objectBody
        )
        .subscribe({
          next: (data) => {
            this._UtilityService.hideSpinner();
            if (data.actionResult.success == true) {
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
        'Care Skin Assessment details are missing.'
      );
    }
  }


  ResetModel() {
    this.isEditable = true;
    this.CareSkinAssessmentFormsData = <any>{};
    this.StatementType = 'Insert';
  }



}
