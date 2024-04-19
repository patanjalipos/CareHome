import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-oral-and-dental',
  templateUrl: './care-oral-and-dental.component.html',
  styleUrls: ['./care-oral-and-dental.component.scss']
})
export class CareOralAndDentalComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
