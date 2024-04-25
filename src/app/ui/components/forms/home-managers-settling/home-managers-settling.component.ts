import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home-managers-settling',
  templateUrl: './home-managers-settling.component.html',
  styleUrls: ['./home-managers-settling.component.scss']
})
export class HomeManagersSettlingComponent implements OnInit {
  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
