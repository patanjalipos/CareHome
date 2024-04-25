import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-healthcare-support-tool',
  templateUrl: './healthcare-support-tool.component.html',
  styleUrls: ['./healthcare-support-tool.component.scss']
})
export class HealthcareSupportToolComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
