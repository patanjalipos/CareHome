import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionService } from 'src/app/ui/service/option.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { BloodPressureChartService } from './blood-pressure-chart.service';
import { UserService } from 'src/app/ui/service/user.service';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-blood-pressure-chart',
  templateUrl: './blood-pressure-chart.component.html',
  styleUrls: ['./blood-pressure-chart.component.scss']
})
export class BloodPressureChartComponent extends AppComponentBase implements OnInit {

  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  bloodPressureChartFormData:any=<any>{};
  stLstMethod:any[]=[];
  stLstYesNoOptions:any[]=[];
  inputFields:boolean=false;

  isEditable: boolean;
  loginId: any;
  residentAdmissionInfoId:any;
  userId: any;
  StatementType: string = null;
  constructor(private optionService: OptionService,
    private _UtilityService:UtilityService,
    private _UserService: UserService,
    private _BloodPressureChartService:BloodPressureChartService
  ) { 
    super();
  }


  ngOnInit(): void {
    this.optionService.getstLstYesNoOptions().subscribe(data => {
      this.stLstYesNoOptions = data;
    });


    this.optionService.getstLstMethod().subscribe(data => {
      this.stLstMethod = data;
    });
  }

  openAndClose() {
    if (this.bloodPressureChartFormData.CareGiven == "Yes") {
      this.inputFields = true;
    } else {
      this.inputFields = false;
    }
  }
  

  completeForm(){
    this.save();
  }

  save(){
    if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId != null) {

      this.bloodPressureChartFormData.userId = this.userId;
      this.bloodPressureChartFormData.StartedBy = this.loginId;
      this.bloodPressureChartFormData.LastEnteredBy = this.loginId;
      const objectBody: any = {
        StatementType: this.StatementType,
        bloodPressureChartData: this.bloodPressureChartFormData,
      };

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._BloodPressureChartService
        .AddInsertUpdateBloodPressureChartForm(
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
        'Blood Pressure Chart'
      );
    }
  }

  ResetModel() {
    this.isEditable = true;
    this.bloodPressureChartFormData = <any>{};
    this.StatementType = 'Insert';
  }

}
