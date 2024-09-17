import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, catchError, of, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareWishesForFutureService } from './care-wishes-for-future.service';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-care-wishes-for-future',
  templateUrl: './care-wishes-for-future.component.html',
  styleUrls: ['./care-wishes-for-future.component.scss']
})
export class CareWishesForFutureComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  CareWishesFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  statementType: string = null;


  lstCapacityInRelation: any[] = [];
  lstWishes: any[] = [];
  lstBuriedOrCremated: any[] = [];
  lstGoals: any[] = [];
  lstPalliativeEndOfLife: any[] = [];
  lstAnyRestrictiveMeasures: any[] = [];
  lstClinicalFrailtyScale: any[] = [];
  AccidentNearMissRecordFormsData: any;

  constructor(private _ConstantServices: ConstantsService,
    private route: ActivatedRoute,
    private _UtilityService: UtilityService,
    private _UserServices: UserService,
    private _CareWishes: CareWishesForFutureService,
    private datePipe: DatePipe
  ) {

    super();

    this._ConstantServices.ActiveMenuName = "Care Wishes For Future Form";
    this.loginId = localStorage.getItem('userId');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareWishesFormsData = <any>{};
      this.GetCareWishesDetails(
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
      'CapacityInRelation',
      'Wishes',
      'BuriedOrCremated',
      'Goals',
      'PalliativeEndOfLife',
      'AnyRestrictiveMeasures',
      'ClinicalFrailtyScale'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.carewisheshforfuture, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstCapacityInRelation = responses[0];
      this.lstWishes = responses[1];
      this.lstBuriedOrCremated = responses[2];
      this.lstGoals = responses[3];
      this.lstPalliativeEndOfLife = responses[4];
      this.lstAnyRestrictiveMeasures = responses[5];
      this.lstClinicalFrailtyScale = responses[6];
    });

    this.isEditable = this.preSelectedFormData.isEditable;
    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareWishesFormsData = <any>{};
      this.GetCareWishesDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }
  }

  GetCareWishesDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareWishes
      .GetCareWishesForFutureDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};
            this.CareWishesFormsData = tdata;
            this.CareWishesFormsData.dateOfComplete = this.datePipe.transform(this.CareWishesFormsData.dateOfComplete, 'MM/dd/yyyy')

          } else {
            this.CareWishesFormsData = {};
          }
          console.log(this.CareWishesFormsData);
          
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
        return of([]); // Returning empty array in case of error
      })
    );
  }

  saveAsUnfinished() {

    this.CareWishesFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.CareWishesFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.CareWishesFormsData.userId = this.userId;
      this.CareWishesFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.CareWishesFormsData.startedBy = this.loginId;
      this.CareWishesFormsData.lastEnteredBy = this.loginId;
      this.CareWishesFormsData.dateOfComplete = this.datePipe.transform(this.CareWishesFormsData.dateOfComplete, 'yyyy-MM-dd');

      const objectBody: any = {
        statementType: this.statementType,
        careWishesForFutureForm: this.CareWishesFormsData,
      };


      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._CareWishes
        .AddInsertUpdateCareWishesForFutureForm(objectBody)
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
        'Care Assessment Wishes For Future details are missing.'
      );
    }
  }


  ResetModel() {
    this.isEditable = true;
    this.CareWishesFormsData = <any>{};
    this.statementType = 'Insert';
  }

  SaveAsPDF() { }

}

