import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, UserTypes, AdmissionStatus } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UserService } from 'src/app/ui/service/user.service';
import { Calendar } from 'primeng/calendar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-progressnotes-documents',
  templateUrl: './progressnotes-documents.component.html',
  styleUrls: ['./progressnotes-documents.component.scss']
})
export class ProgressnotesDocumentsComponent extends AppComponentBase implements OnInit {
  @ViewChild('myForm') public myForm: NgForm;
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  customDateFormat = CustomDateFormat;
  admissionStatus = AdmissionStatus;
  isProgressnoteDoc: boolean = true;
  ShowProgressnotes: boolean = false;
  admissionid: string = "";
  userTypeId: any = localStorage.getItem('userTypeId');
  lstHomeMaster: any[] = [];
  lstlocationMaster: any[] = [];
  lstResidentMaster: any[] = [];
  stlstadmissionstatus: any[] = [];
  filteritems: any[] = [];
  lststatus: any[] = [];
  filteredValuesLength: number = 0;
  public ProgressnoteDocument: any = <any>{};

  constructor(
    private _ConstantServices: ConstantsService,
    private _UtilityService: UtilityService,
    private _MasterServices: MasterService,
    private _UserServices: UserService,
  ) {
    super();
    this._ConstantServices.ActiveMenuName = "Progress notes Documents";

    this.lststatus = [
      { name: 'All', code: null },
      { name: 'Active', code: 1 },
      { name: 'Inactive', code: 0 }
    ];
    this.stlstadmissionstatus = [
      { name: this.admissionStatus[this.admissionStatus.Active], code: this.admissionStatus.Active },
      { name: this.admissionStatus[this.admissionStatus.Deceased], code: this.admissionStatus.Deceased },
      { name: this.admissionStatus[this.admissionStatus.Discharged], code: this.admissionStatus.Discharged },
      { name: this.admissionStatus[this.admissionStatus.Transferred], code: this.admissionStatus.Transferred },
      { name: this.admissionStatus[this.admissionStatus.WaitListed], code: this.admissionStatus.WaitListed },
      { name: this.admissionStatus[this.admissionStatus.Suspended], code: this.admissionStatus.Suspended },
      { name: this.admissionStatus[this.admissionStatus.Unallocated], code: this.admissionStatus.Unallocated }
    ];
  }

  ngOnInit(): void {
    this.LoadHomeMaster();
    this.ShowProgressnotes = false;
  }

  LoadHomeMaster() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetHomeMaster(true)
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            // this.lstHomeMaster = [{ HomeName: '--All--', HomeMasterId: null }, ...tdata];
            this.lstHomeMaster = tdata;
            this.lstHomeMaster.map(m => {
              m.IsEnableFacility = false;
              m.IsResidentAutoAssignment = false;
              m.ResidentList = [];
              m.SelectedResidentList = [];
              this.LoadLocationMaster();

            });
            //console.log('this.lstHomeMaster', this.lstHomeMaster);

          }
          else {
            this.lstHomeMaster = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }

  LoadLocationMaster() {
    this.ShowProgressnotes = false;
    var HomeMasterId = "";
    HomeMasterId = this.ProgressnoteDocument.Facility;
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetLocationMasterByHomeId(HomeMasterId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstlocationMaster = tdata;
            // this.lstlocationMaster = [{ LocationName: 'All', LocationMasterId: null }, ...tdata];
            if (this.filtr !== undefined) {
              this.filtr.nativeElement.value = "";
              this.dataTable.reset();
              this.filteredValuesLength = this.lstlocationMaster?.length;
            }
            //this.LoadResidentList();      
            // console.log(this.lstlocationMaster);
          }
          else {
            this.lstlocationMaster = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }

  LoadResidentList() {
    var HomeMasterId = "";
    HomeMasterId = this.ProgressnoteDocument.Facility;
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetResidentMaster(HomeMasterId, null, this.ProgressnoteDocument.Status)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstResidentMaster = tdata.map(resident => {
              if (resident.ProfileImage) {
                var imageFormat = this._UtilityService.getFileExtension(resident.ProfileImage);
                resident.imageSrc = "data:image/" + imageFormat + ";base64," + resident.ProfileImage;
              } else {
                resident.imageSrc = '';
              }
              return resident;
            });
            if (this.filtr !== undefined) {
              this.filtr.nativeElement.value = "";
              this.dataTable.reset();
              this.filteredValuesLength = this.lstResidentMaster?.length;
            }
            // console.log(this.lstResidentMaster);           
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

  onResident(): void {
    this.ShowProgressnotes = true;
    this.filteritems = this.lstResidentMaster.filter(resident => resident.UserId === this.ProgressnoteDocument.Resident);
    this.admissionid = this.filteritems[0].ResidentAdmissionInfoId;
  }

}
