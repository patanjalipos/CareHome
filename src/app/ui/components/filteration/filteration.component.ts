import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, TaskPlannerStatus } from '../../service/constants.service';
import { FormBuilder } from '@angular/forms';
import { UtilityService } from 'src/app/utility/utility.service';
import { EncryptDecryptService } from '../../service/encrypt-decrypt.service';
import { MasterService } from '../../service/master.service';
import { Calendar } from 'primeng/calendar';
import { OptionService } from '../../service/option.service';

@Component({
  selector: 'app-filteration',
  templateUrl: './filteration.component.html',
  styleUrls: ['./filteration.component.scss']
})
export class FilterationComponent extends AppComponentBase implements OnInit {
  @Input() isUserMaster:Boolean=false;
  @Input() isMenuMaster:Boolean=false;
  @Input() isTaskPlanner:Boolean=false;
  @Input() isAlertMaster:Boolean=false;
  @Input() s_HomeMasterId : string ;
  @Input() UserTypeId : string ;
  @ViewChild('calendar') calendar: Calendar;
  @Output() filteredDataEvent = new EventEmitter<any[]>();
  @Output() TaskPlannerFilterData: EventEmitter<any> = new EventEmitter<any>();
  @Output() UserMasterFilterData: EventEmitter<any> = new EventEmitter<any>();
  @Output() AlertMasterFilterData: EventEmitter<any> = new EventEmitter<any>();
  customDateFormat = CustomDateFormat;
  //UserMaster
  lstUserType: any[] = [];
  SearchHomeCode:string=null;
  SearchHomeName:string=null;
  SearchUserType:string=null;
  SearchUserStatusType:any;
  SearchName:string=null;
  //TaskPlanner
  SearchTaskName : any;
  SearchDescription : any;
  SearchTaskStatusType : any;
  SearchCreatedOn: Date[]=[];
  SearchStartTime: Date[]=[];
  SearchDueTime: Date[]=[];
  SearchAssignedTo: any;
//Alert Master
  SearchAlertHeadName:string=null;
  SearchAlertName:string=null;
  SearchOrderNo:any;
  SearchAlertStatus:any;

  lstTaskStatus: any[]=[];
  lstUserstatus: any[]=[];
  SearchmoreFiletrs: any[] = [];
  lstmoreFiletrs:any[]=[];
  taskPlannerStatus = TaskPlannerStatus;
  
  userMasterData: any[];
  taskPlannerData: any[];
  AlertMasterData: any[];

  constructor( 
    private optionService: OptionService,
    private _UtilityService: UtilityService,
    private _MasterServices:MasterService,
  ) {

    
    super();
    this.lstTaskStatus = [
      { name: this.taskPlannerStatus[this.taskPlannerStatus.Open], code: this.taskPlannerStatus.Open },
      { name: this.taskPlannerStatus[this.taskPlannerStatus.InProgress], code: this.taskPlannerStatus.InProgress },
      { name: this.taskPlannerStatus[this.taskPlannerStatus.Done], code: this.taskPlannerStatus.Done },
      
    ];
    this.lstUserstatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];

   
  }


  ngOnInit(): void {
    this.optionService.getFilterData().subscribe(data => {
      if(this.isUserMaster==true)
        {
          this.lstmoreFiletrs=data.UserMaster;
        }
      if(this.isTaskPlanner==true)
        {
          this.lstmoreFiletrs=data.TaskPlanner;
        }
      if(this.isAlertMaster==true)
        {
          this.lstmoreFiletrs=data.AlertMaster;
        }
     //  console.log('UserMaster Data:', data.UserMaster);
    });
    this.CheckDefaultVales();
    this.LoadUserTypeList();
    
  }

  LoadUserTypeList() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetUserTypeMaster()
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
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

  CheckDefaultVales()
  {
    this.optionService.getDefaultFilterData().subscribe(data=>{
      this.userMasterData = data.UserMaster;
      this.taskPlannerData= data.TaskPlanner;
      this.AlertMasterData= data.AlertMaster;
      
     if(this.isUserMaster==true){
         this.SearchmoreFiletrs = this.userMasterData.filter(item =>
          this.lstmoreFiletrs.some(option => option.optionValue === item.optionValue)
         );
      }
      if(this.isTaskPlanner==true)
      {
          this.SearchmoreFiletrs = this.taskPlannerData.filter(item =>
            this.lstmoreFiletrs.some(option => option.optionValue === item.optionValue)
          );
      }
      if(this.isAlertMaster==true)
      {
          this.SearchmoreFiletrs = this.AlertMasterData.filter(item =>
            this.lstmoreFiletrs.some(option => option.optionValue === item.optionValue)
          );
      }
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

ApplyFilterTaskPlanner()
{
  let SearchList1:any[]=[];  
  if(this.isUserMaster==true)
    {
      if(this.SearchHomeCode!=null && this.SearchHomeCode!=undefined && this.SearchHomeCode!='')
        {
          SearchList1.push({'SearchBy':'HomeCode','SearchVal':this.SearchHomeCode.trim()});
        }
      if(this.SearchHomeName!=null && this.SearchHomeName!=undefined && this.SearchHomeName!='')
        {
          SearchList1.push({'SearchBy':'HomeName','SearchVal':this.SearchHomeName.trim()});
        }
      if(this.SearchUserType!=null && this.SearchUserType!=undefined && this.SearchUserType!='')
        {
          SearchList1.push({'SearchBy':'UserType','SearchVal':this.SearchUserType.trim()});
        }
       if(this.SearchName!=null && this.SearchName!=undefined && this.SearchName!='')
        {
          SearchList1.push({'SearchBy':'Name','SearchVal':this.SearchName.trim()});
        }
       if(this.SearchUserStatusType!=null && this.SearchUserStatusType!=undefined )
        {
          SearchList1.push({'SearchBy':'Status','SearchVal':this.SearchUserStatusType.toString()});
        }
        this.UserMasterFilterData.emit(SearchList1); 
    }
    if(this.isTaskPlanner==true)
    {      
        if(this.SearchTaskName!=null && this.SearchTaskName!=undefined && this.SearchTaskName!='')
        {
          SearchList1.push({'SearchBy':'TaskName','SearchVal':this.SearchTaskName.trim()});
        }
       if(this.SearchDescription!=null && this.SearchDescription!=undefined && this.SearchDescription!='')
         {
           SearchList1.push({'SearchBy':'Description','SearchVal':this.SearchDescription.trim()});
         }
       if(this.SearchTaskStatusType!=null && this.SearchTaskStatusType!=undefined && this.SearchTaskStatusType!=0)
          {
           SearchList1.push({'SearchBy':'Status','SearchVal':this.SearchTaskStatusType.toString()});
          }
       if(this.SearchCreatedOn?.length>0)
         {
           SearchList1.push({'SearchBy':'CreatedOn','SearchArray':this.SearchCreatedOn});
         } 
       if(this.SearchStartTime?.length>0)
         {
           SearchList1.push({'SearchBy':'StartTime','SearchArray':this.SearchStartTime});
         } 
       if(this.SearchDueTime?.length>0)
        {
          SearchList1.push({'SearchBy':'DueTime','SearchArray':this.SearchDueTime});
        } 
        if(this.SearchAssignedTo!=null && this.SearchAssignedTo!=undefined && this.SearchAssignedTo!='')
         {
           SearchList1.push({'SearchBy':'AssignedTo','SearchVal':this.SearchAssignedTo.trim()});
         }
       this.TaskPlannerFilterData.emit(SearchList1); 
    }
    if(this.isAlertMaster==true)
      {      
          if(this.SearchAlertHeadName!=null && this.SearchAlertHeadName!=undefined && this.SearchAlertHeadName!='')
          {
            SearchList1.push({'SearchBy':'AlertHeadName','SearchVal':this.SearchAlertHeadName.trim()});
          }
         if(this.SearchAlertName!=null && this.SearchAlertName!=undefined && this.SearchAlertName!='')
           {
             SearchList1.push({'SearchBy':'AlertName','SearchVal':this.SearchAlertName.trim()});
           }
         if(this.SearchOrderNo!=null && this.SearchOrderNo!=undefined && this.SearchOrderNo!=0)
           {
             SearchList1.push({'SearchBy':'OrderNo','SearchVal':this.SearchOrderNo.toString()});
           }
           if(this.SearchAlertStatus!=null && this.SearchAlertStatus!=undefined )
            {
              SearchList1.push({'SearchBy':'Status','SearchVal':this.SearchAlertStatus.toString()});
            }                
         this.AlertMasterFilterData.emit(SearchList1); 
      }
}

ClearTaskPlanner()
{
  this.CheckDefaultVales();
  if(this.isUserMaster==true)
    {
        this.SearchHomeCode='';
        this.SearchHomeName='';
        this.SearchUserType='';
        this.SearchUserStatusType=null;
        this.SearchName='';
    }
    if(this.isTaskPlanner==true)
    {
       this.SearchTaskName='';
       this.SearchDescription='';
       this.SearchTaskStatusType='';
       this.SearchmoreFiletrs=null;
       this.SearchCreatedOn = null;
       this.SearchAssignedTo = '';
       this.SearchDueTime = null;
       this.SearchStartTime = null;
     
    }
    if(this.isAlertMaster==true)
    {
       this.SearchAlertHeadName='';
       this.SearchAlertName='';
       this.SearchOrderNo='';
       this.SearchAlertStatus=null;
    }
    this.ApplyFilterTaskPlanner();
}
}


