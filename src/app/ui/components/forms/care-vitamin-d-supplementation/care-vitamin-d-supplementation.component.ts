import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-care-vitamin-d-supplementation',
  templateUrl: './care-vitamin-d-supplementation.component.html',
  styleUrls: ['./care-vitamin-d-supplementation.component.scss']
})
export class CareVitaminDSupplementationComponent implements OnInit {
  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
