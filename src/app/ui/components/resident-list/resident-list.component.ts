import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AppComponentBase } from 'src/app/app-component-base';
import { AdmissionStatus, ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resident-list',
  templateUrl: './resident-list.component.html',
  styleUrls: ['./resident-list.component.scss']
})


export class ResidentListComponent extends AppComponentBase implements OnInit {
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  UserTypes = UserTypes;
  admissionStatus = AdmissionStatus;
  customDateFormat = CustomDateFormat;
  items: MenuItem[];
  s_userTypeId: any = localStorage.getItem('userTypeId');
  lstResidentMaster: any[]=[];
  filteredValuesLength:number=0;
  profileUrl:string= environment.BaseURIFileServer + 'ProfileImage/';
  constructor( 
    private _ConstantServices: ConstantsService,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,   ) { 
      super();
      this._ConstantServices.ActiveMenuName="Resident List";
    }

  ngOnInit(): void {
    this.LoadResidentList();
  }
  toggleTieredMenu(menu, event, userid, admissionid) {
    this.items = [];    
    this.items = [
     ...this.items,
     {
       label: 'View/Edit',
       icon: 'pi pi-eye',
       command: () => {
        var params=encodeURIComponent(btoa("id=" + userid + "&admissionid=" + admissionid));
        window.open("#/profile?q=" + params, "_self");
       }
     },
     {
      label: 'Resident',
      icon: 'pi pi-user',
      command: () => {
        var params=encodeURIComponent(btoa("id=" + userid + "&admissionid=" + admissionid + "&mode=edit"));
        window.open("#/resident/resident-master?q=" + params, "_self");
                  
      }
    },
     {
       label: 'Clinical',
       icon: 'fa-solid fa-stethoscope',
       command: () => {
         var params=encodeURIComponent(btoa("id=" + userid + "&admissionid=" + admissionid));
         window.open("#/clinical?q=" + params, "_self");
                   
       }
     },
     {
       label: 'Contact',
       icon: 'fa-solid fa-address-card',
       command: () => {
         var params=encodeURIComponent(btoa("id=" + userid + "&admissionid=" + admissionid));
         window.open("#/contacts?q=" + params, "_self");                    
       }
     },
   ];
   //console.log('items', this.items);
   menu.toggle(event);
 }

 LoadResidentList() {
  var HomeMasterId = "";
  if (this.s_userTypeId != UserTypes.SuperAdmin) {
    HomeMasterId = localStorage.getItem('HomeMasterId');
  }
  this._UtilityService.showSpinner();   
  this.unsubscribe.add = this._MasterServices.GetResidentMaster(HomeMasterId,false)
    .subscribe({
      next:(data) => {
        this._UtilityService.hideSpinner();          
        if (data.actionResult.success == true) {
          var tdata = JSON.parse(data.actionResult.result);
          tdata = tdata ? tdata : [];
          this.lstResidentMaster = tdata;
          if (this.filtr !== undefined) {
            this.filtr.nativeElement.value = "";
            this.dataTable.reset();
            this.filteredValuesLength = this.lstResidentMaster?.length;
            }            
        //  console.log(this.lstResidentMaster);
        }
        else {
          this.lstResidentMaster = [];            
        }
      },
      error: (e) => {
        this._UtilityService.hideSpinner();
        this._UtilityService.showErrorAlert(e.message);
      },
    });
}
calculateAge(birthday):number {    
  if (birthday != undefined) {
     var curdate = new Date();
     var dob = new Date(birthday);
     var ageyear = curdate.getFullYear() - dob.getFullYear();
     var agemonth = curdate.getMonth() - dob.getMonth();
     var ageday = curdate.getDate() - dob.getDate();
     if (agemonth <= 0) {
       ageyear--;
       agemonth = (12 + agemonth);
     }
     if (curdate.getDate() < dob.getDate()) {
       agemonth--;
       ageday = 30 + ageday;
     } if (agemonth == 12) {
       ageyear = ageyear + 1;
       agemonth = 0;
     }
     return ageyear;      
   }
   else
   return 0;
 }

 AddResident()
  {
    var params=encodeURIComponent(btoa("mode=add"));
    window.open("#/resident/resident-master?q=" + params, "_self");
  }

//Export
 exportToItemExcel() {
  let importData: any = <any>{};
  importData.reportname = "residentlist";
  importData.filename = "residentlist";
  this._MasterServices.downloadReport(importData);
} 

 //Filter
 onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}


}

