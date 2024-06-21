import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptionService {

  private yesNoJsonUrl = 'assets/stLst/stLstYesNo.json';
  private attendanceJsonUrl = 'assets/stLst/stLstAttendance.json';
  private methodJsonUrl = 'assets/stLst/stLstMethod.json';
  private jsonDataUrl = 'assets/stLst/stLstFilters.json';
  private DefaultjsonDataUrl = 'assets/stLst/stLstDefaultfilters.json';
  private stLstReason = 'assets/stLst/stLstReason.json';

  constructor(private http: HttpClient) { }

  getstLstYesNoOptions(): Observable<any> {
    return this.http.get<any>(this.yesNoJsonUrl);
  }

  getstLstAttendaceOptions(): Observable<any> {
    return this.http.get<any>(this.attendanceJsonUrl);
  }

  getstLstMethod(): Observable<any> {
    return this.http.get<any>(this.methodJsonUrl);
  }

  getFilterData(): Observable<any> {
    return this.http.get<any>(this.jsonDataUrl);
  }
  getDefaultFilterData(): Observable<any> {
    return this.http.get<any>(this.DefaultjsonDataUrl);
  }
  getstLstReason(): Observable<any> {
    return this.http.get<any>(this.stLstReason);
  }

}
