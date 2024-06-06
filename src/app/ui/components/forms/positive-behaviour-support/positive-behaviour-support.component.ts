import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { PositiveBehaviourSupportService } from './positive-behaviour-support.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';

@Component({
  selector: 'app-positive-behaviour-support',
  templateUrl: './positive-behaviour-support.component.html',
  styleUrls: ['./positive-behaviour-support.component.scss']
})
export class PositiveBehaviourSupportComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();


  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  PositiveBehaviourSupportFormsData: any = <any>{};
  residentAdmissionInfoId: any;
  loginId: any;
  userId: any;
  StatementType: string = null;


  lstPersonsBehaviour: any[] = [];
  lstPrimaryPrevention: any[] = [];
  lstDeEscalationTechniques: any[] = [];
  lstSenseOfWellbeing: any[] = [];


  constructor(private _ConstantServices: ConstantsService,
    private route: ActivatedRoute,
    private _UtilityService: UtilityService,
    private _UserServices: UserService,
    private _positiveBehaviourSupport: PositiveBehaviourSupportService
  ) {

    super();

    this._ConstantServices.ActiveMenuName = "Positive Behaviour Support Form";
    this.loginId = localStorage.getItem('userId');
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;

    if (this.preSelectedFormData.selectedFormID != null) {
      this,this.PositiveBehaviourSupportFormsData = <any>{};
      this.GetPositiveBehaviourSupportDetails(
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

    const collectionNames = [
      'PersonsBehaviour',
      'PrimaryPrevention',
      'DeEscalationTechniques',
      'SenseOfWellbeing'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.positiveBehaviourSupport, collectionName, 1))).subscribe((responses: any[]) => {
      this.lstPersonsBehaviour = responses[0];
      this.lstPrimaryPrevention = responses[1];
      this.lstDeEscalationTechniques = responses[2];
      this.lstSenseOfWellbeing = responses[3];
    });

    this.isEditable = this.preSelectedFormData.isEditable;
    if (this.preSelectedFormData.selectedFormID != null) {
      this.PositiveBehaviourSupportFormsData = <any>{};
      this.GetPositiveBehaviourSupportDetails(
        this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }
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
    this.PositiveBehaviourSupportFormsData.isFormCompleted = false;
    this.Save();
  }

  completeForm() {
    this.PositiveBehaviourSupportFormsData.isFormCompleted = true;
    this.Save();
  }

  Save() {
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.PositiveBehaviourSupportFormsData.userId = this.userId;
      this.PositiveBehaviourSupportFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
      this.PositiveBehaviourSupportFormsData.StartedBy = this.loginId;
      this.PositiveBehaviourSupportFormsData.LastEnteredBy = this.loginId;
      //this.PositiveBehaviourSupportFormsData.DateOfComplete = this.datePipte.transform(this.CareWishesFormsData.DateOfComplete,'yyyy-MM-dd');

      const objectBody: any = {
        StatementType: this.StatementType,
        PositiveBehaviourSupportForm: this.PositiveBehaviourSupportFormsData,
      };

      console.log(objectBody);

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._positiveBehaviourSupport
        .AddInsertUpdatePositiveBehaviourSupportForm(objectBody)
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
        'Positive Behaviour Support details are missing.'
      );
    }
  }


  GetPositiveBehaviourSupportDetails(formId:any){
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._positiveBehaviourSupport
      .GetPositiveBehaviourSupportDetails(formId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : {};
           
            console.log("detail data");
            
            console.log(tdata);
            this.PositiveBehaviourSupportFormsData = tdata;
           // this.PositiveBehaviourSupportFormsData.DateOfComplete = this.datePipte.transform(this.CareWishesFormsData.DateOfComplete,'MM/dd/yyyy')

          } else {
            this.PositiveBehaviourSupportFormsData = {};
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }

  ResetModel() {
    this.isEditable = true;
    this.PositiveBehaviourSupportFormsData = <any>{};
    this.StatementType = 'Insert';
  }

  SaveAsPDF() { }

}
