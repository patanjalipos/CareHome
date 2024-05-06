
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService, CustomDateFormat, FormTypes } from 'src/app/ui/service/constants.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { DataService } from 'src/app/ui/service/data-service.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { DatePipe } from '@angular/common';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-accident-incident-near-miss-record',
  templateUrl: './accident-incident-near-miss-record.component.html',
  styleUrls: ['./accident-incident-near-miss-record.component.scss']
})
export class AccidentIncidentNearMissRecordComponent extends AppComponentBase  implements OnInit {
  // locationOfAccident:string
  // AccidentFloorPlace:string
  // AccidentType:string
  // injuriesSustained:string
  // JobRole:string
  // EmergencyServices:string
  // timeOfAccident:string = ''
  // accidentDesc:string = ''
  // situationDescBeforeAccident:string = ''
  // directionOfPersonFallWithBodyPartHit:string = ''
  // treatmentDescWithNameOfPerson:string = ''
  // equipment:string = ''
  // assessedBy:string = ''
  // emergencyServicesContactedTime:string = ''
  // otherProfessionalsContacted:string = ''
  // injuredPersonObservation:string = ''
  // witnessName:string = ''
  // serviceManagerDetails:string = ''
  // relativeInformed:string = ''
  // otherContacts:string = ''

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  
  customDateFormat = CustomDateFormat;
  isEditable: boolean;
  AccidentNearMissRecordFormsData:any = <any>{};
  residentAdmissionInfoId:any;
  uniqueReferenceId:any;
  loginId: any;
  userId: any;
  StatementType: string = null;
  checked:boolean = false;

  lstlocationaccident: any[] = [];
  lstAccidentPlace:any[] = [];
  lstAccidentType:any[] = [];
  lstInjurySustained:any[] = [];
  lstJobRole: any[] = [];
  lstEmergencyServices : any[] = [];
  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _DataService: DataService,private _MasterServices: MasterService,private _UtilityService: UtilityService, private datePipte: DatePipe) {
    super();
    this._ConstantServices.ActiveMenuName = "Accident Near Miss Record Form";
    this.loginId = localStorage.getItem('userId');
    // this.lstlocationaccident = [
    //   {name:'Resident Bedroom'},
    //   {name:'Communal Room e.g. lounge/dining room'},
    //   {name:'Shower/bath'},
    //   {name:'Main kitchen'},
    //   {name:'Satellite Kitchen'},
    //   {name:'Laundry'},
    //   {name:'Corridor'},
    //   {name:'Grounds/Garden'},
    //   {name:'Reception'},
    //   {name:'Outside the home e.g. on an organised trip, in hospital or staff on business'},
    //   {name:'Lift'},
    //   {name:'Stairs'},
    //   {name:'Medication/Treatment Room'},
    //   {name:'Car Park'},
    //   {name:'Other'}
    // ]
    // this.lstAccidentPlace = [
    //   {name:'Basement'},
    //   {name:'Ground Floor'},
    //   {name:'1st Floor'},
    //   {name:'2nd Floor'},
    //   {name:'3rd Floor'},
    //   {name:'4th Floor'},
    //   {name:'Outside Building'},
    //   {name:'Other'}
    // ]
    // this.lstAccidentType=[
    //   {name:'Fall'},
    //   {name:'Fall with injury'},
    //   {name:'Accident'},
    //   {name:'Alleged/actual harm or abuse (including personal theft and staff physical assault)'},
    //   {name:'Contact with electricity or electrical discharge'},
    //   {name:'Contact with harmful substance'},
    //   {name:'Death'},
    //   {name:'Drowning or asphyxiation'},
    //   {name:'Entrapment in bedrails'},
    //   {name:'Individual case of infection'},
    //   {name:'Injured by an animal'},
    //   {name:'Misidentification of resident'},
    //   {name:'Misplaced naso -gastric or oro-gastric tubes'},
    //   {name:'Missing resident'},
    //   {name:'Near Miss'},
    //   {name:'Outbreak of Infection'},
    //   {name:'Resident serious illness'},
    //   {name:'Regulatory reportable staff management issues (staff misconduct, staff levels)'},
    //   {name:'Severe scalding'},
    //   {name:'Wounds, ulcers or other skin damage'},
    //   {name:'Other'}
     
    // ]
    // this.lstInjurySustained = [
    //   {name:'No Injury'},
    //   {name:'Fracture or sprain'},
    //   {name:'Bruising or abrasion'},
    //   {name:'Numbness'},
    //   {name:'Neurological (balance/hearing/vision/stroke)'},
    //   {name:'Laceration'},
    //   {name:'Breathing difficulty'},
    //   {name:'Hormonal (blood glucose/thyroid)'},
    //   {name:'Concussion'},
    //   {name:'Chest Pain'},
    //   {name:'Nausea'},
    //   {name:'Seizure'},
    //   {name:'Loss of Consciousness'},
    //   {name:'Burns or Scolds'},
    //   {name:'Other'}
    // ]
    // this.lstJobRole = [
    //   {name:'Activities'},
    //   {name:'Carer'},
    //   {name:'Catering'},
    //   {name:'Home Administrator'},
    //   {name:'Housekeeping'},
    //   {name:'Maintenance'},
    //   {name:'Manager'},
    //   {name:'Nurse'},
    //   {name:'Other'}
    // ]
    // this.lstEmergencyServices = [
    //   {name:'Not required'},
    //   {name:'Ambulance'},
    //   {name:'Fire'},
    //   {name:'Police'},
    //   {name:'Other'}
    // ]

    this.unsubscribe.add = this.route.queryParams.subscribe((params) => {
      var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);

      if (ParamsArray?.length > 0) {
        this.userId =
        ParamsArray.find((e) => e.FieldStr == 'id')?.FieldVal ||
        null;
        this.residentAdmissionInfoId =
        ParamsArray.find((e) => e.FieldStr == 'admissionid')
            ?.FieldVal || null;
      }
    });
   }
  
  
  

  ngOnChanges(changes: SimpleChanges): void {
  this.isEditable = this.preSelectedFormData.isEditable;
  
  if (this.preSelectedFormData.selectedFormID != null) {
    this.AccidentNearMissRecordFormsData = <any>{};
      this.GetAccidentNearMissRecordDetails(
          this.preSelectedFormData.selectedFormID
      );
      this.StatementType = 'Update';
  }
  else {
    this.ResetModel();
  }
}

ngOnInit(): void {
    //     this._DataService.data$.subscribe((data) => {
    //       this.preSelectedFormData = data;
    //   });
    const collectionNames = [
      'LocationOfAccident',
      'AccidentFloorPlace',
      'AccidentType',
      'InjuriesSustained',
      'JobRole',
      'EmergencyServices'
  ];

  forkJoin(collectionNames.map((collectionName) => this.getDropdownMasterLists(FormTypes.AccidentIncident,collectionName,1))).subscribe((responses: any[]) => {
    this.lstlocationaccident = responses[0];
    this.lstAccidentPlace = responses[1];
    this.lstAccidentType = responses[2];
    this.lstInjurySustained = responses[3];
    this.lstJobRole = responses[4];
    this.lstEmergencyServices = responses[5];
});
    
      // this.GetLocationOfAccident();
      // this.GetAccidentFloorPlace();
      // this.GetAccidentType();
      // this.GetInjuriesSustained();
      // this.GetEmergencyServices();
      // this.GetJobRole();

      this.isEditable = this.preSelectedFormData.isEditable;
  
      if (this.preSelectedFormData.selectedFormID != null) {
        this.AccidentNearMissRecordFormsData = <any>{};
          this.GetAccidentNearMissRecordDetails(
              this.preSelectedFormData.selectedFormID
          );
          this.StatementType = 'Update';
      }
      else {
        this.ResetModel();
      }

      }

      

  getFormattedTime(time: Date) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getDropdownMasterLists(formMasterId: string, dropdownName: string,status:number): Observable<any> {
    this._UtilityService.showSpinner();
    return this._MasterServices.GetDropDownMasterList(formMasterId,dropdownName, status).pipe(
        map((response) => {
            this._UtilityService.hideSpinner();
            if (response.actionResult.success) {
                return JSON.parse(response.actionResult.result);
            } else {
                return [];
            }
        }),
        catchError((error) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showErrorAlert(error.message);
            alert(error.message);
            return of([]); // Returning empty array in case of error
        })
    );
}

//   GetLocationOfAccident() {
    
//     this._UtilityService.showSpinner();
//     this.unsubscribe.add = this._MasterServices
//         .GetLocationOfAccident(1)
//         .subscribe({
//             next: (data) => {
//             //   console.log(data)
//                 this._UtilityService.hideSpinner();
//                 if (data.actionResult.success == true) {
//                     var tdata = JSON.parse(data.actionResult.result);
//                     // console.log(tdata);
//                     tdata = tdata ? tdata : [];
//                     this.lstlocationaccident = tdata;
//                 } else {
//                     this.lstlocationaccident = [];
//                 }
//             },
//             error: (e) => {
//                 this._UtilityService.hideSpinner();
//                 this._UtilityService.showErrorAlert(e.message);
//             },
//         });
// }

// GetAccidentFloorPlace() {
  
//   this._UtilityService.showSpinner();
//   this.unsubscribe.add = this._MasterServices
//       .GetAccidentFloorPlace(1)
//       .subscribe({
//           next: (data) => {
//             // console.log(data)
//               this._UtilityService.hideSpinner();
//               if (data.actionResult.success == true) {
//                   var tdata = JSON.parse(data.actionResult.result);
//                 //   console.log(tdata);
//                   tdata = tdata ? tdata : [];
//                   this.lstAccidentPlace = tdata;
//               } else {
//                   this.lstAccidentPlace = [];
//               }
//           },
//           error: (e) => {
//               this._UtilityService.hideSpinner();
//               this._UtilityService.showErrorAlert(e.message);
//           },
//       });
// }

// GetAccidentType() {
 
//   this._UtilityService.showSpinner();
//   this.unsubscribe.add = this._MasterServices
//       .GetAccidentType(1)
//       .subscribe({
//           next: (data) => {
//             // console.log(data)
//               this._UtilityService.hideSpinner();
//               if (data.actionResult.success == true) {
//                   var tdata = JSON.parse(data.actionResult.result);
//                 //   console.log(tdata);
//                   tdata = tdata ? tdata : [];
//                   this.lstAccidentType = tdata;
//               } else {
//                   this.lstAccidentType = [];
//               }
//           },
//           error: (e) => {
//               this._UtilityService.hideSpinner();
//               this._UtilityService.showErrorAlert(e.message);
//           },
//       });
// }

// GetInjuriesSustained() {

//   this._UtilityService.showSpinner();
//   this.unsubscribe.add = this._MasterServices
//       .GetInjuriesSustained(1)
//       .subscribe({
//           next: (data) => {
//             // console.log(data)
//               this._UtilityService.hideSpinner();
//               if (data.actionResult.success == true) {
//                   var tdata = JSON.parse(data.actionResult.result);
//                 //   console.log(tdata);
//                   tdata = tdata ? tdata : [];
//                   this.lstInjurySustained = tdata;
//               } else {
//                   this.lstInjurySustained = [];
//               }
//           },
//           error: (e) => {
//               this._UtilityService.hideSpinner();
//               this._UtilityService.showErrorAlert(e.message);
//           },
//       });
// }

// GetJobRole() {
 
//   this._UtilityService.showSpinner();
//   this.unsubscribe.add = this._MasterServices
//       .GetJobRole(1)
//       .subscribe({
//           next: (data) => {
//             // console.log(data)
//               this._UtilityService.hideSpinner();
//               if (data.actionResult.success == true) {
//                   var tdata = JSON.parse(data.actionResult.result);
//                 //   console.log(tdata);
//                   tdata = tdata ? tdata : [];
//                   this.lstJobRole = tdata;
//               } else {
//                   this.lstJobRole = [];
//               }
//           },
//           error: (e) => {
//               this._UtilityService.hideSpinner();
//               this._UtilityService.showErrorAlert(e.message);
//           },
//       });
// }

// GetEmergencyServices() {
  
//   this._UtilityService.showSpinner();
//   this.unsubscribe.add = this._MasterServices
//       .GetEmergencyServices(1)
//       .subscribe({
//           next: (data) => {
//             // console.log(data)
//               this._UtilityService.hideSpinner();
//               if (data.actionResult.success == true) {
//                   var tdata = JSON.parse(data.actionResult.result);
//                 //   console.log(tdata);
//                   tdata = tdata ? tdata : [];
//                   this.lstEmergencyServices = tdata;
//               } else {
//                   this.lstEmergencyServices = [];
//               }
//           },
//           error: (e) => {
//               this._UtilityService.hideSpinner();
//               this._UtilityService.showErrorAlert(e.message);
//           },
//       });
// }

  GetAccidentNearMissRecordDetails(formId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._MasterServices
        .GetAccidentNearMissRecordDetails(formId)
        .subscribe({
            next: (data) => {
                this._UtilityService.hideSpinner();
                if (data.actionResult.success == true) {
                    var tdata = JSON.parse(data.actionResult.result);
                    tdata = tdata ? tdata : {};
                    console.log(tdata.DateOfAccident)
                    this.AccidentNearMissRecordFormsData = tdata;
                    this.AccidentNearMissRecordFormsData.DateOfAccident = this.datePipte.transform(this.AccidentNearMissRecordFormsData.DateOfAccident,'MM/dd/yyyy')
                    this.AccidentNearMissRecordFormsData.EmergencyServicesContacted = this.datePipte.transform(this.AccidentNearMissRecordFormsData.EmergencyServicesContacted,'MM/dd/yyyy')
                    // console.log(this.AccidentNearMissRecordFormsData)
                } else {
                    this.AccidentNearMissRecordFormsData = {};
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}
saveAsUnfinished() {

  this.AccidentNearMissRecordFormsData.isFormCompleted = false;
  this.Save();
}

completeForm() {
  this.AccidentNearMissRecordFormsData.isFormCompleted = true;
  this.Save();
}

Save() {
    debugger
  if (this.userId != null && this.residentAdmissionInfoId != null && this.loginId!=null) {
      // this.AccidentNearMissRecordFormsData.uniqueReferenceId = this.uniqueReferenceId;
      // this.AccidentNearMissRecordFormsData.locationOfAccident = this.locationOfAccident;
      // this.AccidentNearMissRecordFormsData.timeOfAccident = this.timeOfAccident;
      // this.AccidentNearMissRecordFormsData.AccidentFloorPlace = this.AccidentFloorPlace;
      // this.AccidentNearMissRecordFormsData.AccidentType = this.AccidentType;
      // this.AccidentNearMissRecordFormsData.accidentDesc = this.accidentDesc;
      // this.AccidentNearMissRecordFormsData.situationDescBeforeAccident = this.situationDescBeforeAccident;
      // this.AccidentNearMissRecordFormsData.directionOfPersonFallWithBodyPartHit = this.directionOfPersonFallWithBodyPartHit;
      // this.AccidentNearMissRecordFormsData.InjuriesSustained = this.injuriesSustained;
      // this.AccidentNearMissRecordFormsData.treatmentDescWithNameOfPerson = this.treatmentDescWithNameOfPerson;
      // this.AccidentNearMissRecordFormsData.JobRole = this.JobRole;
      // this.AccidentNearMissRecordFormsData.equipment = this.equipment;
      // this.AccidentNearMissRecordFormsData.assessedBy = this.assessedBy;
      // this.AccidentNearMissRecordFormsData.EmergencyServices = this.EmergencyServices;
      // this.AccidentNearMissRecordFormsData.emergencyServicesContactedTime = this.emergencyServicesContactedTime;
      // this.AccidentNearMissRecordFormsData.otherProfessionalsContacted = this.otherProfessionalsContacted;
      // this.AccidentNearMissRecordFormsData.injuredPersonObservation = this.injuredPersonObservation;
      // this.AccidentNearMissRecordFormsData.witnessName = this.witnessName;
      // this.AccidentNearMissRecordFormsData.serviceManagerDetails = this.serviceManagerDetails;
      // this.AccidentNearMissRecordFormsData.relativeInformed = this.relativeInformed;
      // this.AccidentNearMissRecordFormsData.otherContacts = this.otherContacts;
      // this.AccidentNearMissRecordFormsData.accidentNearMissRecordInfoId =
      //     this.accidentNearMissRecordInfoId;
      this.AccidentNearMissRecordFormsData.userId = this.userId;
      this.AccidentNearMissRecordFormsData.residentAdmissionInfoId =
          this.residentAdmissionInfoId;
      this.AccidentNearMissRecordFormsData.StartedBy = this.loginId;
      this.AccidentNearMissRecordFormsData.LastEnteredBy = this.loginId;
      this.AccidentNearMissRecordFormsData.DateOfAccident = this.datePipte.transform(this.AccidentNearMissRecordFormsData.DateOfAccident,'yyyy-MM-dd');
      this.AccidentNearMissRecordFormsData.EmergencyServicesContacted = this.datePipte.transform(this.AccidentNearMissRecordFormsData.EmergencyServicesContacted,'yyyy-MM-dd');
          const objectBody: any = {
            StatementType: this.StatementType,
            accidentNearMissRecordForm: this.AccidentNearMissRecordFormsData,
        };
        

        console.log(objectBody);

      this._UtilityService.showSpinner();
      this.unsubscribe.add = this._MasterServices
          .AddInsertUpdateAccidentNearMissRecordForm(
              objectBody
          )
          .subscribe({
              next: (data) => {
                  this._UtilityService.hideSpinner();
                  if (data.actionResult.success == true){
                      this.EmitUpdateForm.emit(true);
                    this.ResetModel();
                      this._UtilityService.showSuccessAlert(
                          data.actionResult.errMsg
                      );
                    }
                  else
                      this._UtilityService.showWarningAlert(
                          data.actionResult.errMsg
                      );
              },
              error: (e) => {
                  this._UtilityService.hideSpinner();
                  this._UtilityService.showErrorAlert(e.message);
              },
          });
  } else {
      this._UtilityService.showWarningAlert(
          'Accident Near or Miss record details are missing.'
      );
  }
}

ResetModel() {
  this.isEditable = true;
  this.AccidentNearMissRecordFormsData = <any>{};
  this.StatementType = 'Insert';
}

}
