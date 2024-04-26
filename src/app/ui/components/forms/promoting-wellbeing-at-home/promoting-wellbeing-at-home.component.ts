import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-promoting-wellbeing-at-home',
  templateUrl: './promoting-wellbeing-at-home.component.html',
  styleUrls: ['./promoting-wellbeing-at-home.component.scss']
})
export class PromotingWellbeingAtHomeComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
