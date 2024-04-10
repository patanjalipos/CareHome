
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { DataService } from 'src/app/ui/service/data-service.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-accident-incident-near-miss-record',
  templateUrl: './accident-incident-near-miss-record.component.html',
  styleUrls: ['./accident-incident-near-miss-record.component.scss']
})
export class AccidentIncidentNearMissRecordComponent extends AppComponentBase  implements OnInit {
  locationOfAccident:string
  AccidentFloorPlace:string
  AccidentType:string
  injuriesSustained:string
  JobRole:string
  EmergencyServices:string
  timeOfAccident:string = ''
  accidentDesc:string = ''
  situationDescBeforeAccident:string = ''
  directionOfPersonFallWithBodyPartHit:string = ''
  treatmentDescWithNameOfPerson:string = ''
  equipment:string = ''
  assessedBy:string = ''
  emergencyServicesContactedTime:string = ''
  otherProfessionalsContacted:string = ''
  injuredPersonObservation:string = ''
  witnessName:string = ''
  serviceManagerDetails:string = ''
  relativeInformed:string = ''
  otherContacts:string = ''

  @Input() preSelectedFormData: any=<any>{};
  @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
  
 
  isEditable: boolean;
  AccidentNearMissRecordFormsData:any = <any>{};
  accidentNearMissRecordInfoId:any;
  uniqueReferenceId:any;

  lstlocationaccident: any[] = [];
  lstAccidentPlace:any[] = [];
  lstAccidentType:any[] = [];
  lstInjurySustained:any[] = [];
  lstJobRole: any[] = [];
  lstEmergencyServices : any[] = [];
  constructor(private _ConstantServices: ConstantsService,private route: ActivatedRoute,private _DataService: DataService,private _MasterServices: MasterService,private _UtilityService: UtilityService) {
    super();
    this._ConstantServices.ActiveMenuName = "Accident Near Miss Record Form";
    this.lstlocationaccident = [
      {name:'Resident Bedroom'},
      {name:'Communal Room e.g. lounge/dining room'},
      {name:'Shower/bath'},
      {name:'Main kitchen'},
      {name:'Satellite Kitchen'},
      {name:'Laundry'},
      {name:'Corridor'},
      {name:'Grounds/Garden'},
      {name:'Reception'},
      {name:'Outside the home e.g. on an organised trip, in hospital or staff on business'},
      {name:'Lift'},
      {name:'Stairs'},
      {name:'Medication/Treatment Room'},
      {name:'Car Park'},
      {name:'Other'}
    ]
    this.lstAccidentPlace = [
      {name:'Basement'},
      {name:'Ground Floor'},
      {name:'1st Floor'},
      {name:'2nd Floor'},
      {name:'3rd Floor'},
      {name:'4th Floor'},
      {name:'Outside Building'},
      {name:'Other'}
    ]
    this.lstAccidentType=[
      {name:'Fall'},
      {name:'Fall with injury'},
      {name:'Accident'},
      {name:'Alleged/actual harm or abuse (including personal theft and staff physical assault)'},
      {name:'Contact with electricity or electrical discharge'},
      {name:'Contact with harmful substance'},
      {name:'Death'},
      {name:'Drowning or asphyxiation'},
      {name:'Entrapment in bedrails'},
      {name:'Individual case of infection'},
      {name:'Injured by an animal'},
      {name:'Misidentification of resident'},
      {name:'Misplaced naso -gastric or oro-gastric tubes'},
      {name:'Missing resident'},
      {name:'Near Miss'},
      {name:'Outbreak of Infection'},
      {name:'Resident serious illness'},
      {name:'Regulatory reportable staff management issues (staff misconduct, staff levels)'},
      {name:'Severe scalding'},
      {name:'Wounds, ulcers or other skin damage'},
      {name:'Other'}
     
    ]
    this.lstInjurySustained = [
      {name:'No Injury'},
      {name:'Fracture or sprain'},
      {name:'Bruising or abrasion'},
      {name:'Numbness'},
      {name:'Neurological (balance/hearing/vision/stroke)'},
      {name:'Laceration'},
      {name:'Breathing difficulty'},
      {name:'Hormonal (blood glucose/thyroid)'},
      {name:'Concussion'},
      {name:'Chest Pain'},
      {name:'Nausea'},
      {name:'Seizure'},
      {name:'Loss of Consciousness'},
      {name:'Burns or Scolds'},
      {name:'Other'}
    ]
    this.lstJobRole = [
      {name:'Activities'},
      {name:'Carer'},
      {name:'Catering'},
      {name:'Home Administrator'},
      {name:'Housekeeping'},
      {name:'Maintenance'},
      {name:'Manager'},
      {name:'Nurse'},
      {name:'Other'}
    ]
    this.lstEmergencyServices = [
      {name:'Not required'},
      {name:'Ambulance'},
      {name:'Fire'},
      {name:'Police'},
      {name:'Other'}
    ]

    this.unsubscribe.add = this.route.queryParams.subscribe((params) => {
      var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);

      if (ParamsArray?.length > 0) {
          this.uniqueReferenceId =
              ParamsArray.find((e) => e.FieldStr == 'id')?.FieldVal ||
              null;
          this.accidentNearMissRecordInfoId =
              ParamsArray.find((e) => e.FieldStr == 'accidentnearmissrecordid')
                  ?.FieldVal || null;
      }
    });
   }
  
   getFormattedTime(time: Date) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  ngOnInit(): void {
    this._DataService.data$.subscribe((data) => {
      this.preSelectedFormData = data;
  });



  alert(this.preSelectedFormData.isEditable);
  this.isEditable = this.preSelectedFormData.isEditable;
  
  if (this.preSelectedFormData.selectedFormID != null) {
    this.AccidentNearMissRecordFormsData = <any>{};
      this.GetAccidentNearMissRecordDetails(
          this.preSelectedFormData.selectedFormID
      );
  }
  else {
    this.ResetModel();
  }
  }

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
                    this.AccidentNearMissRecordFormsData = tdata;
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
  if (this.uniqueReferenceId != null && this.accidentNearMissRecordInfoId == null) {
      this.AccidentNearMissRecordFormsData.uniqueReferenceId = this.uniqueReferenceId;
      this.AccidentNearMissRecordFormsData.locationOfAccident = this.locationOfAccident;
      this.AccidentNearMissRecordFormsData.timeOfAccident = this.timeOfAccident;
      this.AccidentNearMissRecordFormsData.AccidentFloorPlace = this.AccidentFloorPlace;
      this.AccidentNearMissRecordFormsData.AccidentType = this.AccidentType;
      this.AccidentNearMissRecordFormsData.accidentDesc = this.accidentDesc;
      this.AccidentNearMissRecordFormsData.situationDescBeforeAccident = this.situationDescBeforeAccident;
      this.AccidentNearMissRecordFormsData.directionOfPersonFallWithBodyPartHit = this.directionOfPersonFallWithBodyPartHit;
      this.AccidentNearMissRecordFormsData.InjuriesSustained = this.injuriesSustained;
      this.AccidentNearMissRecordFormsData.treatmentDescWithNameOfPerson = this.treatmentDescWithNameOfPerson;
      this.AccidentNearMissRecordFormsData.JobRole = this.JobRole;
      this.AccidentNearMissRecordFormsData.equipment = this.equipment;
      this.AccidentNearMissRecordFormsData.assessedBy = this.assessedBy;
      this.AccidentNearMissRecordFormsData.EmergencyServices = this.EmergencyServices;
      this.AccidentNearMissRecordFormsData.emergencyServicesContactedTime = this.emergencyServicesContactedTime;
      this.AccidentNearMissRecordFormsData.otherProfessionalsContacted = this.otherProfessionalsContacted;
      this.AccidentNearMissRecordFormsData.injuredPersonObservation = this.injuredPersonObservation;
      this.AccidentNearMissRecordFormsData.witnessName = this.witnessName;
      this.AccidentNearMissRecordFormsData.serviceManagerDetails = this.serviceManagerDetails;
      this.AccidentNearMissRecordFormsData.relativeInformed = this.relativeInformed;
      this.AccidentNearMissRecordFormsData.otherContacts = this.otherContacts;
      this.AccidentNearMissRecordFormsData.accidentNearMissRecordInfoId =
          this.accidentNearMissRecordInfoId;

          const objectBody: any = {
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
                  if (data.actionResult.success == true)
                      this._UtilityService.showSuccessAlert(
                          data.actionResult.errMsg
                      );
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
}

}
