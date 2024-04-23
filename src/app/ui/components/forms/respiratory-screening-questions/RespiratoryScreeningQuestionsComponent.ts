import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-respiratory-screening-questions',
  templateUrl: './respiratory-screening-questions.component.html',
  styleUrls: ['./respiratory-screening-questions.component.scss']
})
export class RespiratoryScreeningQuestionsComponent implements OnInit {

  @Input() preSelectedFormData: any = <any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
