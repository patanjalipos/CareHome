import { Component, Input, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent extends AppComponentBase implements OnInit {
  
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  @Input() residentadmissiondetails: any = <any>{};

  constructor() {super(); }

  ngOnInit(): void {
  }

}
