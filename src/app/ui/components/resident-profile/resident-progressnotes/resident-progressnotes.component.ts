import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
//import { progressNoteFilters,UserEnabledNotes,TimeFrameNotes, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { progressNoteFilters,EnteredNotes, TimeFrameNotes,ConstantsService, CustomDateFormat, UserEnteredNote } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { EncryptDecryptService } from 'src/app/ui/service/encrypt-decrypt.service';
import { Table } from 'primeng/table';
import { MenuItem } from 'primeng/api/menuitem';
import { Calendar } from 'primeng/calendar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-resident-progressnotes',
  templateUrl: './resident-progressnotes.component.html',
  styleUrls: ['./resident-progressnotes.component.scss']
})
export class ResidentProgressnotesComponent extends AppComponentBase implements OnInit {
  @ViewChild('dt') public dataTable: Table;
  @ViewChild('filtr') filtr: ElementRef;
  @ViewChild('calendar') calendar: Calendar;
  @Input() admissionid: any = null;
  @Input() userid: any = null;

 // AddnoteactiveIndex: number | null = null;
  customDateFormat = CustomDateFormat;
  progress_Note = progressNoteFilters;
  Entered_Notes = EnteredNotes;
  TimeFrame_Notes = TimeFrameNotes;
  lstSortOrder:any[]=[];
  today: Date = new Date();
  isHandover: boolean = true;
  AddNote:any=<any>{};
  todayDate = new Date();
  lstResidentProgressNote: any[]=[];
  filteredValuesLength:number=0;
  items: MenuItem[];
  TotalRecords: number;
  showAdditionalNote:boolean=false;
  AdditionalProgressNote:any=<any>{};
  filteritems: any[]=[];
  public isExpanded:boolean=true;
  SearchDate: Date[]=[];
  dFrom: any;
  dTo: any;
  createdBy:string="";
  statusOptions: { key: string, value: string }[];
  selectedStatuses: { [key: string]: boolean } = {};
  EnteredOptions: { key: string, value: string }[];
  EnteredStatuses: { [key: string]: boolean } = {};
  TimeFrameOptions: { key: string, value: string }[];
  TimeFrameStatuses: string | undefined;
  UserEnteredNoteEnum=UserEnteredNote;
  lstUserNote:any[]=[];
  AdditionProgressNoteID:string="";

  constructor(
    private _ConstantServices: ConstantsService,
    private datePipe: DatePipe,
    private _MasterServices:MasterService,
    private _UtilityService: UtilityService,
    ) 
    { 
    super();
    this._ConstantServices.ActiveMenuName="Resident Progress Notes";
    this.statusOptions = Object.keys(this.progress_Note).map(key => ({
      key,
      value: this.progress_Note[key as keyof typeof progressNoteFilters]
    }));

    this.lstUserNote = [
      { name: this.UserEnteredNoteEnum[this.UserEnteredNoteEnum.UserEnteredNotes], code: this.UserEnteredNoteEnum.UserEnteredNotes }
    ]
    
    // this.statusOptions.forEach(option => {
    //   this.selectedStatuses[option.key] = false; 
    // });

    // this.EnteredOptions = Object.keys(this.Entered_Notes).map(key => ({
    //   key,
    //   value: this.Entered_Notes[key as keyof typeof EnteredNotes]
    // }));

    // this.EnteredOptions.forEach(option => {
    //   this.EnteredStatuses[option.key] = false; 
    // });

    // this.TimeFrameOptions = Object.keys(this.TimeFrame_Notes).map(key => ({
    //   key,
    //   value: this.TimeFrame_Notes[key as keyof typeof TimeFrameNotes]
    // }));

    
  }


  // onProgressNotesChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const key = inputElement.id;
  //   const isChecked = inputElement.checked;
  //   this.selectedStatuses[key] = isChecked;
  // }
  // onEnteredByChange(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   const key = inputElement.id;
  //   const isChecked = inputElement.checked;
  //   this.selectedStatuses[key] = isChecked;
  // }
  // onStatusChange(event: any) {
  //   const inputElement = event.target as HTMLInputElement;
  //   this.TimeFrameStatuses = inputElement.value;
  //   console.log('Selected Status:', this.TimeFrameStatuses);
  // }

  // onRadioChange(value: string) {
  //   this.AddNote.Notes = value;
  //   this.AddNote.IsHandover = (value === 'Handover Summary');
  // }


  ngOnInit(): void {
    // this.AddNote.Notes = 'Progressnote';    
    this.createdBy=localStorage.getItem('userId');
   this.LoadResidentProgressDetails(this.admissionid,this.createdBy,this.dFrom, this.dTo);
  }

  
  Close()
  { 
    this.isExpanded=false;
  }
  submit()
  {
  console.log(this.AddNote);
  this.AddNote.ProgressnotesType=this.UserEnteredNoteEnum.UserEnteredNotes; 
  this.AddNote.CreatedBy = localStorage.getItem('userId');  
  this.AddNote.ModifiedBy = localStorage.getItem('userId'); 
  this.AddNote.ResidentAdditionalInfoId = this.admissionid; 
  this.AddNote.UserId = this.userid; 
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices.AddInsertResidentProgressNote(this.AddNote)
    .subscribe
    ({
      next:(data) => {
        this._UtilityService.hideSpinner();
        if (data.actionResult.success == true) 
        {
          this._UtilityService.showSuccessAlert(data.actionResult.errMsg);  
          this.Close();
          this.LoadResidentProgressDetails(this.admissionid,this.createdBy,this.dFrom, this.dTo);
        }
        else
        {
          this._UtilityService.showWarningAlert(data.actionResult.errMsg);  
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

toggleMenu(menu, event, id,) {
  this.items = [];    
  this.filteritems = this.lstResidentProgressNote.filter(e => e.ResidentProgressNotesId == id);
  this.items = [
   ...this.items,
   {
     label: 'View/Edit',
     icon: 'pi pi-eye',
     command: () => {

     }
   },
   {
    label: 'Add Additional Note',
    icon: 'pi pi-user',
    command: () => {      
      this.ShowAddNote(id);      
    }
  }
 ];
 //console.log('items', this.items);
 menu.toggle(event);
}

//Get Details

onSelect() {
  if (this.SearchDate[0] !== null && this.SearchDate[1] !== null) {
    this.calendar.overlayVisible = false;
    this.ShowAvailableDetails();
  }
}

ShowAvailableDetails() {
  this.dFrom = this.SearchDate[0];
  this.dTo = this.SearchDate[1];
  if (this.dFrom == "" || this.dFrom == null || this.dFrom == undefined) {
    this._UtilityService.showWarningAlert("Please select From date");
    return;
  }
  else if (this.dTo == "" || this.dTo == null || this.dTo == undefined) {
    this._UtilityService.showWarningAlert("Please select To date");
    return;
  }
  else
  {
    this.LoadResidentProgressDetails(this.admissionid,this.createdBy,this.dFrom, this.dTo);
  }
   // this.GetPatientRegistrationDetails(this.dFrom, this.dTo);
}

LoadResidentProgressDetails(admissionid,userid,dFrom: string, dTo: string)
{
      
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices.GetResidentProgressNoteById(admissionid,userid,
     this.datePipe.transform(dFrom, "MM-dd-yyyy"),
     this.datePipe.transform(dTo, "MM-dd-yyyy"),)
    .subscribe
    ({
      next:(data) => {
        this._UtilityService.hideSpinner();
        if (data.actionResult.success == true) 
        {
          var tdata = JSON.parse(data.actionResult.result);
          tdata = tdata ? tdata : [];
         this.lstResidentProgressNote = tdata;
        //  console.log(this.lstResidentProgressNote);
        //  this.TotalRecords = tdata.length;
        }
        else {
          this.TotalRecords = 0;
          this.lstResidentProgressNote = [];
        }
      },
      error: (e) => {
        this._UtilityService.hideSpinner();
        this._UtilityService.showErrorAlert(e.message);
      },
    });
}

//Additiona Note

ShowAddNote(id: string) {   
  this.filteritems = this.lstResidentProgressNote.filter(e => e.ResidentProgressNotesId == id);
  this.AdditionalProgressNote=<any>{}; 
  this.filteritems = [];
  this.filteritems = this.lstResidentProgressNote.filter(e => e.ResidentProgressNotesId == id);
  this.AdditionalProgressNote.ResidentProgressNotesId=this.filteritems[0].ResidentProgressNotesId;
  console.log(this.AdditionalProgressNote);
  this.showAdditionalNote=true;
}

SaveAdditionalProgressNote()
{
this.AdditionalProgressNote.ProgressnotesType=this.UserEnteredNoteEnum.UserEnteredNotes; 
this.AdditionalProgressNote.CreatedBy = localStorage.getItem('userId');  
this.AdditionalProgressNote.ModifiedBy = localStorage.getItem('userId'); 
this.AdditionalProgressNote.ResidentAdditionalInfoId = this.admissionid; 
this.AdditionalProgressNote.UserId = this.userid; 
this._UtilityService.showSpinner();
this.unsubscribe.add = this._MasterServices.AddInsertResidentAdditionalProgressNote(this.AdditionalProgressNote)
  .subscribe
  ({
    next:(data) => {
      this._UtilityService.hideSpinner();
      if (data.actionResult.success == true) 
      {
        this._UtilityService.showSuccessAlert(data.actionResult.errMsg);  
        this.ClearAddionalNote();
        this.LoadResidentProgressDetails(this.admissionid,this.createdBy,this.dFrom, this.dTo);
      }
      else
      {
        this._UtilityService.showWarningAlert(data.actionResult.errMsg);  
      }
      this.showAdditionalNote=false;
    },
    error: (e) => {
      this._UtilityService.hideSpinner();
      this._UtilityService.showErrorAlert(e.message);
    },
  });
}

ClearAddionalNote()
{
  this.AdditionalProgressNote='';
  this.showAdditionalNote=false;
}

}
