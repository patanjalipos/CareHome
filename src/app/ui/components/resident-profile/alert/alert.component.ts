import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  @Input() residentadmissiondetails: any = <any>{};

  customDateFormat = CustomDateFormat;
  selectedAlertMasterId: string = '';
  selectedStatusId:number
  public lstAlertMaster: any[] = [];
  public lstStatus: any[] = [];
  public AlertList: any[] = [];
  public firstname:string;
  public lastname:string;
  rangeDates: Date[]=[];
  FirstDate:string;
  EndDate:string;
 
  constructor(private _ConstantServices: ConstantsService,
    private _MasterServices: MasterService,
    private _UtilityService: UtilityService,
    private _DataService: DataService,
    private route: ActivatedRoute,
    private datepipe: DatePipe) {super();

      this.lstStatus =[{name:'Active',code:1},
        {name:'Inactive',code:0}
      ]
      this.firstname = localStorage.getItem('FirstName');
      this.lastname = localStorage.getItem('LastName');
     }

     



  ngOnInit(): void {
    this.GetAlertMaster();
    this.GetAlertList();
  }

  GetAlertMaster() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices
        .GetAlertMaster(true)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    //console.log(tdata);
                    tdata = tdata ? tdata : [];
                    this.lstAlertMaster = tdata;
                } else {
                    this.lstAlertMaster = [];
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

GetAlertList() {
  debugger
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices
      .GetDailyVitalAlertLogDetails(this.userid,null,null,this.selectedAlertMasterId,this.selectedStatusId)
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  //console.log(tdata);
                  tdata = tdata ? tdata : [];
                  this.AlertList = tdata;
                  console.log(this.AlertList);
                  
              } else {
                  this.AlertList = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

SearchList() {
  // console.log(this.rangeDates[0],this.rangeDates[1]);
  var dFrom = this.datepipe.transform(this.rangeDates[0],"yyyy-MM-dd");
  var dTo = this.datepipe.transform(this.rangeDates[1],"yyyy-MM-dd");
  this._UtilityService.showSpinner();
  
  // Call the API
  this._MasterServices
      .GetDailyVitalAlertLogDetails(
          this.userid,
          dFrom,
          dTo,
          this.selectedAlertMasterId,
          this.selectedStatusId
      )
      .subscribe({
          next: (data) => {
              this._UtilityService.hideSpinner();
              if (data.actionResult.success == true) {
                  var tdata = JSON.parse(data.actionResult.result);
                  tdata = tdata ? tdata : [];
                  this.AlertList = tdata;
              } else {
                  this.AlertList = [];
              }
          },
          error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
          },
      });
}

}
