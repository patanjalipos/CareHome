import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hazards-risks',
  templateUrl: './hazards-risks.component.html',
  styleUrls: ['./hazards-risks.component.scss']
})
export class HazardsRisksComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
