import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { ActivityChartService } from '../activities-chart/activity-chart.service';
import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-pain-chart',
  templateUrl: './pain-chart.component.html',
  styleUrls: ['./pain-chart.component.scss']
})
export class PainChartComponent extends AppComponentBase implements OnInit {
  @Input() preSelectedChartData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  customDateFormat = CustomDateFormat;
  loginId: any;
  userId: any;
  residentAdmissionInfoId: any;

  painChartFormData: any = <any>{};
  stLstYesNoOptions: any;
  isEditable:boolean;
  inputFields:boolean;

  stateOptions: any[] = [{ label: 'Yes', value: 'Yes' },{ label: 'No', value: 'No' },{label:"Unsure",value:'Unsure'}];
  value: string = 'off';

  rangeOption:any[]=[{label:'0',value:'0'},{label:'1',value:'1'},{label:'2',value:'2'},{label:'3',value:'3'}]


  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _UserService: UserService,
    private datePipte: DatePipe,
    private _ActivityChartServices: ActivityChartService,
    private _ConstantServices: ConstantsService,
    private route: ActivatedRoute
  ) {
    super();
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

  ngOnInit(): void {
    this.optionService.getstLstYesNoOptions().subscribe((data) => {
      this.stLstYesNoOptions = data;
    });
  }

  openAndClose() {
    if (this.painChartFormData.CareGiven == 'Yes') {
        this.inputFields = true;
    } else {
        this.inputFields = false;
    }
}

  Save(){

  }
  ClearAllfeilds() {
    if (this.preSelectedChartData.selectedChartID) {
        this.painChartFormData = <any>{};
        this.painChartFormData.activitiesChartId =
            this.preSelectedChartData.selectedChartID;
    }
}
}
