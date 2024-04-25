import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-herbert-protocol-missing-person',
  templateUrl: './herbert-protocol-missing-person.component.html',
  styleUrls: ['./herbert-protocol-missing-person.component.scss']
})
export class HerbertProtocolMissingPersonComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
