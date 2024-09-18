import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-care-plan',
  templateUrl: './care-plan.component.html',
  styleUrls: ['./care-plan.component.scss']
})
export class CarePlanComponent implements OnInit {
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  @ViewChild('calendar') calendar: Calendar;
  @Input() admissionid: any = null;
  @Input() userid: any = null;
  @Input() isProgressnoteDoc: boolean = false;

  isSummaryCarePlan: boolean;
  isExtendedCarePlan: boolean;
  isEvaluate: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  showData(btnName) {
    if (btnName == 'SummaryCarePlan') {
      this.isSummaryCarePlan = true;
      this.isExtendedCarePlan = false;
      this.isEvaluate = false;
    }
    if (btnName == 'ExtendedCarePlan') {
      this.isExtendedCarePlan = true;
      this.isEvaluate = false;
      this.isSummaryCarePlan = false;
    }
    if (btnName == 'Evaluate') {
      this.isExtendedCarePlan = false;
      this.isEvaluate = true;
      this.isSummaryCarePlan = false;
    }
  }

}


