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
import { ResidentProfileService } from '../resident-profile.service';

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
  @Input() isProgressnoteDoc:boolean=false;
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
  SearchProgressnoteType: any[]=[];
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
  lstprogressnotetypes:any[]=[];
  AdditionProgressNoteID:string="";

  isDetailedview: boolean = true;
  isTableview: boolean = false; 
  showProgressNote:boolean=false;
  lstshowProgressNote: any[]=[];
  constructor(
    private _ConstantServices: ConstantsService,
    private datePipe: DatePipe,
    private _MasterServices:MasterService,
    private sharedStateService: ResidentProfileService,
    private _UtilityService: UtilityService,
    ) 
    { 
    super();
    this._ConstantServices.ActiveMenuName="Resident Progress Notes";
    // this.statusOptions = Object.keys(this.progress_Note).map(key => ({
    //   key,
    //   value: this.progress_Note[key as keyof typeof progressNoteFilters]
    // }));

    this.lstUserNote = [
      { name: this.UserEnteredNoteEnum[this.UserEnteredNoteEnum.UserEnteredNotes], code: this.UserEnteredNoteEnum.UserEnteredNotes }
    ]
    
    // this.statusOptions.forEach(option => {
    //   this.selectedStatuses[option.key] = false; 
    // });

   
    this.lstprogressnotetypes = [
      { name: this.progress_Note[this.progress_Note.Allnotes], code: this.progress_Note.Allnotes },
      { name: this.progress_Note[this.progress_Note.MedicationException], code: this.progress_Note.MedicationException },
      { name: this.progress_Note[this.progress_Note.CareplanEvaluations], code: this.progress_Note.CareplanEvaluations },
      { name: this.progress_Note[this.progress_Note.FormsObservationcharts], code: this.progress_Note.FormsObservationcharts },
      { name: this.progress_Note[this.progress_Note.Alerts], code: this.progress_Note.Alerts },
      { name: this.progress_Note[this.progress_Note.ResidentDocumentLoaded], code: this.progress_Note.ResidentDocumentLoaded },
      { name: this.progress_Note[this.progress_Note.CareplanCharges], code: this.progress_Note.CareplanCharges },
      { name: this.progress_Note[this.progress_Note.ResidentTransfer], code: this.progress_Note.ResidentTransfer },
      { name: this.progress_Note[this.progress_Note.ResidentIndicators], code: this.progress_Note.ResidentIndicators },
      { name: this.progress_Note[this.progress_Note.Occupancynotes], code: this.progress_Note.Occupancynotes },
      { name: this.progress_Note[this.progress_Note.UserEnteredNotes], code: this.progress_Note.UserEnteredNotes },
      { name: this.progress_Note[this.progress_Note.ResidentDeparture], code: this.progress_Note.ResidentDeparture },
    ];
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
   this.LoadResidentProgressDetails(this.admissionid,this.dFrom, this.dTo,this.userid,this.SearchProgressnoteType);
   this.ClearAddionalNote();
   this.AddNote.DateOfEvent = new Date();
  }
  ngOnChanges() {  
    if(this.isProgressnoteDoc==true)
      {    
        this._ConstantServices.ActiveMenuName="Progress notes Documents";
         this.LoadResidentProgressDetails(this.admissionid,this.dFrom, this.dTo,this.userid,0);
      }
  }
  changeValue(){
    this.sharedStateService.tranferValu(true);
  }
  
  Close()
  { 
    this.isExpanded=false;
    this.AddNote='';
    this.isDetailedview = true;
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
          this.LoadResidentProgressDetails(this.admissionid,this.dFrom, this.dTo,this.userid,this.SearchProgressnoteType);
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

onSelectDate() {
  if (this.SearchDate[0] !== null && this.SearchDate[1] !== null) {
    this.calendar.overlayVisible = false;
    this.ShowAvailableDetails();
  }
  this.changeValue();
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
    this.LoadResidentProgressDetails(this.admissionid,this.dFrom, this.dTo,this.userid,0);
  }
   // this.GetPatientRegistrationDetails(this.dFrom, this.dTo);
}

onSelectFormType() {
  var checkedItemArray: any[] = [];
    for (var i = 0; i < this.SearchProgressnoteType?.length; i++) {
      checkedItemArray.push({
        "id": this.SearchProgressnoteType[i]
      });      
    }
   // this.SearchProgressnoteType=checkedItemArray;
  this.LoadResidentProgressDetails(this.admissionid,this.dFrom, this.dTo,this.userid,checkedItemArray);
}

LoadResidentProgressDetails(admissionid,dFrom: string, dTo: string,userid,formType)
{
      
  this._UtilityService.showSpinner();
  this.unsubscribe.add = this._MasterServices.GetResidentProgressNoteById(admissionid,
     this.datePipe.transform(dFrom, "MM-dd-yyyy"),
     this.datePipe.transform(dTo, "MM-dd-yyyy"),userid,formType)
    .subscribe
    ({
      next:(data) => {
        this._UtilityService.hideSpinner();
        if (data.actionResult.success == true) 
        {
          var tdata = JSON.parse(data.actionResult.result);
          tdata = tdata ? tdata : [];
         this.lstResidentProgressNote = tdata;
         if(this.showProgressNote==true)    
        {
          this.ShowProgressNote(this.filteritems[0].ResidentProgressNotesId);
        }
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
  // console.log(this.AdditionalProgressNote);
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
        this.LoadResidentProgressDetails(this.admissionid,this.dFrom, this.dTo,this.userid,this.SearchProgressnoteType);
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

ShowDetailview(event: Event): void {
  event.preventDefault(); 
  this.isDetailedview = true;
  this.isTableview = false;
}
ShowTableview(event: Event): void {
  event.preventDefault(); 
  this.isTableview = true;
  this.isDetailedview = false;
}

ShowProgressNote(id){
  this.showProgressNote=true;
  this.filteritems = this.lstResidentProgressNote.filter(e => e.ResidentProgressNotesId == id);
  this.lstshowProgressNote=this.filteritems;
}

}
