import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { ReportService } from 'src/app/ui/service/report.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-fall-risk-assessment-report',
  templateUrl: './fall-risk-assessment-report.component.html',
  styleUrls: ['./fall-risk-assessment-report.component.scss']
})
export class FallRiskAssessmentReportComponent extends AppComponentBase implements OnInit {
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  public lstReport: any[]=[];
  filteredValuesLength:number=0;
  public statusColor: string[]=[];
  homemasterid:any = localStorage.getItem('HomeMasterId');
  constructor(
    private _ConstantServices: ConstantsService,
    private _ReportService:ReportService,
    private _UtilityService: UtilityService,
    ) 
  {  
    super();
    this._ConstantServices.ActiveMenuName = "Fall Risk Assessment Report"; 
  }

  async ngOnInit(): Promise<void> {
    this._UtilityService.showSpinner();
    const categories$ = this._ReportService.GetFallRiskAssessmentReport(this.homemasterid);
    await lastValueFrom(categories$).then((data) => {
      this._UtilityService.hideSpinner();
      if (data.actionResult.success == true) {
        var tdata = JSON.parse(data.actionResult.result);
        tdata = tdata ? tdata : [];
        this.lstReport = tdata;
        if (this.filtr !== undefined) {
          this.filtr.nativeElement.value = "";
          this.dataTable.reset();
          this.filteredValuesLength = this.lstReport?.length;
          } 
      }
      else {
        this.lstReport = [];            
      } 
    }).catch((e) => {
      this._UtilityService.hideSpinner();
      this._UtilityService.showErrorAlert(e.message);
    });
   this.getTickColor();
  }
  // ngOnInit(): void {
  //   this.GetFallRiskAssessmentReport();
  //   this.getTickColor();
  // }

  getTickColor() {
    for (let i = 0; i < this.lstReport?.length; i++) {
      if (this.lstReport[i].status === "LOW")
        this.statusColor[i] = '#006400';
      else if (this.lstReport[i].status === "MODERATE")
        this.statusColor[i] = '#3CB371';
      else if (this.lstReport[i].status === "AT RISK")
        this.statusColor[i] = 'yellow';
      else 
        this.statusColor[i] = 'red';
      //console.log(this.statusColor[i]);
    }       
  }
  GetFallRiskAssessmentReport() {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._ReportService.GetFallRiskAssessmentReport(this.homemasterid)
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstReport = tdata;
            if (this.filtr !== undefined) {
              this.filtr.nativeElement.value = "";
              this.dataTable.reset();
              this.filteredValuesLength = this.lstReport?.length;
              }            
          //  console.log(this.lstReport);
          }
          else {
            this.lstReport = [];            
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }  
  //Filter
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}
