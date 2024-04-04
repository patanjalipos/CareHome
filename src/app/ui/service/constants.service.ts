import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  public IsLocal: boolean = false;
  public IsShowNavBar: boolean = true;
  public ActiveMenuName: string = "";
  
  GetParmasVal(paramsstr)
  {
      let ParamsArray:any[]=[];
      if(paramsstr!=null && paramsstr!=undefined)
      {
        var result=decodeURIComponent(atob(paramsstr));
        var NewCellData = result.split('&');
        if(NewCellData?.length>0)
        {
          NewCellData.map(e=>
            {
              ParamsArray.push({"FieldStr":e.split('=')[0],"FieldVal":e.split('=')[1]});
            });
        }
      }
      return ParamsArray;
  }
}




export enum UserTypes {
  SuperAdmin = "611b6d811003138c9d40a8b7",
  Admin = "607546c500f6f4c43c5d54a0",
  Resident = "6075474600f6f4c43c5d54a1"
  // Doctor = "6075479300f6f4c43c5d54a2",
  // Therapist = "60e5582069bec5646f115686",
  // Meditation = "60ed26557f6bda738e03c049",
  // Patient = "6075474600f6f4c43c5d54a1",
  // Pathologist = "60ee67c8b43250ad3a1d362d",
  // Cafeteria = "60e5597069bec5646f115688",
  // GuestServiceAgent = "6253e3b1eea1dbcb7aae98a1",
  // AdminDeo = "62678ac614091e1beade98e6",
  // Finance="6331db25d3c986311dff200c",
  // Billing="6396f00addc59e9aac93b137"
}

export enum FormTypes {
  PreAdmission = "65e6db2de37632e29ad778ba",
  AccidentIncident = "65e6db54e37632e29ad778bb",
  AcuteCarePlan = "65e6db61e37632e29ad778bc",
  BloodTestRecord = "65e950b1ef1f6e9ecaf7dbeb",
  BodyMappingRecord = "65eee25b34399c226ce7c84c",
  CareAssessmentBreathing = "65f7bf9db44c935375edd8ff",
  CareAssessmentContinence = "660cddb2f05fe3604a126e48",
  CareAssessmentEats = "660cde176532ff5562029d72",
  CareAssessmentFeeling = "660cde286532ff5562029d73",
  FamilyCommunication = "65eee23e34399c226ce7c84b",
  CareAssessmentPersonal = "660cffe0f05fe3604a126e49",
  ConnectingandCommunicating ="660d0017f05fe3604a126e4a",
  GPDoctorVisitCommunicationRecord = "660d003bf05fe3604a126e4b",
  ProfessionalVisitCommunicationRecord = "660d0079f05fe3604a126e4c",
  RiskAssessmentPhysical="660d009bf05fe3604a126e4d",
  RiskAssessmentWaterlow = "660d00d3f05fe3604a126e4e"
}

export enum AdmissionStatus {
  Unallocated = 0,
  Active = 1,
  Deceased = 2,
  Discharged = 3,
  Transferred = 4,
  WaitListed = 5,
  Suspended = 6, 
}

export enum TaskPlannerStatus {
  Open = 1,
  InProgress = 2,
  Done = 3,
}

export enum ActionItem{
  Read = 1,
  ReadWrite = 2,
  Delete = 3,
  Download = 4,
  Print = 5,
  Cancel = 6
}

export enum OtherActionAccess {
  IsDoctorLogs = 1,
  IsOtherRoomCatChange = 2,
  IsSuspended = 3,
}

export enum CustomDateFormat {
  DEF_DATE = "dd-MM-yyyy",
  DEF_DATE_TIME = "dd-MM-yyyy HH:mm",
  DEF_DATE_TIME_AMPM = "dd-MM-yyyy HH:mm a" ,
  CalendarFormat="dd-mm-yy" 
}

