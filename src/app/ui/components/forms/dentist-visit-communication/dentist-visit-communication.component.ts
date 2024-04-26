import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dentist-visit-communication',
  templateUrl: './dentist-visit-communication.component.html',
  styleUrls: ['./dentist-visit-communication.component.scss']
})
export class DentistVisitCommunicationComponent implements OnInit {
  
@Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
