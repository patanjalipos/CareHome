import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResidentProfileService {

  constructor() { }

 
  private valueSubject = new BehaviorSubject<boolean>(false);
  value = this.valueSubject.asObservable();

  tranferValu(value:boolean){
    this.valueSubject.next(value);
  }

}
