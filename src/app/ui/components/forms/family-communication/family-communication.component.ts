import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-family-communication',
  templateUrl: './family-communication.component.html',
  styleUrls: ['./family-communication.component.scss']
})
export class FamilyCommunicationComponent implements OnInit {

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
