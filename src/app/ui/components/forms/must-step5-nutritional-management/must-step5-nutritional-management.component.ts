import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-must-step5-nutritional-management',
  templateUrl: './must-step5-nutritional-management.component.html',
  styleUrls: ['./must-step5-nutritional-management.component.scss']
})
export class MustStep5NutritionalManagementComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
