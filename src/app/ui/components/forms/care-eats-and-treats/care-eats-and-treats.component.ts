import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareEatsAndTreatsService } from './care-eats-and-treats.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { UserService } from 'src/app/ui/service/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-care-eats-and-treats',
  templateUrl: './care-eats-and-treats.component.html',
  styleUrls: ['./care-eats-and-treats.component.scss']
})
export class CareEatsAndTreatsComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  CareAssessmentEatsAndDrinksFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  loginId: any;
  userId: any;
  statementType: string = null;
  checked:boolean = false;

  lstResidentStatusOfCapacity:any[] = [];
  lstChoking:any[] = [];
  lstActionNeededToReduceChoking:any[] =[]
  lstFood:any[] = []
  lstFluids:any[] = []
  lstProfessionalInput:any[] = []
  lstGoalsToAchieve:any[] = []
  lstStrategyToManageNutrition:any[] = []
  lstRiskOfMalnutrition:any[] = []


  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _DataService: DataService,private _CareEatsAndDrinks: CareEatsAndTreatsService,private _UtilityService: UtilityService,private _UserServices: UserService, private datePipe: DatePipe) {

    super();
    this._ConstantServices.ActiveMenuName = "Care Assessment Eats And Treats Form";
    this.loginId = localStorage.getItem('userId');

   }

   ngOnChanges(changes: SimpleChanges): void {
    this.isEditable = this.preSelectedFormData.isEditable;
    
    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentEatsAndDrinksFormsData = <any>{};
        this.GetCareAssessmentEatsAndDrinksDetails(
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
    this.residentAdmissionInfoId =
        this.preSelectedFormData.residentAdmissionInfoId;
    this.isEditable = this.preSelectedFormData.isEditable;
    const collectionNames = [
        'ResidentStatusOfCapacity',
        'Choking',
        'ActionNeededToReduceChoking',
        'Food',
        'Fluids',
        'ProfessionalInput',
        'GoalsToAchieve',
        'StrategyToManageNutrition',
        'RiskOfMalnutrition'
    ];

    forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.CareAssessmentEats,collectionName,1))).subscribe((responses: any[]) => {
        this.lstResidentStatusOfCapacity = responses[0];
        this.lstChoking = responses[1];
        this.lstActionNeededToReduceChoking = responses[2];
        this.lstFood = responses[3];
        this.lstFluids = responses[4];
        this.lstProfessionalInput = responses[5];
        this.lstGoalsToAchieve = responses[6];
        this.lstStrategyToManageNutrition = responses[7];
        this.lstRiskOfMalnutrition = responses[8];
    });


    this.isEditable = this.preSelectedFormData.isEditable;
  
    if (this.preSelectedFormData.selectedFormID != null) {
      this.CareAssessmentEatsAndDrinksFormsData = <any>{};
        this.GetCareAssessmentEatsAndDrinksDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.statementType = 'Update';
    }
    else {
      this.ResetModel();
    }

  }

  GetCareAssessmentEatsAndDrinksDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetCareAssessmentEatsAndDrinksDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    this.CareAssessmentEatsAndDrinksFormsData = tdata;
                    this.CareAssessmentEatsAndDrinksFormsData.nextReviewDate = new Date(this.CareAssessmentEatsAndDrinksFormsData.nextReviewDate);
                } else {
                    this.CareAssessmentEatsAndDrinksFormsData = {};
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

getDropdownMasterLists(formMasterId: string, dropdownName: string,status:number): Observable<any> {
    this._UtilityService.showSpinner();
    return this._UserServices.GetDropDownMasterList(formMasterId,dropdownName, status).pipe(
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

SaveAsPDF() {}

saveAsUnfinished() {

  this.CareAssessmentEatsAndDrinksFormsData.isFormCompleted = false;
  this.Save();
}

completeForm() {
  this.CareAssessmentEatsAndDrinksFormsData.isFormCompleted = true;
  this.Save();
}

Save() {
  debugger
if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
    
    this.CareAssessmentEatsAndDrinksFormsData.userId = this.userId;
    this.CareAssessmentEatsAndDrinksFormsData.residentAdmissionInfoId =
        this.residentAdmissionInfoId;
    this.CareAssessmentEatsAndDrinksFormsData.StartedBy = this.loginId;
    this.CareAssessmentEatsAndDrinksFormsData.lastEnteredBy = this.loginId;

    this.CareAssessmentEatsAndDrinksFormsData.nextReviewDate = new Date(this.datePipe.transform(this.CareAssessmentEatsAndDrinksFormsData.nextReviewDate, 'yyyy-MM-dd'));
    
        const objectBody: any = {
          statementType: this.statementType,
          careAssessmentEatsAndDrinksForm: this.CareAssessmentEatsAndDrinksFormsData,
      };
      

    

    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .AddInsertUpdateCareAssessmentEatsAndDrinksForm(
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
        'Care Assessment Eats And Treats details are missing.'
    );
}
}

ResetModel() {
  this.isEditable = true;
  this.CareAssessmentEatsAndDrinksFormsData = <any>{};
  this.statementType = 'Insert';
}

}
