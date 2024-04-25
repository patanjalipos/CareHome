import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';
import { CareService } from 'src/app/ui/service/CareServices';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-allergies',
  templateUrl: './allergies.component.html',
  styleUrls: ['./allergies.component.scss']
})
export class AllergiesComponent extends AppComponentBase implements OnInit {
@Input() mode:string='view';
@Input() userid:any=null;
@Input() admissionid:any=null;
loginId:any=localStorage.getItem('userId');
customDateFormat = CustomDateFormat;
public Clinical: any = <any>{};
allergies:string=null;
lstallergies:any[]=[];
stlstUnknownAllergies:any[]=[];
stlstStatus:any[]=[];
stAllergyStatus:any[]=[];
status:string="All";
showcolumn:string="Created";
extraItemRowCounter: number = 0;
public lstExtraItemDetails: any[] = [];
public lstExtraItemDetailsFilter: any[] = [];
isDisabled:boolean=false;
isEditable:boolean=true;
constructor(
  private _ConstantServices: ConstantsService,
  private _MasterServices:MasterService,
  private _UtilityService: UtilityService, 
  private careService: CareService,
  private confirmationService: ConfirmationService,
) {
  super();
  this.stlstUnknownAllergies = [
    { name: 'The resident has no known allergies / adverse reactions', code: 'The resident has no known allergies / adverse reactions' },
    { name: 'The resident has not been asked about any known allergies/adverse reactions', code: 'The resident has not been asked about any known allergies/adverse reactions' },
    { name: 'It is unknown if the resident has any known allergies/adverse reactions', code: 'It is unknown if the resident has any known allergies/adverse reactions' }    
  ];
  this.stlstStatus = [
    { name: 'All', code: 'All' },
    { name: 'Active', code: 'Active' },
    { name: 'Closed', code: 'Closed' }
  ];
  this.stAllergyStatus = [
    { name: 'Active', code: 'Active' },
    { name: 'Closed - No longer applicable', code: 'Closed - No longer applicable' },
    { name: 'Closed - Raised in error', code: 'Closed - Raised in error' },
  ];
 }

  // async ngOnInit(): Promise<void> {
  //   //const data$ = this.careService.getAllergiesList();
  //   //this.lstallergies = await lastValueFrom(data$);
  //   //console.log('lstallergies', this.lstallergies);    
  // }

  ngOnInit(): void {
    if (this.userid != null && this.userid != undefined && this.admissionid != null && this.admissionid != undefined) {
      this.isEditable = false;
    }
    
  }

  ngOnChanges(changes: SimpleChanges): void {  
    if (this.userid!=null && this.userid!=undefined && this.admissionid!=null && this.admissionid!=undefined)
    {
        this.GetClinicalAllergiesById(this.admissionid);
    }    
  }

  edit()
  {
    this.mode='edit';
    if (this.userid != null && this.admissionid != null) {
      this.GetClinicalAllergiesById(this.admissionid);      
    }
    else
    {
      this._UtilityService.showWarningAlert("Resident admission details are missing.");
    }
  }
  onChangeFilterStatus()
  {
    if(this.status=='All')
    {
      this.lstExtraItemDetails=JSON.parse(JSON.stringify(this.lstExtraItemDetailsFilter)); 
    }
    else if(this.status=='Active')
    {
      this.lstExtraItemDetails=JSON.parse(JSON.stringify(this.lstExtraItemDetailsFilter.filter(e => e.status == this.status))); 
    }
    else
    {
      this.lstExtraItemDetails=JSON.parse(JSON.stringify(this.lstExtraItemDetailsFilter.filter(e => e.status !== "Active"))); 
    }
  }
  AddNewAllergy()
  {
    this.extraItemRowCounter = this.extraItemRowCounter + 1;
    this.lstExtraItemDetails.push({      
      Sequence: this.extraItemRowCounter,
      Mode:'add',
      Allergen: "",
      Reaction: "",
      StatusList: this.stAllergyStatus,
      Status: 'Active',
      CreatedName:"",
      CreatedBy: this.loginId,
      CreatedOn: new Date(),
      ModifiedName:"",
      ModifiedBy: null,
      ModifiedOn:null,

    });
    this.lstExtraItemDetailsFilter.push({      
      Sequence: this.extraItemRowCounter,
      Mode:'add',
      Allergen: "",
      Reaction: "",
      StatusList: this.stAllergyStatus,
      Status: 'Active',
      CreatedName:"",
      CreatedBy: this.loginId,
      CreatedOn: new Date(),
      ModifiedName:"",
      ModifiedBy: null,
      ModifiedOn:null,

    });
    this.isDisabled=this.lstExtraItemDetailsFilter.filter(e => e.status === "Active")?.length>0?true:false;             

  }
  RemoveExtraItemDetails(Sequence: number) {
    var x = this.lstExtraItemDetails.find((item) => item.Sequence == Sequence);
    if ((x.Allergen != "" && x.Allergen != null) || (x.Reaction != "" && x.Reaction != null)) {
      this.confirmationService.confirm({
        message: "Are you sure you want to delete the newly added record?",
        accept: () => {
          this.lstExtraItemDetails = this.lstExtraItemDetails.filter((item) => item.Sequence !== Sequence);
          this.lstExtraItemDetailsFilter = this.lstExtraItemDetailsFilter.filter((item) => item.Sequence !== Sequence);
          this.isDisabled = this.lstExtraItemDetailsFilter.filter(e => e.status === "Active")?.length > 0 ? true : false;

        }
      });
      return;
    }
    this.lstExtraItemDetails = this.lstExtraItemDetails.filter((item) => item.Sequence !== Sequence);
    this.lstExtraItemDetailsFilter = this.lstExtraItemDetailsFilter.filter((item) => item.Sequence !== Sequence);
    this.isDisabled = this.lstExtraItemDetailsFilter.filter(e => e.Status === "Active")?.length > 0 ? true : false;

  } 
  onChangeStatus(Sequence: number, status) {
    var Idx = this.lstExtraItemDetails.findIndex(f => f.Sequence == Sequence);
    if (status != 'Active') {
      if (Idx >= 0) {
        this.lstExtraItemDetails[Idx].ModifiedBy = this.loginId,
        this.lstExtraItemDetails[Idx].ModifiedOn = new Date();        
      }
    }
    else
    {
      this.lstExtraItemDetails[Idx].ModifiedBy = null,
      this.lstExtraItemDetails[Idx].ModifiedOn = null;     
    }
    var Idx1 = this.lstExtraItemDetailsFilter.findIndex(f => f.Sequence == Sequence);
    if (status != 'Active') {
      if (Idx1 >= 0) {
        this.lstExtraItemDetails[Idx].Status = status,
        this.isDisabled=this.lstExtraItemDetailsFilter.filter(e => e.Status === "Active")?.length>0?true:false;       
      }
    }
    //console.log('lstExtraItemDetails', this.lstExtraItemDetails);
  } 
  GetClinicalAllergiesById(admissionid) {
    this.Clinical.statementtype = "Insert";
    this._UtilityService.showSpinner();   
    this.unsubscribe.add = this._MasterServices.GetClinicalAllergiesById(admissionid)  
      .subscribe({
        next:(data) => {
          this._UtilityService.hideSpinner();          
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.Clinical = tdata;            
            this.Clinical.statementtype = "Update";
            if(data.actionResult.result2!=null && data.actionResult.result2!=undefined && data.actionResult.result2?.length>0)
            {
              var tdata2 = JSON.parse(data.actionResult.result2);
              tdata2 = tdata2 ? tdata2 : [];              
              this.lstExtraItemDetails=tdata2; 
              this.lstExtraItemDetails.forEach((d, index) => { 
                    d.StatusList = this.stAllergyStatus;
                  }) 
              //console.log('Get-lstExtraItemDetails', this.lstExtraItemDetails);  
              this.extraItemRowCounter=this.lstExtraItemDetails?.length;    
              this.lstExtraItemDetailsFilter=JSON.parse(JSON.stringify(this.lstExtraItemDetails)); 
              this.isDisabled=this.lstExtraItemDetailsFilter.filter(e => e.Status === "Active")?.length>0?true:false;
              var lstExtraItemDetailsSelected = this.lstExtraItemDetailsFilter.filter(e => e.Status === "Active");
              this.allergies="";
              if (lstExtraItemDetailsSelected?.length > 0) {
                var rcounter = 1;          
                lstExtraItemDetailsSelected?.map(e => {
                  this.allergies = (rcounter == lstExtraItemDetailsSelected?.length ? this.allergies + e.Allergen : this.allergies + e.Allergen + ",");
                  rcounter = rcounter + 1;
                });                
              }
                                                    
            }
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }  
  save()
  {
    if (this.userid != null && this.admissionid != null) {      
      this.Clinical.UserId = this.userid;
      this.Clinical.ResidentAdmissionInfoId = this.admissionid;
      this.Clinical.ModifiedBy = this.loginId;
      console.log('selectedExtraItemDetails', this.lstExtraItemDetails);
    var selectedExtraItemDetails = [];
    var bl: Boolean = true;
    this.lstExtraItemDetails.forEach(x => {
      if (x.Allergen != "" && x.Allergen != null && x.Reaction != "" && x.Reaction != null) {
        var jsonObject = {
          "ClinicalAllergiesListId": x.ClinicalAllergiesListId,
          "UserId": this.userid,
          "ResidentAdmissionInfoId": this.admissionid,
          "Allergen": x.Allergen,
          "Reaction": x.Reaction,
          "Status": x.Status,
          "CreatedBy": x.CreatedBy,
          "CreatedOn": x.CreatedOn,
          "ModifiedBy": x.ModifiedBy, 
          "ModifiedOn": x.ModifiedOn
        }
        selectedExtraItemDetails.push(jsonObject);
      }
      else
        bl = false;

    });
    //console.log('selectedExtraItemDetails', selectedExtraItemDetails);
    if (!bl) {
      this._UtilityService.showWarningAlert("Please select all Item Details");
      return;
    }
      this.Clinical.clinicalallergieslists = selectedExtraItemDetails;
      console.log('Clinical', this.Clinical);
      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices.AddInsertUpdateClinicalAllergies(this.Clinical)
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
    this.GetClinicalAllergiesById(this.admissionid); 
  }
  
}
