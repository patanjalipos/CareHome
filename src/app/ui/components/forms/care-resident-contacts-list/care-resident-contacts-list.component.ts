import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-resident-contacts-list',
  templateUrl: './care-resident-contacts-list.component.html',
  styleUrls: ['./care-resident-contacts-list.component.scss']
})
export class CareResidentContactsListComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
