import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarMonthViewDay, CalendarWeekViewBeforeRenderEvent, CalendarView, CalendarWeekViewAllDayEventRow, } from 'angular-calendar';
import { subMonths, addMonths, addDays, addWeeks, subDays, subWeeks, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, addYears, } from 'date-fns';
import { WeekViewHour, WeekViewHourColumn } from 'calendar-utils';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs';
import { Table } from 'primeng/table';
import { CareService } from 'src/app/ui/service/CareServices';
type CalendarPeriod = 'day' | 'week' | 'month';

@Component({
  selector: 'app-diet-planner',
  templateUrl: './diet-planner.component.html',
  styleUrls: ['./diet-planner.component.scss']
})
export class DietPlannerComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  lstDietMainList: any[] = [];
  DietPlan: any[] = [];
   //Calendar
   showModalDiet: boolean = false;
   timeFrom: Date=new Date(this.datePipe.transform(new Date(),'yyyy-MM-dd'));
   timeUpto: Date=new Date(this.datePipe.transform(new Date(),'yyyy-MM-dd'));
   view: CalendarView | CalendarPeriod = CalendarView.Day;
   viewDate: Date = new Date();
   selectedDayViewDate: Date;
   selectedMonthViewDay: CalendarMonthViewDay;
   selectedDays: any = [];
   weekStartsOn: number = 0;
   prevBtnDisabled: boolean = false;
   nextBtnDisabled: boolean = false;
   actions: CalendarEventAction[] = [
     {
       label: '<i title="Edit/View" class="fas fa-fw fa-pencil-alt"></i>',
       a11yLabel: 'Edit',
       onClick: ({ event }: { event: CalendarEvent }): void => {
         this.handleEvent('Edited', event);
       },
     },
   ];
   deleteactions: CalendarEventAction[] = [
     {
       label: '<i title="Edit/View" class="fas fa-fw fa-pencil-alt"></i>',
       a11yLabel: 'Edit',
       onClick: ({ event }: { event: CalendarEvent }): void => {
         this.handleEvent('Edited', event);
       },
     },
     {
       label: '<i title="Delete" class="fas fa-fw fa-trash-alt"></i>',
       a11yLabel: 'Delete',
       onClick: ({ event }: { event: CalendarEvent }): void => {
         this.handleEvent('Deleted', event);
       },
     },
   ];
   refresh: Subject<any> = new Subject();
   events: CalendarEvent[] = [];
   hourColumns: WeekViewHourColumn[];  
  constructor(private datePipe: DatePipe,private careService: CareService,) { }

  ngOnInit(): void {
    this.careService.getDietList().then(data => this.lstDietMainList = data);
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  hourSegmentClicked(event) {
    var endDateTime = new Date(new Date(event.date));
    endDateTime.setTime(endDateTime.getTime() + 30 * 60 * 1000);
    this.LoadDietPlanList(event.date, endDateTime);
    this.showModalDiet = true;
  }
  handleEvent(action: string, event: CalendarEvent): void {
    if (action == "Edited") {
      this.LoadDietPlanList(event.start, event.end);
      this.showModalDiet=true;   
    }
    if (action == "Deleted")
      this.deleteEvent(event.id, event.start);
  }
  LoadDietPlanList(startDateTime, endDateTime) {
    this.timeFrom = new Date(new Date(startDateTime));
    this.timeUpto = new Date(new Date(endDateTime));         
    //console.log('this.lstDietMainList', this.lstDietMainList);
    this.lstDietMainList.forEach(e => {
      var exist = this.DietPlan.find(f => f.id == e.id && parseInt(this.datePipe.transform(f.DietFrom, 'ddMMyyyyHHmm')) == parseInt(this.datePipe.transform(this.timeFrom, 'ddMMyyyyHHmm')));
       if(exist)
       {
        e.checkaccess=true;
       } 
    });    
  }
  deleteEvent(id, startDateTime) {
    //if (window.confirm('Are sure you want to delete this item ?')) {    
      this.DietPlan=this.DietPlan.filter(f => !(f.id == id && parseInt(this.datePipe.transform(f.DietFrom, 'ddMMyyyyHHmm')) == parseInt(this.datePipe.transform(startDateTime, 'ddMMyyyyHHmm'))));
     //console.log('11', this.DietPlan);
      this.LoadDietPlan();
    //}
  } 
  AddDietPlanner()
  {
    //console.log('lstDietMainList', this.lstDietMainList);
    var lstDietPlanSelected: any[] = [];
    lstDietPlanSelected=this.lstDietMainList.filter(e=>e.checkaccess==true);
    var lstDietPlan: any[] = [];
    //console.log('DietPlan', this.timeFrom);   
    if (lstDietPlanSelected.length > 0) {
      lstDietPlanSelected.map(e => {
        //var exist =this.DietPlan.find(f=>f.id==e.id && new Date(this.datePipe.transform(f.DietFrom, 'yyyy-MM-dd')) ==new Date(this.datePipe.transform(this.timeFrom, 'yyyy-MM-dd')) &&  new Date(this.datePipe.transform(f.DietUpto, 'yyyy-MM-dd')) ==new Date(this.datePipe.transform(this.timeUpto, 'yyyy-MM-dd')))
        var exist = this.DietPlan.find(f => f.id == e.id && parseInt(this.datePipe.transform(f.DietFrom, 'ddMMyyyyHHmm')) == parseInt(this.datePipe.transform(this.timeFrom, 'ddMMyyyyHHmm')));
        //console.log(exist, parseInt(this.datePipe.transform(this.timeFrom, 'ddMMyyyyHHmm')));
        if (!exist)
          lstDietPlan.push({ "id": e.id, "name": e.name, "DietFrom": this.timeFrom, "DietUpto": this.timeUpto, "Status": 1 });
      });
    }
    //console.log('lstDietPlan', lstDietPlan);
    this.DietPlan=[...this.DietPlan, ...lstDietPlan];
    //this.DietPlan.push(lstDietPlan);    
    this.LoadDietPlan();
  }

  LoadDietPlan()
  {
    if (this.DietPlan) {
      var dietPlan = this.DietPlan;
      this.events = [];
      for (var i = 0; i < dietPlan.length; i++) {
        this.events = [
          ...this.events,
          {
            id: dietPlan[i].id,
            title: dietPlan[i].name,
            start: new Date(dietPlan[i]?.DietFrom),
            end: new Date(dietPlan[i]?.DietUpto),
            actions: this.deleteactions
          },
        ];
      }
    }
    this.hide();
  }
  hide() {
    this.careService.getDietList().then(data => this.lstDietMainList = data);  
    this.showModalDiet = false;
  }

}
