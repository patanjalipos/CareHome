import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-district-nurse-visit-communication',
  templateUrl: './district-nurse-visit-communication.component.html',
  styleUrls: ['./district-nurse-visit-communication.component.scss']
})
export class DistrictNurseVisitCommunicationComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};

  constructor() { }

  ngOnInit(): void {
  }

}
