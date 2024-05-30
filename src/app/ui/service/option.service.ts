import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private yesNoJsonUrl = 'assets/stLst/stLstYesNo.json';
  private attendanceJsonUrl = 'assets/stLst/stLstAttendance.json';
  private methodJsonUrl='assets/stLst/stLstMethod.json';

  constructor(private http: HttpClient) { }

  getstLstYesNoOptions(): Observable<any> {
    return this.http.get<any>(this.yesNoJsonUrl);
  }

  getstLstAttendaceOptions(): Observable<any> {
    return this.http.get<any>(this.attendanceJsonUrl);
  }

  getstLstMethod():Observable<any>{
    return this.http.get<any>(this.methodJsonUrl);
  }

}
