import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-the-pool-activity-level',
  templateUrl: './the-pool-activity-level.component.html',
  styleUrls: ['./the-pool-activity-level.component.scss']
})
export class ThePoolActivityLevelComponent implements OnInit {

  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
