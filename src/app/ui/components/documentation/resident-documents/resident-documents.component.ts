import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, UserTypes } from 'src/app/ui/service/constants.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UserService } from 'src/app/ui/service/user.service';
import { Calendar } from 'primeng/calendar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resident-documents',
  templateUrl: './resident-documents.component.html',
  styleUrls: ['./resident-documents.component.scss']
})
export class ResidentDocumentsComponent extends AppComponentBase implements OnInit {
  @ViewChild('myForm') public myForm: NgForm;
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  UserTypes = UserTypes;
  customDateFormat = CustomDateFormat;
  s_userTypeId: any = localStorage.getItem('userTypeId');
  mode: string = null;
  lstHeadMaster: any[] = [];
  groupedResidentTag: any[] = [];
  lstResidentMaster: any[] = [];
  lstResidentTag: any[] = [];
  public lstMaster: any[] = [];
  public master: any = <any>{};
  filteredValuesLength: number = 0;
  SelectedFile: any[] = [];
  RegrangeDates: Date[] = [];
  SearchName: string = null;
  SearchResidentTag: string = null;
  constructor(
    private _ConstantServices: ConstantsService,
    private _UtilityService: UtilityService,
    private _MasterServices: MasterService,
    private _UserServices: UserService,
  ) {
    super();
    this._ConstantServices.ActiveMenuName = "Resident Documents";
  }
  ngOnInit(): void {
    this.LoadResidentList();
    this.GetGroupResidentTagDetailsList();
    this.GetResidentDocumentsDetails();
  }

  LoadResidentList() {
    var HomeMasterId = "";
    if (this.s_userTypeId != UserTypes.SuperAdmin) {
      HomeMasterId = localStorage.getItem('HomeMasterId');
    }
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetResidentMaster(HomeMasterId, false)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstResidentMaster = tdata;
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
  GetGroupResidentTagDetailsList() {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices.GetGroupResidentTagDetailsList(1)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.groupedResidentTag = tdata;
          }
          else {
            this.groupedResidentTag = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }

  GetResidentDocumentsDetails() {
    let importData: any = <any>{};
    let SearchList: any[] = [];
    if (this.RegrangeDates?.length > 0) {
      SearchList.push({ 'SearchBy': 'ModifiedOn', 'SearchArray': this.RegrangeDates });
    }
    if (this.SearchName != null && this.SearchName != undefined && this.SearchName != '') {
      SearchList.push({ 'SearchBy': 'FullName', 'SearchVal': this.SearchName.trim() });
    }
    if (this.SearchResidentTag != null && this.SearchResidentTag != undefined && this.SearchResidentTag != '') {
      SearchList.push({ 'SearchBy': 'ResidentTagDetailsMasterId', 'SearchVal': this.SearchResidentTag.trim() });
    }
    importData.SearchList = SearchList;
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserServices.GetResidentDocumentsDetails(importData)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.lstMaster = tdata;
            this.filteredValuesLength = this.lstMaster?.length;
            // if (this.filtr !== undefined) {
            //   this.filtr.nativeElement.value = "";
            //   this.dataTable.reset();
             
            // }
            //  console.log(this.lstmaster);
          }
          else {
            this.lstMaster = [];
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }

  GetResidentDocumentsDetailsId(id) {
    this._UtilityService.showSpinner();
    this.ResetModel();
    this.mode = "Edit";
    this.unsubscribe.add = this._UserServices.GetResidentDocumentsDetailsById(id)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.master = tdata;
          }
        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }

  RegdateRangeChange(calendar: Calendar) {
    if (this.RegrangeDates[0] !== null && this.RegrangeDates[1] !== null) {
      calendar.overlayVisible = false;
      this.GetResidentDocumentsDetails();
    }
  }

  ClearFilter() {
    this.SearchName = null;
    this.RegrangeDates = [];
    this.SearchResidentTag = null;
    this.GetResidentDocumentsDetails();
  }

  Save() {
    this.master.Status = 1;
    this.master.CreatedBy = localStorage.getItem('userId');
    this.master.ModifiedBy = localStorage.getItem('userId');
    const formData = new FormData();
    formData.append('data', JSON.stringify(this.master));
    if (this.SelectedFile?.length > 0) {
      for (let file of this.SelectedFile) {
        formData.append('ResidentFile', file);
      }
    }
    var url = this._UserServices.AddResidentDocumentsDetails(formData);
    if (this.mode == "Add")
      url = this._UserServices.AddResidentDocumentsDetails(formData);
    //this.master.statementtype = "Insert";
    else
      url = this._UserServices.EditResidentDocumentsDetails(formData);
    //this.master.statementtype = "Update";

    this._UtilityService.showSpinner();
    this.unsubscribe.add = url.subscribe({
      next: (data) => {
        this._UtilityService.hideSpinner();
        if (data.actionResult.success == true) {
          this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
          this.GetResidentDocumentsDetails();
          this.mode = null;
        }
        else {
          this._UtilityService.showWarningAlert(data.actionResult.errMsg);
        }
      },
      error: (e) => {
        this._UtilityService.hideSpinner();
        this._UtilityService.showErrorAlert(e.message);
      },
    });
  }
  AddNewItem() {
    this.ResetModel();
    this.mode = "Add";
    this.myForm?.resetForm();
  }
  ResetModel() {
    this.master = <any>{};
  }
  Close() {
    this.mode = null;
  }

  //FileUpload

  fileUploader(event) {
    this.SelectedFile = [];
    for (let file of event.files) {
      this.SelectedFile.push(file);
    }
  }
  fileUploaderReset() {
    this.SelectedFile = [];
  }
  RemoveResidentFile() {
    this.master.ResidentFile = null;
    this.SelectedFile = [];
  }

  DownloadFile(FileName) {
    if(FileName!=null)
    {
      window.open(environment.BaseURIFileServer+"/FolderTransaction/"+ FileName);
    }
  }

}
