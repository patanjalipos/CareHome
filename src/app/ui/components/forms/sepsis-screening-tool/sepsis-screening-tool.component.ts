import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sepsis-screening-tool',
  templateUrl: './sepsis-screening-tool.component.html',
  styleUrls: ['./sepsis-screening-tool.component.scss']
})
export class SepsisScreeningToolComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
