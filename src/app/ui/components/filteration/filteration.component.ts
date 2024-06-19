import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { CustomDateFormat, TaskPlannerStatus } from '../../service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { MasterService } from '../../service/master.service';
import { Calendar } from 'primeng/calendar';
import { OptionService } from '../../service/option.service';

@Component({
  selector: 'app-filteration',
  templateUrl: './filteration.component.html',
  styleUrls: ['./filteration.component.scss']
})
export class FilterationComponent extends AppComponentBase implements OnInit {
  @ViewChild('calendar') calendar: Calendar;
  @Input() ComponentName:string;
  @Input() UserTypeId : string ;  
  @Output() FiltrationOutputData: EventEmitter<any> = new EventEmitter<any>();
  customDateFormat = CustomDateFormat;
  //UserMaster
  lstUserType: any[] = [];
  SearchHomeCode:string=null;
  SearchHomeName:string=null;
  SearchUserType:string=null;  
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
//Menu Master
SearchMenuUserType:string=null;
SearchMenuName:any;
//common
SearchStatus:any;
SearchOrderNo:any;
  lstTaskStatus: any[]=[];
  lststatus: any[]=[];
  SearchmoreFiletrs: any[] = [];
  lstmoreFiletrs:any[]=[];
  taskPlannerStatus = TaskPlannerStatus;
  
  MasterData: any[];

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
    this.lststatus = [
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];
  }


  ngOnInit(): void {
    this.optionService.getFilterData().subscribe(data => {       
      this.lstmoreFiletrs=data[this.ComponentName];
      if(this.ComponentName === 'UserMaster'|| this.ComponentName==='MenuMaster')
          {
            this.LoadUserTypeList();
          }
    });
    this.CheckDefaultVales();
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
      this.MasterData =  data[this.ComponentName];
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

   ApplyFilterTaskPlanner()
    {
      let SearchList1:any[]=[];  
  
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
       if(this.SearchStatus!=null && this.SearchStatus!=undefined )
        {
          SearchList1.push({'SearchBy':'Status','SearchVal':this.SearchStatus.toString()});
        } 
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
           if(this.SearchMenuUserType!=null && this.SearchMenuUserType!=undefined && this.SearchMenuUserType!='')
            {
              SearchList1.push({'SearchBy':'UserType','SearchVal':this.SearchMenuUserType.trim()});
            }
           if(this.SearchMenuName!=null && this.SearchMenuName!=undefined && this.SearchMenuName!='')
            {
              SearchList1.push({'SearchBy':'MenuName','SearchVal':this.SearchMenuName.trim()});
            }   
      this.FiltrationOutputData.emit(SearchList1);
}

ClearTaskPlanner()
{
  this.CheckDefaultVales();
  if(this.ComponentName === 'UserMaster')
    {
        this.SearchHomeCode='';
        this.SearchHomeName='';
        this.SearchUserType='';
        this.SearchStatus=null;
        this.SearchName='';
    }
    if(this.ComponentName === 'TaskPlanner')
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
    if(this.ComponentName === 'AlertMaster')
    {
       this.SearchAlertHeadName='';
       this.SearchAlertName='';
       this.SearchOrderNo='';
       this.SearchStatus=null;
    }
    if(this.ComponentName === 'MenuMaster')
      {
         this.SearchMenuUserType='';
         this.SearchMenuName='';
         this.SearchOrderNo='';
         this.SearchStatus=null;
      }
    this.ApplyFilterTaskPlanner();
}
}


