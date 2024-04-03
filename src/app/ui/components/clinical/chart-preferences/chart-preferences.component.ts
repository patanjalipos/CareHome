import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-chart-preferences',
  templateUrl: './chart-preferences.component.html',
  styleUrls: ['./chart-preferences.component.scss']
})
export class ChartPreferencesComponent extends AppComponentBase implements OnInit {
  @Input() mode: string = 'view';
  @Input() userid: any = null;
  @Input() admissionid: any = null;
  loginId:any=localStorage.getItem('userId');
  Clinical: any = <any>{};
  lstResidentChart:any[]=[];
  rowGroupMetadata: any;
  isEditable:boolean=true;
  constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService) 
    { 
    super();    
  }

  
  ngOnInit(): void {
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.isEditable = false;
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {  
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.GetClinicalChartPreferencesById(this.admissionid);
    }
  }

  
  
  edit()
  {
    this.mode='edit';
    if (this.userid != null && this.admissionid != null) {
      this.GetClinicalChartPreferencesById(this.admissionid);      
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }  
  OnEnabled(id)
  {
   
    if(id!=null && id!=undefined)
    {
    var Idx = this.lstResidentChart.findIndex(f => f.ClinicalChartPreferencesId == id);
    if (Idx >= 0) {
        this.lstResidentChart[Idx].ModifiedBy = this.loginId;                
      }         
    }
  }
  
  GetClinicalChartPreferencesById(admissionid) {
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetClinicalChartPreferencesById(admissionid)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstResidentChart = tdata;  
            this.updateRowGroupMetaData();                     
          }
        },
        error: (e) => {
          this.rowGroupMetadata = {};
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }  

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.lstResidentChart) {
      for (let i = 0; i < this.lstResidentChart.length; i++) {
        let rowData = this.lstResidentChart[i];
        let ChartHeadName = rowData.ChartHeadName;
        if (i == 0) {
          this.rowGroupMetadata[ChartHeadName] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.lstResidentChart[i - 1];
          let previousRowGroup = previousRowData.ChartHeadName;
          if (ChartHeadName === previousRowGroup)
            this.rowGroupMetadata[ChartHeadName].size++;
          else
            this.rowGroupMetadata[ChartHeadName] = { index: i, size: 1 };
        }
      }
      //console.log("data---", this.rowGroupMetadata)      
    }    
  }
  save()
  {
    if (this.userid != null && this.admissionid != null) {      
      this.Clinical.UserId = this.userid;
      this.Clinical.ResidentAdmissionInfoId = this.admissionid;
      this.Clinical.ModifiedBy = this.loginId;
      var selectedExtraItemDetails = [];      
      var result=this.lstResidentChart.filter(f=>f.Isenable==true || f.ClinicalChartPreferencesId!=null);
      result.forEach(x => {
        var jsonObject = {
          "ClinicalChartPreferencesId": x.ClinicalChartPreferencesId,
          "ChartMasterId": x.ChartMasterId,
          "Isenable": x.Isenable,
          "ModifiedBy": x.ModifiedBy
        }
        selectedExtraItemDetails.push(jsonObject);      
    });
    if (selectedExtraItemDetails?.length==0) {
      this._UtilityService.showWarningAlert("Please select atleast one record");
      return;
    } 
    //console.log('selectedExtraItemDetails', selectedExtraItemDetails);    
    this.Clinical.chartDTOs = selectedExtraItemDetails;
      //console.log('Clinical', this.Clinical);
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateChartPreferences(this.Clinical)
        .subscribe
        ({
          next: (data) => {
            this._UtilityService.hideSpinner();
            if (data.actionResult.success == true)
              this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            else
              this._UtilityService.showWarningAlert(data.actionResult.errMsg);
            this.mode = 'view'
          },
          error: (e) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(e.message);
          },
        });
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  close()
  {
    this.mode='view';
    this.GetClinicalChartPreferencesById(this.admissionid); 
  }
}
