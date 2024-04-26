import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareEatsAndTreatsService } from './care-eats-and-treats.service';

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
  StatementType: string = null;
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


  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _DataService: DataService,private _CareEatsAndDrinks: CareEatsAndTreatsService,private _UtilityService: UtilityService) {

    super();
    this._ConstantServices.ActiveMenuName = "Care Assessment Eats And Treats Form";
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
      this.CareAssessmentEatsAndDrinksFormsData = <any>{};
        this.GetCareAssessmentEatsAndDrinksDetails(
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
      this.CareAssessmentEatsAndDrinksFormsData = <any>{};
        this.GetCareAssessmentEatsAndDrinksDetails(
            this.preSelectedFormData.selectedFormID
        );
        this.StatementType = 'Update';
    }
    else {
      this.ResetModel();
    }

    this.GetResidentStatusOfCapacity();
    this.GetChoking();
    this.GetFood();
    this.GetFluids();
    this.GetActionNeededToReduceChoking();
    this.GetGoalsToAchieve();
    this.GetProfessionalInput();
    this.GetRiskOfMalnutrition();
    this.GetStrategyToManageNutrition();
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
                    // console.log(this.CareAssessmentEatsAndDrinksFormsData)
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

GetResidentStatusOfCapacity() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetResidentStatusOfCapacity(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstResidentStatusOfCapacity = tdata;
                } else {
                    this.lstResidentStatusOfCapacity = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetChoking() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetChoking(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstChoking = tdata;
                } else {
                    this.lstChoking = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetActionNeededToReduceChoking() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetActionNeededToReduceChoking(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstActionNeededToReduceChoking = tdata;
                } else {
                    this.lstActionNeededToReduceChoking = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetFood() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetFood(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstFood = tdata;
                } else {
                    this.lstFood = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetFluids() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetFluids(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstFluids = tdata;
                } else {
                    this.lstFluids = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetProfessionalInput() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetProfessionalInput(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstProfessionalInput = tdata;
                } else {
                    this.lstProfessionalInput = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetGoalsToAchieve() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetGoalsToAchieve(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstGoalsToAchieve = tdata;
                } else {
                    this.lstGoalsToAchieve = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetStrategyToManageNutrition() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetStrategyToManageNutrition(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstStrategyToManageNutrition = tdata;
                } else {
                    this.lstStrategyToManageNutrition = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetRiskOfMalnutrition() {
  this._UtilityService.showSpinner();
    this.unsubscribe.add = this._CareEatsAndDrinks
        .GetRiskOfMalnutrition(1)
        .subscribe({
            next: (data) => {
            //   console.log(data)
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    // console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstRiskOfMalnutrition = tdata;
                } else {
                    this.lstRiskOfMalnutrition = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

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
    this.CareAssessmentEatsAndDrinksFormsData.LastEnteredBy = this.loginId;
    
        const objectBody: any = {
          StatementType: this.StatementType,
          careAssessmentEatsAndDrinksForm: this.CareAssessmentEatsAndDrinksFormsData,
      };
      

      console.log(objectBody);

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
        'Care Assessment Eats And Drinks details are missing.'
    );
}
}

ResetModel() {
  this.isEditable = true;
  this.CareAssessmentEatsAndDrinksFormsData = <any>{};
//   this.preSelectedFormData = <any>{};
  this.StatementType = 'Insert';
}

}
