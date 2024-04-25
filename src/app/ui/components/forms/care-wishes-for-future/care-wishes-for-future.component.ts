import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-wishes-for-future',
  templateUrl: './care-wishes-for-future.component.html',
  styleUrls: ['./care-wishes-for-future.component.scss']
})
export class CareWishesForFutureComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
