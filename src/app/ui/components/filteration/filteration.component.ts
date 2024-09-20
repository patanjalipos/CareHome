import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { CustomDateFormat, TaskPlannerStatus } from '../../service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { MasterService } from '../../service/master.service';
import { Calendar } from 'primeng/calendar';
import { OptionService } from '../../service/option.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filteration',
  templateUrl: './filteration.component.html',
  styleUrls: ['./filteration.component.scss']
})
export class FilterationComponent extends AppComponentBase implements OnInit {
  @ViewChild('calendar') calendar: Calendar;
  @Input() ComponentName: string;
  @Input() UserTypeId: string;
  @Output() FiltrationOutputData: EventEmitter<any> = new EventEmitter<any>();
  customDateFormat = CustomDateFormat;
  //UserMaster
  lstUserType: any[] = [];
  SearchHomeCode: string = null;
  SearchHomeName: string = null;
  SearchUserType: string = null;
  SearchName: string = null;
  //TaskPlanner
  SearchTaskName: any;
  SearchDescription: any;
  SearchTaskStatusType: any;
  SearchCreatedOn: Date[] = [];
  SearchStartTime: Date[] = [];
  SearchDueTime: Date[] = [];
  SearchAssignedTo: any;
  //Alert Master
  SearchAlertHeadName: string = null;
  SearchAlertName: string = null;
  //Menu Master
  SearchMenuUserType: string = null;
  SearchMenuName: any;
  //AlertHeadMaster
  SearchAlertHeadMasterName: string = null;
  //Alert Master
  SearchChartHeadName: string = null;
  SearchChartName: string = null;
  //ChartHeadMaster
  SearchChartHeadMasterName: string = null;
  //Indicator Master
  SearchIndicatorGroupName: string = null;
  SearchIndicatorName: string = null;
  //Indicator Group Master 
  searchGroupName: string = null;
  // Attorney Type Master
  searchTypeName: string = null;
  //Fall Risk  Master
  SearchFallRiskName: string = null;
  SearchRiskPoint: string = null;
  //Form Master
  searchFormName: string = null;
  searchSequence: string = null;
  //Location Master
  SearchFacility: string = null;
  SearchLocation: string = null;
  //common
  SearchStatus: any;
  SearchOrderNo: any;
  lstTaskStatus: any[] = [];
  lststatus: any[] = [];
  SearchmoreFiletrs: any[] = [];
  lstmoreFiletrs: any[] = [];
  taskPlannerStatus = TaskPlannerStatus;

  // alertList
  SearchByAlertName: string = null;
  SearchByStatus: string = null;
  SearchByDate: Date[] = [];


  MasterData: any[];
  lstAlertMaster: any[]=[];

  constructor(
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _MasterServices: MasterService,
    private datepipe: DatePipe
  ) {


    super();
    this.lstTaskStatus = [
      { name: this.taskPlannerStatus[this.taskPlannerStatus.Open], code: this.taskPlannerStatus.Open },
      { name: this.taskPlannerStatus[this.taskPlannerStatus.InProgress], code: this.taskPlannerStatus.InProgress },
      { name: this.taskPlannerStatus[this.taskPlannerStatus.Done], code: this.taskPlannerStatus.Done },

    ];
    this.lststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];
  }


  ngOnInit(): void {
    this.optionService.getFilterData().subscribe(data => {
      this.CheckDefaultVales();
      this.lstmoreFiletrs = data[this.ComponentName];
      if (this.ComponentName === 'UserMaster' || this.ComponentName === 'MenuMaster') {
        this.LoadUserTypeList();
      }
    });
    this.GetAlertMaster();

  }

  LoadUserTypeList() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserTypeMaster()
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
          var tdata = data.actionResult.result;
            tdata = tdata ? tdata : [];
            this.lstUserType = tdata;

            if (this.lstUserType?.length > 0) {
            }
          }
          else {
            this.lstUserType = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },

      });
  }

  CheckDefaultVales() {
    this.optionService.getDefaultFilterData().subscribe(data => {
      this.MasterData = data[this.ComponentName];
      this.SearchmoreFiletrs = data[this.ComponentName].filter(item =>
        this.lstmoreFiletrs.some(option => option.optionValue === item.optionValue)
      );
    });
  }


  CreatedDateRangeChange(calendar: Calendar) {
    if (this.SearchCreatedOn[0] !== null && this.SearchCreatedOn[1] !== null) {
      calendar.overlayVisible = false;
    }
  }

  StartDateRangeChange(calendar: Calendar) {
    if (this.SearchStartTime[0] !== null && this.SearchStartTime[1] !== null) {
      calendar.overlayVisible = false;
    }
  }

  DueDateRangeChange(calendar: Calendar) {
    if (this.SearchDueTime[0] !== null && this.SearchDueTime[1] !== null) {
      calendar.overlayVisible = false;
    }
  }

  hasItem(items: any[], optionId: string): boolean {
    return items && items.some(item => item.optionId === optionId);
  }

  ApplyFilterTaskPlanner() {
    let SearchList1: any[] = [];
    //User Master
    if (this.SearchHomeCode != null && this.SearchHomeCode != undefined && this.SearchHomeCode != '') {
      SearchList1.push({ 'SearchBy': 'HomeCode', 'SearchVal': this.SearchHomeCode.trim() });
    }
    if (this.SearchHomeName != null && this.SearchHomeName != undefined && this.SearchHomeName != '') {
      SearchList1.push({ 'SearchBy': 'HomeName', 'SearchVal': this.SearchHomeName.trim() });
    }
    if (this.SearchUserType != null && this.SearchUserType != undefined && this.SearchUserType != '') {
      SearchList1.push({ 'SearchBy': 'UserType', 'SearchVal': this.SearchUserType.trim() });
    }
    if (this.SearchName != null && this.SearchName != undefined && this.SearchName != '') {
      SearchList1.push({ 'SearchBy': 'Name', 'SearchVal': this.SearchName.trim() });
    }
    //Task Planner
    if (this.SearchTaskName != null && this.SearchTaskName != undefined && this.SearchTaskName != '') {
      SearchList1.push({ 'SearchBy': 'TaskName', 'SearchVal': this.SearchTaskName.trim() });
    }
    if (this.SearchDescription != null && this.SearchDescription != undefined && this.SearchDescription != '') {
      SearchList1.push({ 'SearchBy': 'Description', 'SearchVal': this.SearchDescription.trim() });
    }
    if (this.SearchTaskStatusType != null && this.SearchTaskStatusType != undefined && this.SearchTaskStatusType != 0) {
      SearchList1.push({ 'SearchBy': 'Status', 'SearchVal': this.SearchTaskStatusType.toString() });
    }
    if (this.SearchCreatedOn?.length > 0) {
      SearchList1.push({ 'SearchBy': 'CreatedOn', 'SearchArray': this.SearchCreatedOn });
    }
    if (this.SearchStartTime?.length > 0) {
      SearchList1.push({ 'SearchBy': 'StartTime', 'SearchArray': this.SearchStartTime });
    }
    if (this.SearchDueTime?.length > 0) {
      SearchList1.push({ 'SearchBy': 'DueTime', 'SearchArray': this.SearchDueTime });
    }
    if (this.SearchAssignedTo != null && this.SearchAssignedTo != undefined && this.SearchAssignedTo != '') {
      SearchList1.push({ 'SearchBy': 'AssignedTo', 'SearchVal': this.SearchAssignedTo.trim() });
    }
    //Alert Master
    if (this.SearchAlertHeadName != null && this.SearchAlertHeadName != undefined && this.SearchAlertHeadName != '') {
      SearchList1.push({ 'SearchBy': 'AlertHeadName', 'SearchVal': this.SearchAlertHeadName.trim() });
    }
    if (this.SearchAlertName != null && this.SearchAlertName != undefined && this.SearchAlertName != '') {
      SearchList1.push({ 'SearchBy': 'AlertName', 'SearchVal': this.SearchAlertName.trim() });
    }
    //Menu Master           
    if (this.SearchMenuUserType != null && this.SearchMenuUserType != undefined && this.SearchMenuUserType != '') {
      SearchList1.push({ 'SearchBy': 'UserType', 'SearchVal': this.SearchMenuUserType.trim() });
    }
    if (this.SearchMenuName != null && this.SearchMenuName != undefined && this.SearchMenuName != '') {
      SearchList1.push({ 'SearchBy': 'MenuName', 'SearchVal': this.SearchMenuName.trim() });
    }
    //Alert Head Master            
    if (this.SearchAlertHeadMasterName != null && this.SearchAlertHeadMasterName != undefined && this.SearchAlertHeadMasterName != '') {
      SearchList1.push({ 'SearchBy': 'AlertHeadMasterName', 'SearchVal': this.SearchAlertHeadMasterName.trim() });
    }
    //Chart Master
    if (this.SearchChartHeadName != null && this.SearchChartHeadName != undefined && this.SearchChartHeadName != '') {
      SearchList1.push({ 'SearchBy': 'ChartHeadName', 'SearchVal': this.SearchChartHeadName.trim() });
    }
    if (this.SearchChartName != null && this.SearchChartName != undefined && this.SearchChartName != '') {
      SearchList1.push({ 'SearchBy': 'ChartName', 'SearchVal': this.SearchChartName.trim() });
    }
    //Chart Head Master            
    if (this.SearchChartHeadMasterName != null && this.SearchChartHeadMasterName != undefined && this.SearchChartHeadMasterName != '') {
      SearchList1.push({ 'SearchBy': 'ChartHeadMasterName', 'SearchVal': this.SearchChartHeadMasterName.trim() });
    }
    //Indicator  Master
    if (this.SearchIndicatorGroupName != null && this.SearchIndicatorGroupName != undefined && this.SearchIndicatorGroupName != '') {
      SearchList1.push({ 'SearchBy': 'IndicatorGroupName', 'SearchVal': this.SearchIndicatorGroupName.trim() });
    }
    if (this.SearchIndicatorName != null && this.SearchIndicatorName != undefined && this.SearchIndicatorName != '') {
      SearchList1.push({ 'SearchBy': 'IndicatorName', 'SearchVal': this.SearchIndicatorName.trim() });
    }
    //Indicator Group Master          
    if (this.searchGroupName != null && this.searchGroupName != undefined && this.searchGroupName != '') {
      SearchList1.push({ 'SearchBy': 'GroupName', 'SearchVal': this.searchGroupName.trim() });
    }
    //Attorney Type Master         
    if (this.searchTypeName != null && this.searchTypeName != undefined && this.searchTypeName != '') {
      SearchList1.push({ 'SearchBy': 'TypeName', 'SearchVal': this.searchTypeName.trim() });
    }
    //Form  Master
    if (this.searchFormName != null && this.searchFormName != undefined && this.searchFormName != '') {
      SearchList1.push({ 'SearchBy': 'formName', 'SearchVal': this.searchFormName.trim() });
    }
    if (this.searchSequence != null && this.searchSequence != undefined && this.searchSequence != '') {
      SearchList1.push({ 'SearchBy': 'Sequence', 'SearchVal': this.searchSequence.trim() });
    }
    //Fall Risk  Master
    if (this.SearchFallRiskName != null && this.SearchFallRiskName != undefined && this.SearchFallRiskName != '') {
      SearchList1.push({ 'SearchBy': 'FallRiskName', 'SearchVal': this.SearchFallRiskName.trim() });
    }
    if (this.SearchRiskPoint != null && this.SearchRiskPoint != undefined && this.SearchRiskPoint != '') {
      SearchList1.push({ 'SearchBy': 'RiskPoint', 'SearchVal': this.SearchRiskPoint.trim() });
    }
    //Location  Master
    if (this.SearchFacility != null && this.SearchFacility != undefined && this.SearchFacility != '') {
      SearchList1.push({ 'SearchBy': 'Facility', 'SearchVal': this.SearchFacility.trim() });
    }
    if (this.SearchLocation != null && this.SearchLocation != undefined && this.SearchLocation != '') {
      SearchList1.push({ 'SearchBy': 'Location', 'SearchVal': this.SearchLocation.trim() });
    }
    //Common OrderNo & Status
    if (this.SearchStatus != null && this.SearchStatus != undefined) {
      SearchList1.push({ 'SearchBy': 'Status', 'SearchVal': this.SearchStatus.toString() });
    }
    if (this.SearchOrderNo != null && this.SearchOrderNo != undefined && this.SearchOrderNo != 0) {
      SearchList1.push({ 'SearchBy': 'OrderNo', 'SearchVal': this.SearchOrderNo.toString() });
    }
    //Alert List
    if (this.SearchByDate != null) {
      if (this.SearchByDate[0] != null) {
        let dFrom = this.datepipe.transform(this.SearchByDate[0], "yyyy-MM-dd");
        SearchList1.push({ 'SearchBy': 'DFrom', 'SearchVal': dFrom });
      }
      if (this.SearchByDate[1] != null) {
        let dTo = this.datepipe.transform(this.SearchByDate[1], "yyyy-MM-dd");
        SearchList1.push({ 'SearchBy': 'DTo', 'SearchVal': dTo });
      }
    }
    if (this.SearchByAlertName != null && this.SearchByAlertName != undefined) {
      SearchList1.push({ 'SearchBy': 'AlertType', 'SearchVal': this.SearchByAlertName.toString() });
    }
    if (this.SearchByStatus != null && this.SearchByStatus != undefined) {
      SearchList1.push({ 'SearchBy': 'Status', 'SearchVal': this.SearchByStatus.toString() });
    }
   
    this.FiltrationOutputData.emit(SearchList1);
  }

  dateRangeChange(calendar: Calendar) {
    if (this.SearchByDate[0] !== null && this.SearchByDate[1] !== null) {
        calendar.overlayVisible = false;
    }

}

GetAlertMaster() {
  let importData: any = <any>{};
  importData.StatusType = true;
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices
      .GetAlertMaster(importData)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                var tdata = data.actionResult.result;
                  //console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.lstAlertMaster = tdata;
              } else {
                  this.lstAlertMaster = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

  ClearTaskPlanner() {
    this.CheckDefaultVales();
    if (this.ComponentName === 'UserMaster' || this.ComponentName === 'HomeMaster') {
      this.SearchHomeCode = null;
      this.SearchHomeName = null;
      this.SearchUserType = null;
      this.SearchStatus = null;
      this.SearchName = null;
    }
    if (this.ComponentName === 'TaskPlanner') {
      this.SearchTaskName = null;
      this.SearchDescription = null;
      this.SearchTaskStatusType = null;
      this.SearchmoreFiletrs = null;
      this.SearchCreatedOn = null;
      this.SearchAssignedTo = null;
      this.SearchDueTime = null;
      this.SearchStartTime = null;

    }
    if (this.ComponentName === 'AlertMaster') {
      this.SearchAlertHeadName = null;
      this.SearchAlertName = null;
    }
    if (this.ComponentName === 'MenuMaster') {
      this.SearchMenuUserType = null;
      this.SearchMenuName = null;
    }
    if (this.ComponentName === 'AlertHeadMaster') {
      this.SearchAlertHeadMasterName = null;
    }
    if (this.ComponentName === 'ChartMaster') {
      this.SearchChartHeadName = null;
      this.SearchChartName = null;
    }
    if (this.ComponentName === 'ChartHeadMaster') {
      this.SearchChartHeadMasterName = null;
    }
    if (this.ComponentName === 'IndicatorGroupMaster') {
      this.searchGroupName = null;
    }
    if (this.ComponentName === 'IndicatorMaster') {
      this.SearchIndicatorGroupName = null;
      this.SearchIndicatorName = null;
    }
    if (this.ComponentName === 'AttorneyTypeMaster') {
      this.searchTypeName = null;
    }
    if (this.ComponentName === 'FormMaster') {
      this.searchFormName = null;
      this.searchSequence = null;
      this.SearchStatus = null;
    }
    if (this.ComponentName === 'FallRiskMaster') {
      this.SearchFallRiskName = null;
      this.SearchRiskPoint = null;
    }
    if (this.ComponentName === 'LocationMaster') {
      this.SearchFacility = null;
      this.SearchLocation = null;
    }
    if (this.ComponentName === 'AlertList') {
      this.SearchByAlertName = null;
      this.SearchByStatus = null;
      this.SearchByDate = null;
    }
    if (this.ComponentName === 'MenuMaster' || this.ComponentName === 'AlertMaster' || this.ComponentName === 'AlertHeadMaster' || this.ComponentName === 'ChartHeadMaster' || this.ComponentName === 'HomeMaster'
      || this.ComponentName === 'ChartMaster' || this.ComponentName === 'IndicatorGroupMaster' || this.ComponentName === 'IndicatorMaster' || this.ComponentName === 'AttorneyTypeMaster' || this.ComponentName === 'FallRiskMaster' || this.ComponentName === 'LocationMaster') {
      this.SearchOrderNo = null;
      this.SearchStatus = null;
    }
    this.ApplyFilterTaskPlanner();
  }
}


